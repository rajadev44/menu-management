import { Button } from "@/components/ui/button";
import Link from "../ui/Link";
import { DynamicCarousel } from "./items-carousel";
import TopCategories from "./home-top-category";
import useSWR from "swr";
import Loader from "../ui/loader";

const fetcher = async () => {
  return await Promise.all([
     fetch('/api/menu-items/top').then((res) => res.json()),  
     fetch('/api/categories/top').then((res) => res.json())
  ])
}


export default function HomeComponent() {

  const { data , isLoading, error} = useSWR('/api/home/top', fetcher)
  
  if(isLoading) return  isLoading && <div className='w-full flex justify-center items-center my-2'><Loader className='w-20 h-20'/></div>
  if(error) return  isLoading && <div className='w-full flex justify-center items-center my-2 text-destructive'><p>Sever Busy</p></div>
  
  const [items, categories] = data;

  return (
    <main className='flex-1 flex flex-col gap-16 mb-6'>
      <section className='relative w-full'>
        <div className='w-full h-full dark:bg-white'>
          <img
            src='/hero-image.png'
            alt='Burger'
            className='object-cover w-full hidden md:block mix-blend-multiply'
          />
          <img
            src='/hero-image-small.png'
            alt='Burger'
            className='object-cover w-full md:hidden mix-blend-multiply'
          />
        </div>
        {/* <div className='absolute inset-0 bg-primary/20 opacity-5' /> */}
        {/* <div className='absolute inset-y-0  md: flex flex-col items-center justify-center px-4 text-center'> */}
        <div className='inset-y-0 sm:absolute m-auto left-0 right-0  md:left-1/2 static flex flex-col items-center justify-center px-4 text-center mt-8 sm:mt-0'>
          <h1 className='text-3xl font-bold text-primary md:text-4xl lg:text-5xl'>
            Delicious Dining Experience
          </h1>
          <p className='max-w-xl mt-4 text-muted-foreground/90 sm:text-primary-foreground md:text-lg '>
            Discover the best dishes and flavors at our restaurant. Enjoy a
            memorable dining experience with family and friends.
          </p>
          <div className='flex flex-col gap-1 sm:gap-4 sm:mt-8 mt-4 sm:flex-row'>
            <Link to='/items'>
              <Button className='w-32'> Order Now </Button>
            </Link>
            <Link to='/items'>
              <Button variant='outline' className='text-primary'>
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <TopCategories categories={categories || []} />
      <section className=''>
        <div className='container  px-6 sm:px-12 lg:px-24 '>
          <div className='flex flex-col items-center'>
            <h2 className='text-2xl font-bold md:text-3xl lg:text-4xl'>
              Top Menu Items
            </h2>
            <p className='max-w-xl mt-4 text-muted-foreground md:text-lg'>
              Explore our most popular and delicious menu items.
            </p>
          </div>
          <div className='w-full'>
            <DynamicCarousel items={items || []} />
          </div>
        </div>
      </section>
      
    </main>
  );
}
