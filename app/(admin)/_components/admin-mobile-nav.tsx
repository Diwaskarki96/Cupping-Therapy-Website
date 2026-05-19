"use client";

import { Menu, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { AdminNav } from "./admin-nav";

export function AdminMobileNav({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" />
      </Button>

      <SheetContent side="left" className="w-72 p-0" showCloseButton={false}>
        <SheetHeader className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-primary/10 p-2 text-primary">
                <Shield className="size-4" />
              </div>
              <div className="min-w-0">
                <SheetTitle className="text-sm font-semibold leading-none">
                  Admin Portal
                </SheetTitle>
                <span className="text-xs text-muted-foreground">
                  Cupping Therapy
                </span>
              </div>
            </div>
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close menu"
                />
              }
            />
          </div>
        </SheetHeader>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
          <AdminNav />

          <div className="mt-auto border-t pt-4">
            <div className="px-3 py-2">
              <p className="truncate text-sm font-semibold">{userName}</p>
              <p className="truncate text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
