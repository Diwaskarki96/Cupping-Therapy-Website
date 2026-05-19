import { Suspense } from "react";
import { Shield } from "lucide-react";
import { AdminNav } from "./_components/admin-nav";
import { AdminSessionGuard } from "./_components/admin-session-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/30 text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background p-5 md:flex">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <Shield className="size-5" />
          </div>
          <div className="min-w-0">
            <h1 className="font-semibold leading-none">Admin Portal</h1>
            <span className="text-xs text-muted-foreground">
              Cupping Therapy
            </span>
          </div>
        </div>

        <div className="mt-7">
          <AdminNav />
        </div>

        <Suspense>
          <AdminSessionGuard variant="sidebar-footer">{null}</AdminSessionGuard>
        </Suspense>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header with drawer */}
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-primary" />
            <span className="font-semibold text-sm">Admin Portal</span>
          </div>
          <Suspense>
            <AdminSessionGuard variant="mobile-nav">{null}</AdminSessionGuard>
          </Suspense>
        </header>

        <main className="mx-auto flex w-full max-w-7xl flex-1 overflow-y-auto p-4 md:p-8">
          <Suspense>
            <AdminSessionGuard variant="content">
              <div className="w-full">{children}</div>
            </AdminSessionGuard>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
