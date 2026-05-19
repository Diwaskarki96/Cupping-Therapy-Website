import { z } from "zod"

export const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(2, "Title must be at least 2 characters"),
  description: z.string().trim().min(5, "Description must be at least 5 characters"),
  iconName: z.string().trim().min(1, "Icon name is required"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
})

export const doctorProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  bio: z.string().trim().min(10, "Bio must be at least 10 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters"),
  experienceYears: z.number().int().min(0),
  imageUrl: z.string().url("Must be a valid URL").or(z.string().startsWith("/")),
  features: z.array(z.string()).min(1, "At least one feature is required"),
})

export const deleteServiceSchema = z.object({
  id: z.string(),
})
