import { auth } from "./auth";
import prisma from "./prisma";

export const ADMIN_EMAIL = "admin@cupping.com";
export const ADMIN_PASSWORD = "AdminPassword123!";
export const ADMIN_NAME = "Admin";

export async function seedAdminUser() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!existingAdmin) {
    await auth.api.createUser({
      body: {
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        password: ADMIN_PASSWORD,
        role: "admin",
      },
    });
  }

  const admin = await prisma.user.update({
    where: { email: ADMIN_EMAIL },
    data: {
      emailVerified: true,
      name: ADMIN_NAME,
      role: "admin",
    },
  });

  return admin;
}
