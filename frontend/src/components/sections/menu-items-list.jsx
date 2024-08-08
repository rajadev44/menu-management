import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

export default function MenuList({ menuItems, handleUpdateMenuItem, handleDeleteMenuItem, selectedCategory }) {
  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {filteredMenuItems.map((item) => (
        <Card key={item.id} className='transition-shadow duration-300 shadow-lg hover:shadow-xl'>
          <CardHeader>
            <CardTitle className='text-lg font-bold'>{item.name}</CardTitle>
            <CardDescription className='text-muted-foreground'>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className='mb-4 rounded-md' />
            )}
            <div className='flex items-center justify-between'>
              <span className='font-bold text-primary'>{formatCurrency(item.price)}</span>
              <div className='flex gap-2'>
                <Button variant='secondary' size='sm' onClick={() => handleUpdateMenuItem(item.id)}>
                  Edit
                </Button>
                <Button variant='destructive' size='sm' onClick={() => handleDeleteMenuItem(item.id)}>
                  Delete
                </Button>
              </div>
            </div>
            <div className='mt-4'>
              <h3 className='mb-2 text-lg font-medium'>Ingredients</h3>
              <ul className='pl-4 list-disc'>
                {item.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='mt-4'>
              <h3 className='mb-2 text-lg font-medium'>Category</h3>
              <p className='text-muted-foreground'>{item.category}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
