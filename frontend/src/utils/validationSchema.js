// src/utils/validationSchema.js
import { z } from 'zod';


const fileSchema = z.instanceof(File, { message: "Required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);


export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: imageSchema.refine((file) => file.size > 0, "Image Required"),
  mealPeriod: z.string({required_error:"Meal period is required" }),
  minAge: z.coerce.number().nonnegative("Minimum age cannot be negative"),
});
