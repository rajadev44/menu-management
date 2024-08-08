import useSWR from "swr";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import Loader from "../ui/loader";
import { formatCurrency } from "@/lib/formatters";

const fetchCategory = (url) => fetch(url).then((res) => res.json());

const IngredientsDropDown = ({ value, onChange , className, all= true}) => {
  const { data: categories, error, isLoading } = useSWR('/api/ingredients', fetchCategory);

  if (isLoading) return <Loader className='text-primary'/>;
  if (error) return <div>Error loading ingredients</div>;

  const categoryList = categories || [];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('w-[100px]', className)}>
        <SelectValue placeholder='Select Ingredient' />
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


export default IngredientsDropDown;



export const ItemIngredientsDropDown = ({ value, onChange, className, all = true, ingredients }) => {
  if (!ingredients) return <Loader className='text-primary' />;
  
  const ingredientList = ingredients || [];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('w-[300px]', className)}>
        <SelectValue placeholder='Select Ingredient' />
      </SelectTrigger>
      <SelectContent>
        {all && <SelectItem value='All'>All</SelectItem>}
        {ingredientList.map((ingredient) => (
          <SelectItem key={ingredient.id} value={ingredient.name}>
            {ingredient.name} - {ingredient.quantity  || ''} {ingredient.unit} @ {formatCurrency(ingredient.price)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


