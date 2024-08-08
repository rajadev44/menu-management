import { useState, useMemo } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/formatters"

export default function OrdersComponent() {
  const [orders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      items: [
        { name: "Cheeseburger", quantity: 1, price: 12.99 },
        { name: "Fries", quantity: 1, price: 4.99 },
        { name: "Coke", quantity: 1, price: 2.99 },
      ],
      total: 20.97,
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 15.99 },
        { name: "Salad", quantity: 1, price: 8.99 },
      ],
      total: 24.98,
      status: "Preparing",
    },
    {
      id: "ORD003",
      customer: "Michael Johnson",
      items: [
        { name: "Chicken Alfredo", quantity: 1, price: 18.99 },
        { name: "Garlic Bread", quantity: 1, price: 3.99 },
      ],
      total: 22.98,
      status: "Delivered",
    },
    {
      id: "ORD004",
      customer: "Emily Davis",
      items: [
        { name: "Veggie Burrito", quantity: 1, price: 11.99 },
        { name: "Iced Tea", quantity: 1, price: 2.99 },
      ],
      total: 14.98,
      status: "Cancelled",
    },
    {
      id: "ORD005",
      customer: "David Wilson",
      items: [
        { name: "Spaghetti Bolognese", quantity: 1, price: 16.99 },
        { name: "Garlic Bread", quantity: 1, price: 3.99 },
        { name: "Tiramisu", quantity: 1, price: 6.99 },
      ],
      total: 27.97,
      status: "Preparing",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("id")
  const [sortOrder, setSortOrder] = useState("asc")
  const [filterStatus, setFilterStatus] = useState("all")
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (filterStatus !== "all" && order.status !== filterStatus) {
          return false
        }
        return (
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1
        }
      })
  }, [orders, searchTerm, sortBy, sortOrder, filterStatus])
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }
  const handleFilterStatus = (status) => {
    setFilterStatus(status)
  }
  return (
    <div className="container px-0 ">
      <div className="flex md:flex-row flex-col gap-5 items-center justify-between  mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterStatus === "all"}
                onCheckedChange={() => handleFilterStatus("all")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Pending"}
                onCheckedChange={() => handleFilterStatus("Pending")}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Preparing"}
                onCheckedChange={() => handleFilterStatus("Preparing")}
              >
                Preparing
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Delivered"}
                onCheckedChange={() => handleFilterStatus("Delivered")}
              >
                Delivered
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Cancelled"}
                onCheckedChange={() => handleFilterStatus("Cancelled")}
              >
                Cancelled
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <SearchIcon className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
              className="py-2 pl-10 pr-4 border rounded-md border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("id")}>
                Order #{sortBy === "id" && <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("customer")}>
                Customer
                {sortBy === "customer" && <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("total")}>
                Total
                {sortBy === "total" && <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                Status
                {sortBy === "status" && <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <ul className="space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Pending"
                        ? "warning"
                        : order.status === "Preparing"
                        ? "info"
                        : order.status === "Delivered"
                        ? "success"
                        : "danger"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
