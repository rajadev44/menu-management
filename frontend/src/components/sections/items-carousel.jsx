import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { Link } from "react-router-dom";

export const DynamicCarousel = ({ items }) => {
  return (
    <Carousel className='mt-8 w-full'>
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id} className='md:basis-1/2 lg:basis-1/3'>
            <div className='p-2 h-full'>
              <Card className='h-full flex flex-col'>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className='object-cover w-full rounded-t-lg h-48'
                />
                <CardContent className='p-4 flex flex-col flex-grow'>
                  <h3 className='text-lg font-medium capitalize'>{item.name}</h3>
                  <p className='mt-2 text-muted-foreground flex-grow'>
                    {item.description}
                  </p>
                  <div className='flex items-center justify-between mt-4'>
                    <span className='text-lg font-bold'>{formatCurrency(item.price + (item.sizes?.[0]?.price || 0) )}</span>
                    <Link to={`/items/${item.id}`}>
                      <Button variant='outline' size='sm'>
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=' absolute top-1/2 bg-primary left-4 -translate-y-1/2 z-10 text-primary-foreground shadow-primary shadow-xl '>
        <ChevronLeftIcon className='w-6 h-6' />
      </CarouselPrevious>
      <CarouselNext className='absolute top-1/2 right-4 bg-primary -translate-y-1/2 z-10 text-primary-foreground shadow-xl shadow-primary'>
        <ChevronRightIcon className='w-6 h-6' />
      </CarouselNext>
    </Carousel>
  );
};
