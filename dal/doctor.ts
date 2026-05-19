import prisma from "@/lib/prisma";

export async function getDoctorProfile() {
  "use cache";
  return prisma.doctorProfile.findFirst();
}
