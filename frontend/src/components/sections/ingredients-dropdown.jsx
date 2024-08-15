import useSWR from "swr";
import { cn } from "@/lib/utils";
import Loader from "../ui/loader";
import { formatCurrency } from "@/lib/formatters";


import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";



const fetchCategory = (url) => fetch(url).then((res) => res.json());

const IngredientsDropDown = ({ value, onChange, className, all = true }) => {
  const { data: categories, error, isLoading } = useSWR('/api/ingredients', fetchCategory);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  if (isLoading) return <Loader className='text-primary' />;
  if (error) return <div>Error loading ingredients</div>;

  const categoryList = categories || [];

  const handleSelect = (currentValue) => {
    setSelectedValue(currentValue === selectedValue ? "" : currentValue);
    setOpen(false);
    onChange(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedValue
            ? categoryList.find((category) => category.name === selectedValue)?.name
            : "Select Ingredient"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align='start'>
        <Command>
          <CommandInput placeholder="Search ingredient..." className="h-9" />
          <CommandList>
            <CommandEmpty>No ingredient found.</CommandEmpty>
            <CommandGroup>
              {all && (
                <CommandItem
                  value="All"
                  onSelect={() => handleSelect("All")}
                >
                  All
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedValue === "All" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              )}
              {categoryList.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => handleSelect(category.name)}
                >
                  {category.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedValue === category.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default IngredientsDropDown;



export const ItemIngredientsDropDown = ({ value, onChange, className, all = true, ingredients }) => {
  const [open, setOpen] = useState(false);

  if (!ingredients) return <Loader className='text-primary' />;

  const ingredientList = ingredients || [];

  const handleSelect = (selectedValue) => {
    if (selectedValue === value) {
      onChange(""); // Deselect if the same value is selected
    } else {
      onChange(selectedValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[300px] justify-between", className)}
        >
          {value
            ? ingredientList.find((ingredient) => ingredient.name === value)?.name
            : "Select Ingredient..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[300px] p-0"  align='start'>
        <Command>
          <CommandInput placeholder="Search ingredient..." className="h-9" />
          <CommandList>
            <CommandEmpty>No ingredient found.</CommandEmpty>
            <CommandGroup>
              {all && (
                <CommandItem
                  value="All"
                  onSelect={() => handleSelect("All")}
                >
                  All
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === "All" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              )}
              {ingredientList.map((ingredient) => (
                <CommandItem
                  key={ingredient.id}
                  value={ingredient.name}
                  onSelect={() => handleSelect(ingredient.name)}
                >
                  {ingredient.name} - {ingredient.quantity || ''} {ingredient.unit} @ {formatCurrency(ingredient.price)}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === ingredient.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};







// export const ItemIngredientsDropDown = ({ value, onChange, className, all = true, ingredients }) => {
//   if (!ingredients) return <Loader className='text-primary' />;
  
//   const ingredientList = ingredients || [];

//   return (
//     <Select value={value} onValueChange={onChange}>
//       <SelectTrigger className={cn('w-[300px]', className)}>
//         <SelectValue placeholder='Select Ingredient' />
//       </SelectTrigger>
//       <SelectContent>
//         {all && <SelectItem value='All'>All</SelectItem>}
//         {ingredientList.map((ingredient) => (
//           <SelectItem key={ingredient.id} value={ingredient.name}>
//             {ingredient.name} - {ingredient.quantity  || ''} {ingredient.unit} @ {formatCurrency(ingredient.price)}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };
