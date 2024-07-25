import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Link as ReactLink } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Link from "../ui/Link";
import { Button } from "../ui/button";
import {
  HomeIcon,
  MenuIcon,
  MicIcon,
  Package,
  SearchIcon,
} from "lucide-react";

const routes = [
  { to: "/", name: "Home", icon: <HomeIcon className='w-5 h-5' /> },
  { to: "/categories", name: "Categories", icon: <MenuIcon className='w-5 h-5' /> },
  { to: "/items", name: "Items", icon: <Package className='w-5 h-5' /> },
];

const Header = () => {
  return (
    <>
      <header className='flex items-center justify-between px-4 py-3 shadow-sm bg-background md:px-6 md:py-4'>
        <ReactLink
          to='/'
          className='flex items-center invisible gap-2 font-semibold md:visible'
        >
          <div className='object-contain w-12 aspect-square'>
            <img src='/logo.png' alt='logo' />
          </div>
          <span className='font-headings'>MMS </span>
        </ReactLink>
        <nav className='items-center hidden gap-2 md:flex'>
          {routes.map((route, key) => (
            <Link key={key} to={route.to} className='font-headings'>
              {route.name}
            </Link>
          ))}
        </nav>
        <div className='flex items-center gap-2'>
          <div className='relative '>
            <SearchIcon className='absolute inset-y-0 left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search menu...'
              className='pl-8 pr-8 rounded-md bg-muted text-muted-foreground focus:ring-2 focus:ring-primary focus:outline-none'
            />
            <Button
              variant='ghost'
              size='icon'
              className='absolute right-0 inset-y-0 text-primary'
            >
              <MicIcon className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </header>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='absolute top-4 left-4 md:hidden'
          >
            <MenuIcon className='w-6 h-6' />
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link to='#' className='flex items-center gap-2'>
              <MenuIcon className='w-6 h-6' />
              <span>MMS</span>
            </Link>
            {routes.map((route, key) => (
              <Link
                key={key}
                to={route.to}
                className='flex items-center gap-2 '
              >
                {route.icon}
                <span>{route.name}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
