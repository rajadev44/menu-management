import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Image Required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image" }
);

const imageOrUrlSchema = z.union([
  fileSchema.refine((file) => file.size > 0, "Image Required"),
  z.string().url("Invalid image URL")
]);

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: imageSchema.refine((file) => file.size > 0, "Image Required"),
  mealPeriod: z.string().min(1, { message: "Please select Meal period" }),
  minAge: z.coerce
    .number()
    .nonnegative({ message: "Minimum age cannot be negative" })
    .min(1, { message: "Minimum age should be greater than 1" }),
});

export const editCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: imageOrUrlSchema.optional(),
  mealPeriod: z.string().min(1, { message: "Please select Meal period" }),
  minAge: z.coerce
    .number()
    .nonnegative({ message: "Minimum age cannot be negative" })
    .min(1, { message: "Minimum age should be greater than 1" }),
});


export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than zero"),
  category: z.string().min(1, "Category is required"),
  imageUrl: imageSchema.refine((file) => file.size > 0, "Image is required"),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Ingredient name is required"),
      price: z.coerce.number().nonnegative("Price must be non-negative"),
      quantity: z.coerce.number().nonnegative("Quantity must be non-negative"),
      unit: z.string().optional(),
    })
  ).min(1, { message: 'Please attach at least one ingredient' }),
  sizes: z.array(
    z.object({
      name: z.string().min(1, "Size Name is required"),
      price: z.coerce.number().nonnegative("Price must be non-negative"),
    })
  ).min(1, { message: 'Please attach at least one size variation' }),
  baseIngredients: z.array(
    z.object({
      name: z.string().min(1, "Base ingredient name is required"),
    })
  ).min(1, { message: 'Please attach at least one base ingredient' }),
});


export const editMenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than zero"),
  category: z.string().min(1, "Category is required"),
  imageUrl: imageOrUrlSchema.optional(),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Ingredient name is required"),
      price: z.coerce.number().nonnegative("Price must be non-negative"),
      quantity: z.coerce.number().nonnegative("Quantity must be non-negative"),
      unit: z.string().optional(),
    })
  ).min(1, { message: 'Please attach at least one ingredient' }),
  sizes: z.array(
    z.object({
      name: z.string().min(1, "Size label is required"),
      price: z.coerce.number().nonnegative("Price must be non-negative"),
    })
  ).min(1, { message: 'Please attach at least one size variation' }),
  baseIngredients: z.array(
    z.object({
      name: z.string().min(1, "Base ingredient name is required"),
    })
  ).min(1, { message: 'Please attach at least one base ingredient' }),
});