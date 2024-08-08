import useSWR from "swr";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";

const fetchCategory = (url) => fetch(url).then((res) => res.json());

const CategoryDropDown = ({ selectedCategory, onCategoryChange , className, all= true , ...props}) => {
  const { data: categories, error, isLoading } = useSWR('/api/categories', fetchCategory);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  const categoryList = categories || [];

  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange} required {...props}>
      <SelectTrigger className={cn('w-[100px]', className)}>
        <SelectValue placeholder='Select category' />
      </SelectTrigger>
      <SelectContent>
        {all && <SelectItem value='All'>All</SelectItem>}
        {categoryList.map((category) => (
          <SelectItem key={category.id} value={category.name}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


export default CategoryDropDown;
