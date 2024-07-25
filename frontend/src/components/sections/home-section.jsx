import { Button } from "@/components/ui/button";
import Link from "../ui/Link";
import { DynamicCarousel } from "./items-carousel";
import TopCategories from "./home-top-category";

const items = [
  {
    image: "/SOUPS 3.png",
    title: "Grilled Salmon",
    description:
      "Succulent grilled salmon fillet served with roasted vegetables and lemon butter sauce.",
    price: "$24.99",
  },
  {
    image: "/SOUPS 2.png",
    title: "Beef Lasagna",
    description:
      "Layers of fresh pasta, ground beef, and a rich béchamel sauce, baked to perfection.",
    price: "$18.99",
  },
  {
    image: "/SOUPS 1.png",
    title: "Chicken Alfredo",
    description:
      "Tender grilled chicken breast served over a bed of fettuccine in a creamy Alfredo sauce.",
    price: "$16.99",
  },
];

const categories = [
  {
    link: "#",
    image: "/SOUPS 3.png",
    title: "Appetizers",
    description: "Explore our delectable selection of starters.",
  },
  {
    link: "#",
    image: "/SOUPS 2.png",
    title: "Main Dishes",
    description: "Indulge in our signature main course offerings.",
  },
  {
    link: "#",
    image: "/SOUPS 1.png",
    title: "Desserts",
    description: "Indulge in our delectable selection of sweets.",
  },
];

// Usage
// This makes the component dynamic and reusable with different categories.

export default function HomeComponent() {
  return (
    <main className='flex-1 flex flex-col gap-16 mb-6'>
      <section className='relative w-full'>
        <div className='w-full h-full'>
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
        <div className='absolute inset-0 bg-primary/20 opacity-5' />
        <div className='absolute inset-y-0  md:left-1/2 flex flex-col items-center justify-center px-4 text-center'>
          <h1 className='text-3xl font-bold text-primary md:text-4xl lg:text-5xl'>
            Delicious Dining Experience
          </h1>
          <p className='max-w-xl mt-4 text-primary-foreground md:text-lg '>
            Discover the best dishes and flavors at our restaurant. Enjoy a
            memorable dining experience with family and friends.
          </p>
          <div className='flex flex-col gap-4 mt-8 sm:flex-row'>
            <Link to='#'>
              <Button className='w-32'> Order Now </Button>
            </Link>
            <Link to='#'>
              <Button variant='outline' className='text-primary'>
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <TopCategories categories={categories} />
      <section className=''>
        <div className='container'>
          <div className='flex flex-col items-center'>
            <h2 className='text-2xl font-bold md:text-3xl lg:text-4xl'>
              Top Menu Items
            </h2>
            <p className='max-w-xl mt-4 text-muted-foreground md:text-lg'>
              Explore our most popular and delicious menu items.
            </p>
          </div>
          <div className='w-11/12 mx-auto'>
            <DynamicCarousel items={items} />
          </div>
        </div>
      </section>
      
    </main>
  );
}
