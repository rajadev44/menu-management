import { useState } from "react"
import useSWR from "swr"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FilePenIcon, TrashIcon } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

// Define fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function IngredientsPage() {
  const { data: ingredients, error, mutate } = useSWR('/api/ingredients', fetcher)
  const [newIngredient, setNewIngredient] = useState({ name: "" })
  const [currentIngredient, setCurrentIngredient] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleNewIngredient = (e) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value })
  }

  const addIngredient = async () => {
    if (newIngredient.name.trim()) {
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIngredient),
      })
      const data = await response.json()
      mutate([...ingredients, data], false)
      setNewIngredient({ name: "" })
    }
  }

  const deleteIngredient = async (id) => {
    await fetch(`/api/ingredients/${id}`, {
      method: 'DELETE',
    })
    mutate(ingredients.filter((i) => i.id !== id), false)
  }

  const updateIngredient = async () => {
    await fetch(`/api/ingredients/${currentIngredient.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentIngredient),
    })
    mutate(ingredients.map((i) => (i.id === currentIngredient.id ? currentIngredient : i)), false)
    setCurrentIngredient(null)
    setIsDialogOpen(false)
  }

  if (error) return <div>Failed to load ingredients</div>
  if (!ingredients) return <div>Loading...</div>

  return (
    <div className="">
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Ingredient</h2>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={newIngredient.name}
                onChange={handleNewIngredient}
                placeholder="Enter ingredient name"
              />
            </div>
            <Button onClick={addIngredient}>Add Ingredient</Button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <div className="grid gap-4">
            {ingredients.map((ingredient) => (
              <Card key={ingredient.id} className="px-4 py-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{ingredient.name}</div>
                  <div className="flex items-center gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => { setCurrentIngredient(ingredient); setIsDialogOpen(true) }}>
                          <FilePenIcon className="h-4 w-4 text-secondary-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Ingredient</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Label htmlFor="edit-name">Name</Label>
                          <Input
                            id="edit-name"
                            name="name"
                            value={currentIngredient?.name || ""}
                            onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
                          />
                          <Button onClick={updateIngredient}>Update Ingredient</Button>
                        </div>
                        <DialogClose />
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" onClick={() => deleteIngredient(ingredient.id)}>
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
