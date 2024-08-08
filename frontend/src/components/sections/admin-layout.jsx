// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  CircleUser,
  Home,
  Menu,
  Package,
  ShoppingCart,
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
import DarkModeBtn from "../ui/dark-mode-btn";

const routes = [
  { to: "/dashboard", name: "Dashboard", Icon: <Home className='w-4 h-4' /> },
  {
    to: "/dashboard/orders",
    name: "Orders",
    Icon: <ShoppingCart className='w-4 h-4' />,
    badge: (
      <Badge className='flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0'>
        5
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
    to: "/dashboard/ingredients",
    name: "Ingredients",
    Icon: <Package className='w-4 h-4' />,
  },
  {
    to: "/dashboard/timing",
    name: "Timing",
    Icon: <Clock10 className='w-4 h-4' />,
  },
];

const AdminLayout = ({ children }) => {

  return (
    <div className='container px-0 grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] '>
      <div className='hidden border-r md:block sticky top-0 left-0 max-h-screen'>
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
        <header className='sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6'>
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
          <DarkModeBtn/>
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
              <DropdownMenuSeparator />
              <DropdownMenuItem><ReactLink to='/dashboard/login'>Logout</ReactLink></DropdownMenuItem>
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
