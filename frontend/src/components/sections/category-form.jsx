import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, editCategorySchema } from "@/utils/validationSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import Loader from "../ui/loader";

// Default values for the form
const defaultValues = {
  name: "",
  description: "",
  image: null,
  mealPeriod: "",
  minAge: null,
};

function CategoryForm({ category, onSave, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(category ? editCategorySchema : categorySchema),
  });

 
  // Update form values when category changes
  React.useEffect(() => {
    if (category) {
      reset({
        ...category,
        image: category.image || null,
      });
    } else {
      reset(defaultValues); // Reset to default values for create category
    }
  }, [category, reset]);


  // Handle form submission
  const onSubmit = (data) => {
    onSave(data);
    reset(defaultValues); // Reset to default values for create category
  };

  return (
    <DialogContent className='w-full max-w-md p-6 rounded-lg shadow-lg bg-background'>
      <DialogHeader>
        <DialogTitle>
          {category ? "Edit Category" : "Create Category"}
        </DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid gap-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' {...register("name")} />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea id='description' {...register("description")} />
            {errors.description && (
              <p className='text-red-500'>{errors.description.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='image'>Image</Label>
            <Input
              id='image'
              type='file'
              accept='image/*'
              onChange={(e) => setValue("image", e.target.files[0])}
            />
            {category && category.image && (
              <img
                src={category.image}
                alt='category'
                className='aspect-square object-contain w-[100px] h-[100px]'
              />
            )}
            {errors.image && (
              <p className='text-red-500'>{errors.image.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='mealPeriod'>Meal Period</Label>
            <Controller
              name='mealPeriod'
              control={control}
              render={({ field }) => (
                <Select
                  id='mealPeriod'
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select meal period' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Breakfast'>Breakfast</SelectItem>
                    <SelectItem value='Lunch'>Lunch</SelectItem>
                    <SelectItem value='Dinner'>Dinner</SelectItem>
                    <SelectItem value='Dessert'>Dessert</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.mealPeriod && (
              <p className='text-red-500'>{errors.mealPeriod.message}</p>
            )}
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='minAge'>Minimum Age</Label>
            <Input
              id='minAge'
              type='number'
              {...register("minAge")}
            />
            {errors.minAge && (
              <p className='text-red-500'>{errors.minAge.message}</p>
            )}
          </div>
          <Button disabled={loading} type='submit'>
            {!loading ? (
              category ? (
                "Update"
              ) : (
                "Save"
              )
            ) : (
              <Loader className='text-primary-foreground' />
            )}
          </Button>
        </form>
      </div>
    </DialogContent>
  );
}


export default CategoryForm;
