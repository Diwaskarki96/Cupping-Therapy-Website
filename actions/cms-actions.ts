"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { serviceSchema, doctorProfileSchema, deleteServiceSchema } from "@/lib/schema/cms"
import { adminActionClient } from "./safe-action"

// Service Actions
export const createService = adminActionClient
  .inputSchema(serviceSchema)
  .metadata({ name: "create-service" })
  .action(async ({ parsedInput }) => {
    const service = await prisma.service.create({
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        iconName: parsedInput.iconName,
        order: parsedInput.order,
        isActive: parsedInput.isActive,
      },
    })

    revalidatePath("/admin/services")
    revalidatePath("/")
    return { success: true, service }
  })

export const updateService = adminActionClient
  .inputSchema(serviceSchema)
  .metadata({ name: "update-service" })
  .action(async ({ parsedInput }) => {
    if (!parsedInput.id) throw new Error("Service ID is required")

    const service = await prisma.service.update({
      where: { id: parsedInput.id },
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        iconName: parsedInput.iconName,
        order: parsedInput.order,
        isActive: parsedInput.isActive,
      },
    })

    revalidatePath("/admin/services")
    revalidatePath("/")
    return { success: true, service }
  })

export const deleteService = adminActionClient
  .inputSchema(deleteServiceSchema)
  .metadata({ name: "delete-service" })
  .action(async ({ parsedInput }) => {
    await prisma.service.delete({
      where: { id: parsedInput.id },
    })

    revalidatePath("/admin/services")
    revalidatePath("/")
    return { success: true }
  })

// Doctor Profile Actions
export const updateDoctorProfile = adminActionClient
  .inputSchema(doctorProfileSchema)
  .metadata({ name: "update-doctor-profile" })
  .action(async ({ parsedInput }) => {
    const doctor = await prisma.doctorProfile.findFirst()

    let updated
    if (doctor) {
      updated = await prisma.doctorProfile.update({
        where: { id: doctor.id },
        data: parsedInput,
      })
    } else {
      updated = await prisma.doctorProfile.create({
        data: parsedInput,
      })
    }

    revalidatePath("/admin/doctor")
    revalidatePath("/")
    return { success: true, doctor: updated }
  })
