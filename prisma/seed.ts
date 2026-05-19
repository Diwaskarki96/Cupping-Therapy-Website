import "dotenv/config"
import { ADMIN_EMAIL, seedAdminUser } from "../lib/admin-seed"
import prisma from "../lib/prisma"

async function main() {
  await seedAdminUser()
  console.log(`Admin user is ready: ${ADMIN_EMAIL}`)
}

main()
  .catch((error) => {
    console.error("Failed to seed admin user:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
