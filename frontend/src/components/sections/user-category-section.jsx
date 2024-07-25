import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function UserCategorySection() {
  const menuCategories = [
    {
      id: 1,
      image: "/SOUPS 3.png",
      title: "Appetizers",
      description: "Delectable starters to whet your appetite.",
    },
    {
      id: 2,
      image: "/SOUPS 3.png",
      title: "Entrees",
      description: "Hearty main dishes to satisfy your cravings.",
    },
    {
      id: 3,
      image: "/SOUPS 3.png",
      title: "Desserts",
      description: "Indulgent sweets to end your meal on a high note.",
    },
    {
      id: 4,
      image: "/SOUPS 3.png",
      title: "Beverages",
      description: "Refreshing drinks to complement your meal.",
    },
    {
      id: 5,
      image: "/SOUPS 3.png",
      title: "Salads",
      description: "Fresh and healthy options to start your meal.",
    },
    {
      id: 6,
      image: "/SOUPS 3.png",
      title: "Sides",
      description: "Delicious accompaniments to your main dish.",
    },
  ]
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilters, setSelectedFilters] = useState([])
  const filteredCategories = useMemo(() => {
    return menuCategories.filter((category) => {
      const matchesSearchTerm = category.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilters = selectedFilters.length === 0 || selectedFilters.includes(category.id)
      return matchesSearchTerm && matchesFilters
    })
  }, [searchTerm, selectedFilters])
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Menu Categories</h1>
        <p className="text-gray-500">Explore our delicious menu offerings.</p>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                <span>Filters</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {menuCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedFilters.includes(category.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedFilters([...selectedFilters, category.id])
                    } else {
                      setSelectedFilters(selectedFilters.filter((id) => id !== category.id))
                    }
                  }}
                >
                  {category.title}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden shadow-lg rounded-lg">
            <img
              src={category.image}
              alt={category.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">{category.title}</h3>
              <p className="text-gray-500">{category.description}</p>
            </CardContent>
          </Card>
        ))}
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