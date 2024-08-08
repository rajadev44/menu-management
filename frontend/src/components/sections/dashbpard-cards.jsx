import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { PoundSterlingIcon } from "lucide-react"

export default function DashboardCard() {
  const orders = [
    { id: 1, price: 100, category: "Pizza", product: "Laptop" },
    { id: 2, price: 50, category: "Burger", product: "T-Shirt" },
    { id: 3, price: 75, category: "Pizza", product: "Headphones" },
    { id: 4, price: 120, category: "Burger", product: "Dress" },
    { id: 5, price: 80, category: "Pizza", product: "Smartphone" },
    { id: 6, price: 90, category: "Burger", product: "Jeans" },
    { id: 7, price: 60, category: "Pizza", product: "Tablet" },
    { id: 8, price: 40, category: "Burger", product: "Socks" },
    { id: 9, price: 150, category: "Pizza", product: "Gaming Console" },
    { id: 10, price: 70, category: "Burger", product: "Sweater" },
    { id: 11, price: 85, category: "Pizza", product: "Smartwatch" },
    { id: 12, price: 55, category: "Burger", product: "Cheese Burger" },
    { id: 13, price: 55, category: "Burger", product: "Cheese Burger" },
  ]
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((acc, order) => acc + order.price, 0)
  const bestSellingCategory = orders.reduce((acc, order) => {
    acc[order.category] = (acc[order.category] || 0) + 1
    return acc
  }, {})
  const bestSellingCategoryName = Object.keys(bestSellingCategory).reduce(
    (max, key) => (bestSellingCategory[key] > (bestSellingCategory[max]||0) ? key : max),
    ""
  )
  const topSellingProduct = orders.reduce((acc, order) => {
    acc[order.product] = (acc[order.product] || 0) + 1
    return acc
  }, {})
  const topSellingProductName = Object.keys(topSellingProduct).reduce(
    (max, key) => (topSellingProduct[key] > (topSellingProduct[max]||0) ? key : max),
    "",
  )
  const ordersByCategory = orders.reduce((acc, order) => {
    acc[order.category] = (acc[order.category] || []).concat(order.price)
    return acc
  }, {})
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOrders}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <PoundSterlingIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Best Selling Category</CardTitle>
          <TagIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bestSellingCategoryName}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Top Selling Item</CardTitle>
          <PackageIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topSellingProductName}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Item One Revenue</CardTitle>
          <ShirtIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(ordersByCategory["Burger"].reduce((acc, price) => acc + price, 0))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Item Two Revenue</CardTitle>
          <LaptopIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(ordersByCategory["Pizza"].reduce((acc, price) => acc + price, 0))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          <PoundSterlingIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalRevenue / totalOrders)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Highest Priced Item</CardTitle>
          <TagIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(orders.reduce((max, order) => (order.price > max ? order.price : max), 0))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Lowest Priced Item</CardTitle>
          <TagIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(orders.reduce((min, order) => (order.price < min ? order.price : min), Infinity))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Price per Category</CardTitle>
          <TagIcon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>Burger</span>
              <span>
                {formatCurrency(
                  ordersByCategory["Burger"].reduce((acc, price) => acc + price, 0) /
                  ordersByCategory["Burger"].length
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pizza</span>
              <span>
                {formatCurrency(
                  ordersByCategory["Pizza"].reduce((acc, price) => acc + price, 0) /
                  ordersByCategory["Pizza"].length
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


function LaptopIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  )
}


function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function ShirtIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}

