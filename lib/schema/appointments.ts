import { z } from "zod"

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  message: z.string().trim().optional(),
})

export const updateBookingStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled"]),
})
