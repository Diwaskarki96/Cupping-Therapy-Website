import prisma from "@/lib/prisma";

export async function getTestimonials() {
  "use cache";
  return prisma.testimonial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getActiveTestimonials() {
  "use cache";
  return prisma.testimonial.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
