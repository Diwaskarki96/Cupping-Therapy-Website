import prisma from "@/lib/prisma";

export async function getServices() {
  "use cache";
  return prisma.service.findMany({
    orderBy: {
      order: "asc",
    },
  });
}

export async function getActiveServices() {
  "use cache";
  return prisma.service.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: "asc",
    },
  });
}

export async function getServiceById(id: string) {
  "use cache";
  return prisma.service.findUnique({
    where: { id },
  });
}
