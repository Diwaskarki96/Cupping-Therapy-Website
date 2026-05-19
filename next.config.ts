import type { NextConfig } from "next"
import fs from "node:fs"
import path from "node:path"

// Clean up old conflicting admin files/folders
const pathsToDelete = [
  path.join(process.cwd(), "app/(admin)/page.tsx"),
  path.join(process.cwd(), "app/(admin)/bookings"),
  path.join(process.cwd(), "app/(admin)/testimonials"),
]

for (const p of pathsToDelete) {
  try {
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true })
      console.log(`[next.config.ts] Cleaned up conflicting path: ${p}`)
    }
  } catch (err) {
    console.error(`[next.config.ts] Failed to clean up path ${p}:`, err)
  }
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,
}

export default nextConfig
