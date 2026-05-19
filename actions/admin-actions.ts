"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { updateBookingStatusSchema } from "@/lib/schema/appointments"
import { testimonialSchema, deleteTestimonialSchema } from "@/lib/schema/testimonials"
import { adminActionClient } from "./safe-action"

// Update booking/appointment status (pending -> confirmed -> cancelled)
export const updateAppointmentStatus = adminActionClient
  .inputSchema(updateBookingStatusSchema)
  .metadata({ name: "update-appointment-status" })
  .action(async ({ parsedInput }) => {
    const { id, status } = parsedInput

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    })

    revalidatePath("/admin/bookings")
    revalidatePath("/admin")
    return {
      success: true,
      appointment: updated,
    }
  })

// Create a new testimonial
export const createTestimonial = adminActionClient
  .inputSchema(testimonialSchema)
  .metadata({ name: "create-testimonial" })
  .action(async ({ parsedInput }) => {
    const { name, role, content, rating, isActive } = parsedInput

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        content,
        rating,
        isActive,
      },
    })

    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return {
      success: true,
      testimonial,
    }
  })

// Update an existing testimonial
export const updateTestimonial = adminActionClient
  .inputSchema(testimonialSchema)
  .metadata({ name: "update-testimonial" })
  .action(async ({ parsedInput }) => {
    const { id, name, role, content, rating, isActive } = parsedInput

    if (!id) {
      throw new Error("Testimonial ID is required for updates")
    }

    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        role,
        content,
        rating,
        isActive,
      },
    })

    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return {
      success: true,
      testimonial: updated,
    }
  })

// Delete a testimonial
export const deleteTestimonial = adminActionClient
  .inputSchema(deleteTestimonialSchema)
  .metadata({ name: "delete-testimonial" })
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput

    await prisma.testimonial.delete({
      where: { id },
    })

    revalidatePath("/admin/testimonials")
    revalidatePath("/")
    return {
      success: true,
    }
  })
