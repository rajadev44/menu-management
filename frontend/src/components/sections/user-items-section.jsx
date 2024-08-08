import { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { formatCurrency } from "@/lib/formatters";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../ui/loader";
import { Input } from "../ui/input";

// SWR fetcher function
const fetcher = (url) => fetch(url).then((res) => res.json());

// Deterministic function to generate popularity
function generatePopularity(id) {
  const charSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 4.5 + (charSum % 5) / 10; // Rating between 4.5 and 5
}

export default function UserItemsSections() {
  const { data: menuItems, error, isLoading } = useSWR('/api/menu-items', fetcher);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: [],
    priceRange: [Number.MIN_VALUE, Number.MAX_VALUE],
    dietaryRestrictions: [],
  });
  const [sortBy, setSortBy] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || null);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || null);
  }, [searchParams]);

  const fuse = useMemo(() => new Fuse(menuItems || [], {
    keys: ['name', 'description', 'category'],
    threshold: 0.6,
    // tokenize: true,
    // matchAllTokens: true,
  }), [menuItems]);

  const filteredMenuItems = useMemo(() => {
    if (!menuItems) return [];

    const searchResults = searchTerm ? fuse.search(searchTerm).map(result => result.item) : menuItems;
    console.log(filters)
    return searchResults
      .map(item => ({
        ...item,
        popularity: generatePopularity(item.id),
      }))
      .filter((item) => {
        if (filters.category.length > 0 && !filters.category.includes(item.category)) {
          return false;
        }
        if (filters.priceRange[0] > (item.price + item.sizes[0].price) || filters.priceRange[1] < (item.price + item.sizes[0].price)) {
          return false;
        }
        if (
          filters.dietaryRestrictions.length > 0 &&
          !filters.dietaryRestrictions.every((restriction) => item.dietaryRestrictions.includes(restriction))
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popularity":
            return b.popularity - a.popularity;
          case "price-asc":
            return (a.price + a.sizes[0].price ) - (b.price + b.sizes[0].price);
            case "price-desc":
            return (b.price + b.sizes[0].price ) - (a.price + a.sizes[0].price);
          default:
            return 0;
        }
      });
  }, [filters, sortBy, menuItems, searchTerm, fuse]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredMenuItems.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) return <div>Failed to load menu items</div>;
  if (isLoading) return <div className='w-full flex justify-center items-center my-2'><Loader className='w-20 h-20' /></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-4 md:p-8">
      <SidebarFilter filters={filters} setFilters={setFilters} />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Menu</h1>
          <div className="flex items-center gap-4">
            <Label htmlFor="sort-by" className="text-sm font-medium">
              Sort by:
            </Label>
            <Select id="sort-by" value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
            <Link
              to={'/items/' + item.id}
              key={item.id}
            >
              <Card
                className='flex flex-col gap-1 h-full w-full'
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="rounded-t-lg object-cover w-full h-48"
                />
                <CardContent className="p-4 flex flex-col items-center grow">
                  <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-col items-center gap-2 mt-auto">
                    <span className="text-primary font-bold">{formatCurrency(item.price + item.sizes[0].price)}</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <StarFilledIcon className="w-4 h-4" />
                      <span>{item.popularity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }) => {
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => !isPreviousDisabled && handlePageChange(currentPage - 1)}
            className={isPreviousDisabled ? 'disabled-class' : ''}
            aria-disabled={isPreviousDisabled}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => !isNextDisabled && handlePageChange(currentPage + 1)}
            className={isNextDisabled ? 'disabled-class' : ''}
            aria-disabled={isNextDisabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};



const SidebarFilter = ({ filters, setFilters }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: categories, isLoading: categoriesLoading } = useSWR('/api/categories', fetcher);
  const [range, setRange] = useState({min: null, max:null})
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category'); 


  const handleCategoryChange = (categoryName) => {
    
    if(category){
      // Remove a query parameter
      setSearchParams((params) => {
        params.delete('category');
        return params;
      });
    }


    setFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category.includes(categoryName)
        ? prevFilters.category.filter((c) => c !== categoryName)
        : [...prevFilters.category, categoryName],
    }));
  };

  const handlePriceRangeChange = (name , value) => {
    const {min, max} = {...range, [name]: value || null};
    setRange({min, max})
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [min, max || Number.MAX_VALUE],
    }));
  };



  useEffect(() => {
    if(category){
      console.log(category)
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: [...prevFilters.category, category],
      }));
    }
  },[])


  if (categoriesLoading) {
    return (
      <div className='w-full flex justify-center items-center my-2 mx-auto'>
        <Loader className='w-20 h-20'/>
      </div>
    );
  }
  return (
    <div className="bg-background rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="grid gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Category</h3>
          <div className="grid gap-2">
            {categories.map((category) => (
              <Label key={category.id} className="flex items-center gap-2">
                <Checkbox
                  checked={filters.category.includes(category.name)}
                  onCheckedChange={() => handleCategoryChange(category.name)}
                />
                {category.name}
              </Label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg my-2 font-semibold mb-2">Price Range</h3>
          <div className="flex gap-4 my-2 flex-col">
            <div>
            <Label className="flex items-center gap-2 mb-1">Min</Label>
            <Input
              type="number"
              value={range.min}
              onChange={(e) => handlePriceRangeChange('min',Number(e.target.value))}
              placeholder="Min"
              className="w-full"
            />
            </div>
            <div>
              <Label className="flex items-center gap-2 mb-1">Max</Label>
              <Input
                type="number"
                value={range.max}
                onChange={(e) => handlePriceRangeChange('max',Number(e.target.value))}
                placeholder="Max"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};