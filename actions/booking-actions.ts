"use server"

import { revalidatePath } from "next/cache"
import { bookingSchema } from "@/lib/schema/appointments"
import prisma from "@/lib/prisma"
import { noAuthActionClient } from "./safe-action"

export const createAppointment = noAuthActionClient
  .inputSchema(bookingSchema)
  .metadata({ name: "create-appointment" })
  .action(async ({ parsedInput }) => {
    const { fullName, email, phone, service, preferredDate, message } = parsedInput

    const appointment = await prisma.appointment.create({
      data: {
        fullName,
        email,
        phone,
        service,
        preferredDate: new Date(preferredDate),
        message,
        status: "pending",
      },
    })

    revalidatePath("/admin/bookings")
    return {
      success: true,
      appointmentId: appointment.id,
    }
  })
