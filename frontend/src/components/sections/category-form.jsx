import PropTypes from "prop-types";
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
import { categorySchema } from "@/utils/validationSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";

// Default values for the form
const defaultValues = {
  name: "",
  description: "",
  image: null,
  mealPeriod: "",
  minAge: 0,
};

function CategoryForm({ category, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues,
    resolver: zodResolver(categorySchema),
  });

  // Update form values when category changes
  React.useEffect(() => {
    if (category) {
      reset(category);
    } else {
      reset(defaultValues); // Reset to default values for create category
    }
  }, [category, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <DialogContent className="w-full max-w-md p-6 rounded-lg shadow-lg bg-background">
      <DialogHeader>
        <DialogTitle>
          {category ? "Edit Category" : "Create Category"}
        </DialogTitle>
      </DialogHeader>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setValue("image", e.target.files[0])}
              // File input should not have a value attribute, so removing name here
            />
            {category && category.image && (
              <img
                src={category.image}
                alt="category"
                className="aspect-square object-contain w-[100px] h-[100px]"
              />
            )}
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mealPeriod">Meal Period</Label>
            <Controller
              name="mealPeriod"
              control={control}
              render={({ field }) => (
                <Select
                  id="mealPeriod"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Dessert">Dessert</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.mealPeriod && <p className="text-red-500">{errors.mealPeriod.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="minAge">Minimum Age</Label>
            <Input id="minAge" type="number" {...register("minAge")} />
            {errors.minAge && <p className="text-red-500">{errors.minAge.message}</p>}
          </div>

          <Button type="submit">{category ? "Update" : "Save"}</Button>
        </form>
      </div>
    </DialogContent>
  );
}

CategoryForm.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    mealPeriod: PropTypes.string.isRequired,
    minAge: PropTypes.number.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};

export default CategoryForm;
