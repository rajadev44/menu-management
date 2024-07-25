import { useState, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Pagination } from "@/components/ui/pagination"

export default function UserItemsSections() {
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 50],
    dietaryRestrictions: [],
  })
  const [sortBy, setSortBy] = useState("popularity")
  const menuItems = [
    {
      id: 1,
      image: '/SOUPS 3.png',
      title: "Grilled Salmon",
      description: "Fresh Atlantic salmon, grilled to perfection",
      price: 24.99,
      category: "Entrees",
      dietaryRestrictions: ["gluten-free", "dairy-free"],
      popularity: 4.8,
    },
    {
      id: 2,
      image: '/SOUPS 3.png',
      title: "Margherita Pizza",
      description: "Classic Italian pizza with tomato, mozzarella, and basil",
      price: 16.99,
      category: "Pizzas",
      dietaryRestrictions: ["vegetarian"],
      popularity: 4.6,
    },
    {
      id: 3,
      image: '/SOUPS 3.png',
      title: "Beef Bourguignon",
      description: "Tender beef in a rich red wine sauce",
      price: 28.99,
      category: "Entrees",
      dietaryRestrictions: [],
      popularity: 4.7,
    },
    {
      id: 4,
      image: '/SOUPS 3.png',
      title: "Quinoa Salad",
      description: "Quinoa, mixed greens, avocado, and roasted vegetables",
      price: 12.99,
      category: "Salads",
      dietaryRestrictions: ["vegetarian", "vegan", "gluten-free"],
      popularity: 4.5,
    },
    {
      id: 5,
      image: '/SOUPS 3.png',
      title: "Chicken Parmesan",
      description: "Breaded chicken breast topped with marinara and mozzarella",
      price: 19.99,
      category: "Entrees",
      dietaryRestrictions: [],
      popularity: 4.8,
    },
    {
      id: 6,
      image: '/SOUPS 3.png',
      title: "Caesar Salad",
      description: "Romaine lettuce, croutons, Parmesan, and Caesar dressing",
      price: 10.99,
      category: "Salads",
      dietaryRestrictions: ["vegetarian"],
      popularity: 4.4,
    },
    {
      id: 7,
      image: '/SOUPS 3.png',
      title: "Spaghetti Bolognese",
      description: "Classic Italian pasta with a rich meat sauce",
      price: 17.99,
      category: "Entrees",
      dietaryRestrictions: [],
      popularity: 4.6,
    },
    {
      id: 8,
      image: '/SOUPS 3.png',
      title: "Vegetable Stir-Fry",
      description: "Assorted vegetables in a savory sauce",
      price: 14.99,
      category: "Entrees",
      dietaryRestrictions: ["vegetarian", "vegan", "gluten-free"],
      popularity: 4.3,
    },
  ]
  const filteredMenuItems = useMemo(() => {
    return menuItems
      .filter((item) => {
        if (filters.category.length > 0 && !filters.category.includes(item.category)) {
          return false
        }
        if (filters.priceRange[0] > item.price || filters.priceRange[1] < item.price) {
          return false
        }
        if (
          filters.dietaryRestrictions.length > 0 &&
          !filters.dietaryRestrictions.every((restriction) => item.dietaryRestrictions.includes(restriction))
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popularity":
            return b.popularity - a.popularity
          case "price-asc":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          default:
            return 0
        }
      })
  }, [filters, sortBy])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredMenuItems.length / itemsPerPage)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 p-4 md:p-8">
      <div className="bg-background rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.category.includes("Entrees")}
                  onCheckedChange={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      category: prevFilters.category.includes("Entrees")
                        ? prevFilters.category.filter((c) => c !== "Entrees")
                        : [...prevFilters.category, "Entrees"],
                    }))
                  }}
                />
                Entrees
              </Label>
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.category.includes("Pizzas")}
                  onCheckedChange={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      category: prevFilters.category.includes("Pizzas")
                        ? prevFilters.category.filter((c) => c !== "Pizzas")
                        : [...prevFilters.category, "Pizzas"],
                    }))
                  }}
                />
                Pizzas
              </Label>
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.category.includes("Salads")}
                  onCheckedChange={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      category: prevFilters.category.includes("Salads")
                        ? prevFilters.category.filter((c) => c !== "Salads")
                        : [...prevFilters.category, "Salads"],
                    }))
                  }}
                />
                Salads
              </Label>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <div />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Dietary Restrictions</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.dietaryRestrictions.includes("vegetarian")}
                  onCheckedChange={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      dietaryRestrictions: prevFilters.dietaryRestrictions.includes("vegetarian")
                        ? prevFilters.dietaryRestrictions.filter((r) => r !== "vegetarian")
                        : [...prevFilters.dietaryRestrictions, "vegetarian"],
                    }))
                  }}
                />
                Vegetarian
              </Label>
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.dietaryRestrictions.includes("vegan")}
                  onCheckedChange={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      dietaryRestrictions: prevFilters.dietaryRestrictions.includes("vegan")
                        ? prevFilters.dietaryRestrictions.filter((r) => r !== "vegan")
                        : [...prevFilters.dietaryRestrictions, "vegan"],
                    }))
                  }}
                />
                Vegan
              </Label>
              <Label className="flex items-center gap-2">
                <Checkbox
                  checked={filters.dietaryRestrictions.includes("gluten-free")}
                  onCheckedChange={() => {
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      dietaryRestrictions: prevFilters.dietaryRestrictions.includes("gluten-free")
                        ? prevFilters.dietaryRestrictions.filter((r) => r !== "gluten-free")
                        : [...prevFilters.dietaryRestrictions, "gluten-free"],
                    }))
                  }}
                />
                Gluten-free
              </Label>
            </div>
          </div>
        </div>
      </div>
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
            <Card key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="rounded-t-lg object-fill w-full h-48"
              />
              <CardContent className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">${item.price}</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <StarIcon className="w-4 h-4" />
                    <span>{item.popularity.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}