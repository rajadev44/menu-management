import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function MenuItemComponent() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic tomato sauce, mozzarella, and fresh basil",
      price: 14.99,
      category: "Pizza",
      ingredients: [
        { name: "Tomato Sauce", quantity: 1, unit: "cup" },
        { name: "Mozzarella Cheese", quantity: 2, unit: "cups" },
        { name: "Fresh Basil", quantity: 1, unit: "bunch" },
      ],
      customizations: [
        { name: "Extra Cheese", price: 2.0 },
        { name: "Gluten-Free Crust", price: 3.0 },
      ],
    },
    {
      id: 2,
      name: "Grilled Chicken Salad",
      description: "Mixed greens, grilled chicken, tomatoes, and balsamic vinaigrette",
      price: 12.99,
      category: "Salad",
      ingredients: [
        { name: "Mixed Greens", quantity: 4, unit: "cups" },
        { name: "Grilled Chicken", quantity: 6, unit: "oz" },
        { name: "Tomatoes", quantity: 1, unit: "pint" },
        { name: "Balsamic Vinaigrette", quantity: 2, unit: "tbsp" },
      ],
      customizations: [
        { name: "Add Avocado", price: 2.0 },
        { name: "Substitute Salmon", price: 4.0 },
      ],
    },
    {
      id: 3,
      name: "Beef Burrito",
      description: "Seasoned ground beef, rice, beans, and salsa wrapped in a flour tortilla",
      price: 9.99,
      category: "Entree",
      ingredients: [
        { name: "Ground Beef", quantity: 6, unit: "oz" },
        { name: "White Rice", quantity: 1, unit: "cup" },
        { name: "Black Beans", quantity: 1, unit: "cup" },
        { name: "Salsa", quantity: 2, unit: "tbsp" },
        { name: "Flour Tortilla", quantity: 1, unit: "each" },
      ],
      customizations: [
        { name: "Add Guacamole", price: 2.0 },
        { name: "Substitute Whole Wheat Tortilla", price: 1.0 },
      ],
    },    {
      id: 3,
      name: "Beef Burrito",
      description: "Seasoned ground beef, rice, beans, and salsa wrapped in a flour tortilla",
      price: 9.99,
      category: "Entree",
      ingredients: [
        { name: "Ground Beef", quantity: 6, unit: "oz" },
        { name: "White Rice", quantity: 1, unit: "cup" },
        { name: "Black Beans", quantity: 1, unit: "cup" },
        { name: "Salsa", quantity: 2, unit: "tbsp" },
        { name: "Flour Tortilla", quantity: 1, unit: "each" },
      ],
      customizations: [
        { name: "Add Guacamole", price: 2.0 },
        { name: "Substitute Whole Wheat Tortilla", price: 1.0 },
      ],
    },    {
      id: 3,
      name: "Beef Burrito",
      description: "Seasoned ground beef, rice, beans, and salsa wrapped in a flour tortilla",
      price: 9.99,
      category: "Entree",
      ingredients: [
        { name: "Ground Beef", quantity: 6, unit: "oz" },
        { name: "White Rice", quantity: 1, unit: "cup" },
        { name: "Black Beans", quantity: 1, unit: "cup" },
        { name: "Salsa", quantity: 2, unit: "tbsp" },
        { name: "Flour Tortilla", quantity: 1, unit: "each" },
      ],
      customizations: [
        { name: "Add Guacamole", price: 2.0 },
        { name: "Substitute Whole Wheat Tortilla", price: 1.0 },
      ],
    },    {
      id: 3,
      name: "Beef Burrito",
      description: "Seasoned ground beef, rice, beans, and salsa wrapped in a flour tortilla",
      price: 9.99,
      category: "Entree",
      ingredients: [
        { name: "Ground Beef", quantity: 6, unit: "oz" },
        { name: "White Rice", quantity: 1, unit: "cup" },
        { name: "Black Beans", quantity: 1, unit: "cup" },
        { name: "Salsa", quantity: 2, unit: "tbsp" },
        { name: "Flour Tortilla", quantity: 1, unit: "each" },
      ],
      customizations: [
        { name: "Add Guacamole", price: 2.0 },
        { name: "Substitute Whole Wheat Tortilla", price: 1.0 },
      ],
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    ingredients: [],
    customizations: [],
  })
  const handleCreateMenuItem = () => {
    setShowModal(true)
  }
  const handleSaveMenuItem = () => {
    setMenuItems([...menuItems, newMenuItem])
    setShowModal(false)
    setNewMenuItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      ingredients: [],
      customizations: [],
    })
  }
  const handleUpdateMenuItem = (id) => {
    const item = menuItems.find((i) => i.id === id)
    setNewMenuItem(item)
    setShowModal(true)
  }
  const handleDeleteMenuItem = (id) => {
    setMenuItems(menuItems.filter((i) => i.id !== id))
  }
  return (
    <div className="container px-0">
      <div className="flex items-center justify-between gap-2 mb-6">
        <h1 className="text-2xl font-bold ">Menu Items</h1>
        <Button onClick={handleCreateMenuItem}>Create New Item</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="transition-shadow duration-300 shadow-lg hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{item.name}</CardTitle>
              <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">${item.price}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleUpdateMenuItem(item.id)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteMenuItem(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-medium">Ingredients</h3>
                <ul className="pl-4 list-disc">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="mb-2 text-lg font-medium">Category</h3>
                <p className="text-muted-foreground">{item.category}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-[500px] max-h-svh h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary-foreground bg-background shadow-lg rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {newMenuItem.id ? "Edit Menu Item" : "Create New Menu Item"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Fill out the form to {newMenuItem.id ? "update" : "add"} a menu item.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveMenuItem()
              }}
            >
              <div className="grid gap-4 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-medium">
                      Item Name
                    </Label>
                    <Input
                      id="name"
                      value={newMenuItem.name}
                      onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                      required
                      className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="font-medium">
                      Item Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newMenuItem.price}
                      onChange={(e) =>
                        setNewMenuItem({
                          ...newMenuItem,
                          price: parseFloat(e.target.value),
                        })
                      }
                      required
                      className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category" className="font-medium">
                    Item Category
                  </Label>
                  <Input />
                </div>
                <div>
                  <Label htmlFor="description" className="font-medium">
                    Item Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newMenuItem.description}
                    onChange={(e) =>
                      setNewMenuItem({
                        ...newMenuItem,
                        description: e.target.value,
                      })
                    }
                    required
                    className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <Label className="font-medium">Ingredients</Label>
                  <div className="grid gap-4">
                    {newMenuItem.ingredients.map((ingredient, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4">
                        <Input
                          placeholder="Ingredient Name"
                          value={ingredient.name}
                          onChange={(e) => {
                            const updatedIngredients = [...newMenuItem.ingredients]
                            updatedIngredients[index].name = e.target.value
                            setNewMenuItem({
                              ...newMenuItem,
                              ingredients: updatedIngredients,
                            })
                          }}
                          required
                          className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                        />
                        <Input
                          type="number"
                          placeholder="Quantity"
                          value={ingredient.quantity}
                          onChange={(e) => {
                            const updatedIngredients = [...newMenuItem.ingredients]
                            updatedIngredients[index].quantity = parseFloat(e.target.value)
                            setNewMenuItem({
                              ...newMenuItem,
                              ingredients: updatedIngredients,
                            })
                          }}
                          required
                          className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                        />
                        <Input
                          placeholder="Unit"
                          value={ingredient.unit}
                          onChange={(e) => {
                            const updatedIngredients = [...newMenuItem.ingredients]
                            updatedIngredients[index].unit = e.target.value
                            setNewMenuItem({
                              ...newMenuItem,
                              ingredients: updatedIngredients,
                            })
                          }}
                          required
                          className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setNewMenuItem({
                          ...newMenuItem,
                          ingredients: [...newMenuItem.ingredients, { name: "", quantity: 0, unit: "" }],
                        })
                      }
                      className="rounded-md bg-muted hover:bg-accent hover:text-accent-foreground border-muted focus:border-primary focus:ring-primary"
                    >
                      Add Ingredient
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="font-medium">Customizations</Label>
                  <div className="grid gap-4">
                    {newMenuItem.customizations.map((customization, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Customization Name"
                          value={customization.name}
                          onChange={(e) => {
                            const updatedCustomizations = [...newMenuItem.customizations]
                            updatedCustomizations[index].name = e.target.value
                            setNewMenuItem({
                              ...newMenuItem,
                              customizations: updatedCustomizations,
                            })
                          }}
                          required
                          className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                        />
                        <Input
                          type="number"
                          placeholder="Price"
                          value={customization.price}
                          onChange={(e) => {
                            const updatedCustomizations = [...newMenuItem.customizations]
                            updatedCustomizations[index].price = parseFloat(e.target.value)
                            setNewMenuItem({
                              ...newMenuItem,
                              customizations: updatedCustomizations,
                            })
                          }}
                          required
                          className="rounded-md bg-muted border-muted focus:border-primary focus:ring-primary"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setNewMenuItem({
                          ...newMenuItem,
                          customizations: [
                            ...newMenuItem.customizations,
                            {
                              name: "",
                              price: 0,
                            },
                          ],
                        })
                      }
                      className="rounded-md bg-muted hover:bg-accent hover:text-accent-foreground border-muted focus:border-primary focus:ring-primary"
                    >
                      Add Customization
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}