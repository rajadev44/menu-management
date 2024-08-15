import { z } from "zod";

const fileSchema = z.instanceof(File, { message: "Image Required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image" }
);

const imageOrUrlSchema = z.union([
  fileSchema.refine((file) => file.size > 0, "Image Required"),
  z.string().url("Invalid image URL"),
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
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be greater than zero"),
  category: z.string().min(1, "Category is required"),
  imageUrl: imageSchema.refine((file) => file.size > 0, "Image is required"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        price: z.coerce.number().nonnegative("Price must be non-negative"),
        quantity: z.coerce
          .number()
          .nonnegative("Quantity must be non-negative"),
        unit: z.string().optional(),
      })
    )
    .optional()
    .refine((ingredients) => {
      const uniq = ingredients
        .map((i) => i.name)
        .map((name) => {
          return {
            count: 1,
            name: name,
          };
        })
        .reduce((result, b) => {
          result[b.name] = (result[b.name] || 0) + b.count;

          return result;
        }, {});
      const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
       

      return duplicates.length === 0;
    }, "Ingredients must be unique"),
  sizes: z
    .array(
      z.object({
        name: z.string().min(1, "Size Name is required"),
        price: z.coerce.number().nonnegative("Price must be non-negative"),
      })
    )
    .optional(),
  baseIngredients: z
    .array(
      z.object({
        name: z.string().min(1, "Base ingredient name is required"),
      })
    )
    .optional()
    .refine((ingredients) => {
      const uniq = ingredients
        .map((i) => i.name)
        .map((name) => {
          return {
            count: 1,
            name: name,
          };
        })
        .reduce((result, b) => {
          result[b.name] = (result[b.name] || 0) + b.count;

          return result;
        }, {});
      const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
       
      
      return duplicates.length === 0;
    }, "Base Ingredients must be unique"),
});

export const editMenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be greater than zero"),
  category: z.string().min(1, "Category is required"),
  imageUrl: imageOrUrlSchema.optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        price: z.coerce.number().nonnegative("Price must be non-negative"),
        quantity: z.coerce
          .number()
          .nonnegative("Quantity must be non-negative"),
        unit: z.string().optional(),
      })
    )
    .optional()
    .refine((ingredients) => {
      const uniq = ingredients
        .map((i) => i.name)
        .map((name) => {
          return {
            count: 1,
            name: name,
          };
        })
        .reduce((result, b) => {
          result[b.name] = (result[b.name] || 0) + b.count;

          return result;
        }, {});
      const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
       
      
      return duplicates.length === 0;
    }, "Ingredients must be unique"),
  sizes: z
    .array(
      z.object({
        name: z.string().min(1, "Size label is required"),
        price: z.coerce.number().nonnegative("Price must be non-negative"),
      })
    )
    .optional(),
  baseIngredients: z
    .array(
      z.object({
        name: z.string().min(1, "Base ingredient name is required"),
      })
    )
    .optional()
    .refine((ingredients) => {
      const uniq = ingredients
        .map((i) => i.name)
        .map((name) => {
          return {
            count: 1,
            name: name,
          };
        })
        .reduce((result, b) => {
          result[b.name] = (result[b.name] || 0) + b.count;

          return result;
        }, {});
      const duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);
       
      
      return duplicates.length === 0;
    }, "Base Ingredients must be unique"),
});
