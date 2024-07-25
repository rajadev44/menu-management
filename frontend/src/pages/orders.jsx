// eslint-disable-next-line no-unused-vars
import React from "react";
import AdminLayout from "@/components/sections/admin-layout";
import OrdersComponent from "@/components/sections/orders-component";


export function Orders() {
  return (
    <AdminLayout>
        <OrdersComponent/>
    </AdminLayout>
  );
}
