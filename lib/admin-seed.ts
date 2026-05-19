import { hashPassword } from "better-auth/crypto"
import prisma from "./prisma"

export const ADMIN_EMAIL = "admin@cupping.com"
export const ADMIN_PASSWORD = "AdminPassword123!"
export const ADMIN_NAME = "Admin"

export async function seedAdminUser() {
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: ADMIN_NAME,
      role: "admin",
    },
    create: {
      email: ADMIN_EMAIL,
      emailVerified: true,
      name: ADMIN_NAME,
      role: "admin",
    },
  })

  const passwordHash = await hashPassword(ADMIN_PASSWORD)
  const credentialAccount = await prisma.account.findFirst({
    where: {
      providerId: "credential",
      userId: admin.id,
    },
  })

  if (credentialAccount) {
    await prisma.account.update({
      where: {
        id: credentialAccount.id,
      },
      data: {
        accountId: admin.id,
        password: passwordHash,
      },
    })
  } else {
    await prisma.account.create({
      data: {
        accountId: admin.id,
        password: passwordHash,
        providerId: "credential",
        userId: admin.id,
      },
    })
  }

  await prisma.session.deleteMany({
    where: {
      userId: admin.id,
    },
  })

  return admin
}
