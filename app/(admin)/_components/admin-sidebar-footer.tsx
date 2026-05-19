"use client"

import { Globe, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

export function AdminSidebarFooter({
  name,
  email,
}: {
  name: string
  email: string
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login")
          router.refresh()
        },
      },
    })
  }

  return (
    <div className="mt-auto flex flex-col gap-2 border-t pt-4">
      <div className="px-3 py-2">
        <p className="truncate text-sm font-semibold">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>

      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "sm", variant: "ghost" }),
          "justify-start"
        )}
      >
        <Globe data-icon="inline-start" />
        Go to Website
      </Link>

      <Button
        type="button"
        variant="ghost"
        onClick={handleLogout}
        className="justify-start text-destructive hover:text-destructive"
        size="sm"
      >
        <LogOut data-icon="inline-start" />
        Log Out
      </Button>
    </div>
  )
}
