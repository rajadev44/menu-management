// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  CircleUser,
  Home,
  Menu,
  MoonStarIcon,
  Package,
  ShoppingCart,
  SunIcon,
  Clock10,
  Utensils
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminFooter from "./admin-footer";
import Link from "../ui/Link";
import { Link as ReactLink } from "react-router-dom";

const routes = [
  { to: "/dashboard", name: "Dashboard", Icon: <Home className='w-4 h-4' /> },
  {
    to: "/dashboard/orders",
    name: "Orders",
    Icon: <ShoppingCart className='w-4 h-4' />,
    badge: (
      <Badge className='flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0'>
        6
      </Badge>
    ),
  },
  {
    to: "/dashboard/categories",
    name: "Categories",
    Icon: <Package className='w-4 h-4' />,
  },
  {
    to: "/dashboard/items",
    name: "Menu Items",
    Icon: <Utensils className='w-4 h-4' />,
  },
  {
    to: "/dashboard/timing",
    name: "Timing",
    Icon: <Clock10 className='w-4 h-4' />,
  },
];

const AdminLayout = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };
  return (
    <div className='container px-0 grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] '>
      <div className='hidden border-r md:block '>
        <div className='flex flex-col h-full max-h-screen gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <ReactLink
              to='/dashboard'
              className='flex items-center gap-2 font-semibold'
            >
              <div className='object-contain w-12 aspect-square'>
                <img src='/logo.png' alt='logo' />
              </div>
              <span className='font-headings'>Restaurant </span>
            </ReactLink>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4 '>
              {routes?.map((route, key) => (
                <Link
                  key={key}
                  to={route.to}
                  className='flex items-center gap-3 rounded-lg'
                >
                  {route.Icon}
                  {route.name}
                  {route?.badge}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col '>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='w-5 h-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                <Link
                  to='#'
                  className='flex items-center gap-2 px-0 text-lg font-semibold'
                >
                  <div className='object-contain w-16 aspect-square'>
                    <img src='/logo.png' />
                  </div>
                  <span className='font-headings'>Restaurant </span>
                </Link>
                {routes?.map((route, key) => (
                  <Link
                    key={key}
                    to={route.to}
                    className='mx-[-0.65rem] flex items-center gap-4 rounded-xl'
                  >
                    {route.Icon}
                    {route.name}
                    {route?.badge}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className='flex-1 w-full'>{/*  */}</div>
          <button onClick={toggleTheme} className='rounded-full'>
            {isDarkMode ? (
              <MoonStarIcon className='w-4 h-4' />
            ) : (
              <SunIcon className='w-4 h-4' />
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='w-5 h-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className='flex-grow p-4 overflow-auto lg:p-6'>{children}</div>
        <AdminFooter></AdminFooter>
      </div>
    </div>
  );
};

export default AdminLayout;
