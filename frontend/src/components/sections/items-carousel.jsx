import PropTypes from "prop-types";
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

export const DynamicCarousel = ({ items }) => {
  return (
    <Carousel className='mt-8'>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
            <div className='p-2'>
              <Card>
                <img
                  src={item.image}
                  alt={item.title}
                  className='object-contain w-full rounded-t-lg'
                />
                <CardContent className='p-4'>
                  <h3 className='text-lg font-medium'>{item.title}</h3>
                  <p className='mt-2 text-muted-foreground'>
                    {item.description}
                  </p>
                  <div className='flex items-center justify-between mt-4'>
                    <span className='text-lg font-bold'>{item.price}</span>
                    <Button variant='outline' size='sm'>
                      Add to Cart
                    </Button>
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

DynamicCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext,
// } from "@/components/ui/carousel";

// export function DynamicCarousel({ items }) {
//   return (
//     <div className='w-full mx-auto px-4 py-12 md:px-6 md:py-16'>
//       <Carousel className='rounded-lg overflow-hidden'>
//         <CarouselContent>
//           {items.map((item, index) => (
//             <CarouselItem key={index}>
//               <div className='relative'>
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   width={1200}
//                   height={675}
//                   className='w-full h-[400px] md:h-[500px] object-cover mix-blend-multiply'
//                 />
//                 <div className='absolute inset-0 bg-primary/20 opacity-5' />
//                 <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/70 to-transparent p-4 md:p-6 '>
//                   <h3 className='text-white text-lg md:text-xl font-semibold'>
//                     {item.description}
//                   </h3>
//                   <p className='text-white text-sm md:text-base'>
//                     {item.price}
//                   </p>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className='absolute top-1/2 left-4 -translate-y-1/2 z-10 text-primary hover:text-primary '>
//           <ChevronLeftIcon className='w-6 h-6' />
//         </CarouselPrevious>
//         <CarouselNext className='absolute top-1/2 right-4 -translate-y-1/2 z-10 text-primary hover:text-primary'>
//           <ChevronRightIcon className='w-6 h-6' />
//         </CarouselNext>
//       </Carousel>
//     </div>
//   );
// }

// function ChevronLeftIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <path d='m15 18-6-6 6-6' />
//     </svg>
//   );
// }

// function ChevronRightIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <path d='m9 18 6-6-6-6' />
//     </svg>
//   );
// }
