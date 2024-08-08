// eslint-disable-next-line no-unused-vars
import React from "react";
import UserLayout from "@/components/sections/user-layout";
import Header from "@/components/sections/header";
import { Footer2 } from "@/components/sections/footer";
import Cart from "@/components/sections/cart-section";

export default function MainItemIndividual() {
  return (
    <UserLayout>
      <Header></Header>
      <Cart></Cart>
      <Footer2></Footer2>
    </UserLayout>
  );
}
