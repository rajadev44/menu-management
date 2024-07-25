import useSWR from 'swr'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog } from "@/components/ui/dialog"
import CategoryForm from "./category-form"

const fetcher = (url) => fetch(url).then((res) => res.json())

function CategoryList() {
  const { data: categories, mutate } = useSWR('/api/categories', fetcher)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCreateCategory = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = async (categoryId) => {
    await fetch(`/api/categories/${categoryId}`, {
      method: 'DELETE',
    })
    mutate()
  }

  const handleSaveCategory = async (category) => {
    const formData = new FormData();
  
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('mealPeriod', category.mealPeriod);
    formData.append('minAge', category.minAge);
  
    // Check if an image file is present
    if (category.image instanceof File) {
      formData.append('image', category.image);
    }
  
    const method = selectedCategory ? 'PUT' : 'POST';
    const url = selectedCategory 
      ? `/api/categories/${selectedCategory.id}` 
      : '/api/categories';
  
    await fetch(url, {
      method,
      body: formData,
    });
  
    mutate();
    setIsModalOpen(false);
  };
  
  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Restaurant Categories</h1>
        <Button onClick={handleCreateCategory}>Create Category</Button>
      </div>
      <div className="overflow-hidden border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Meal Periods</TableHead>
              <TableHead>Minimum Age</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories && categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <img src={category.image} alt={category.name} width={64} height={64} className="rounded-md" />
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.mealPeriods}</TableCell>
                <TableCell>{category.minAge}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditCategory(category)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <CategoryForm category={selectedCategory} onSave={handleSaveCategory} />
      </Dialog>
    </div>
  )
}

// CategoryList.propTypes = {
//   initialCategories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number,
//       name: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       mealPeriods:ropTypes.string.isRequired,
//       minAge: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// }

export default CategoryList
