import { z } from "zod"

export const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  role: z.string().trim().optional(),
  content: z.string().trim().min(5, "Content must be at least 5 characters"),
  rating: z.number().int().min(1).max(5).default(5),
  isActive: z.boolean().default(true),
})

export const deleteTestimonialSchema = z.object({
  id: z.string(),
})
