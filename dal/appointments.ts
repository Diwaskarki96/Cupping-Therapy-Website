import prisma from "@/lib/prisma";

export async function getAppointments() {
  "use cache";
  return prisma.appointment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAppointmentById(id: string) {
  "use cache";
  return prisma.appointment.findUnique({
    where: { id },
  });
}
