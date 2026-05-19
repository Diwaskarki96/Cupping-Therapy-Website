import { auth } from "../lib/auth"
import dotenv from "dotenv"

dotenv.config()

async function main() {
  console.log("Seeding admin user...")
  try {
    const user = await auth.api.signUpEmail({
      body: {
        email: "admin@cupping.com",
        password: "AdminPassword123!",
        name: "Admin",
        role: "admin",
      },
    })
    console.log("Admin user created successfully:", user)
  } catch (err: any) {
    console.error("Error creating admin user:", err.message || err)
  }
}

main()
