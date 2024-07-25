// eslint-disable-next-line no-unused-vars
import React from "react";
import HomeComponent from "@/components/sections/home-section";
import UserLayout from "@/components/sections/user-layout";
import Header from "@/components/sections/header";
import { Footer2 } from "@/components/sections/footer"
export function Home() {
  return (
    <UserLayout>
      <Header/>
      <HomeComponent/>
      <Footer2/>
    </UserLayout>
  );
}
