import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import CategoryDropDown from "./category-dropdown";
import { Link, useNavigate } from "react-router-dom";
import useSWR from 'swr';
import Loader from '@/components/ui/loader';
import MenuItemDelete from "./menu-items-delete";

const fetcher = url => fetch(url).then(res => res.json());

export default function MenuItemComponent() {
  const navigate = useNavigate();
  const { data: menuItems, error, isLoading } = useSWR('/api/menu-items', fetcher);
  const [selectedCategory, setSelectedCategory] = useState("All");


  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);


  if(isLoading) return  isLoading && <div className='w-full flex justify-center items-center my-2'><Loader className='w-20 h-20'/></div>
  if(error) return  isLoading && <div className='w-full flex justify-center items-center my-2 text-destructive'><p>Sever Busy</p></div>
    
  return (
    <div className='container px-0'>
      <div className='flex items-center flex-col md:flex-row justify-between gap-5 mb-6'>
        <h1 className='text-2xl font-bold'>Menu Items</h1>
        <div className='flex items-center gap-2'>
          <CategoryDropDown
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <Link to='/dashboard/items/new'>
            <Button>Create New Item</Button>
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredMenuItems.map((item) => (
          <Card
            key={item.id}
            className='transition-shadow duration-300 shadow-lg hover:shadow-xl'
          >
            <CardHeader>
              <CardTitle className='text-lg font-bold'>{item.name}</CardTitle>
              <CardDescription className='text-muted-foreground'>
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className='mb-4 rounded-md min-w-[100px] min-h-[100px] max-h-[150px] object-cover w-full'
                />
              )}
              <div className='flex items-center justify-between'>
                <span className='font-bold text-primary'>
                  {formatCurrency(item.price)}
                </span>
                <div className='flex gap-2'>
                  <Button
                    variant='secondary'
                    size='sm'
                    onClick={() => navigate(`/dashboard/items/update/${item.id}`)}
                  >
                    Edit
                  </Button>
                  <MenuItemDelete item={item} />
                </div>
              </div>
              
              <div className='mt-4'>
                <h3 className='mb-2 text-lg font-medium'>Category</h3>
                <p className='text-muted-foreground'>{item.category}</p>
              </div>

              <div className='mt-4'>
                <h3 className='mb-2 text-lg font-medium'>Ingredients</h3>
                <ul className='pl-4 list-disc'>
                  {item.baseIngredients.map((base, index) => (
                    <li key={index}>{base.name}</li>
                  ))}
                </ul>
              </div>

              <div className='mt-4'>
                <h3 className='mb-2 text-lg font-medium'>Sizes</h3>
                <ul className='pl-4 list-disc'>
                  {item.sizes.map((size, index) => (
                    <li key={index}>
                      {size.name} - {formatCurrency(size.price)}
                    </li>
                  ))}
                </ul>
              </div>
             
              <div className='mt-4'>
                <h3 className='mb-2 text-lg font-medium'>Addons</h3>
                <ul className='pl-4 list-disc'>
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.quantity ? ingredient.quantity : ''} {ingredient.unit} {ingredient.name} ({formatCurrency(ingredient.price)})
                    </li>
                  ))}
                </ul>
              </div>
             
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
