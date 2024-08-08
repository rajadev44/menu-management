import useSWR from 'swr'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog } from "@/components/ui/dialog"
import CategoryForm from "./category-form"
import useFetch from '../hook/fetch'
import Loader from '../ui/loader'
import CategoryDelete from './category-delete'

const fetcher = (url) => fetch(url).then((res) => res.json())

function CategoryList() {
  const { data: categories, mutate , isLoading, error} = useSWR('/api/categories', fetcher)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const {loading:categoryUpdate, fetcher: categoryCreateAndUpdate } = useFetch()

  const handleCreateCategory = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
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
  
    await categoryCreateAndUpdate( async () => fetch(url, {
      method,
      body: formData,
    }));
  
    mutate();
    setIsModalOpen(false);
  };
  
  
  if(isLoading) return  isLoading && <div className='w-full flex justify-center items-center my-2'><Loader className='w-20 h-20'/></div>
  if(error) return  isLoading && <div className='w-full flex justify-center items-center my-2 text-destructive'><p>Sever Busy</p></div>

  return (
    <div className=" flex flex-col">
      <div className="flex md:flex-row flex-col gap-5 items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Restaurant Categories</h1>
        <Button onClick={handleCreateCategory}>Create Category</Button>
      </div>
      <div className="border rounded-lg w-full max-w-[100vw] overflow-auto">
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
                <TableCell>{category.mealPeriod}</TableCell>
                <TableCell>{category.minAge}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleEditCategory(category)}>
                      Edit
                    </Button>
                    <CategoryDelete category={category}/>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <CategoryForm loading={categoryUpdate} category={selectedCategory} onSave={handleSaveCategory} />
      </Dialog>
    </div>
  )
}


export default CategoryList
