import { redirect } from "next/navigation";
import { getSession } from "@/dal/auth";
import { AdminMobileNav } from "./admin-mobile-nav";
import { AdminSidebarFooter } from "./admin-sidebar-footer";

export async function AdminSessionGuard({
  children,
  variant = "content",
}: {
  children: React.ReactNode;
  variant?: "content" | "sidebar-footer" | "mobile-nav";
}) {
  const session = await getSession();

  if (!session || session.user.role !== "admin") {
    redirect("/auth/login");
  }

  if (variant === "sidebar-footer") {
    return (
      <AdminSidebarFooter name={session.user.name} email={session.user.email} />
    );
  }

  if (variant === "mobile-nav") {
    return (
      <AdminMobileNav
        userName={session.user.name}
        userEmail={session.user.email}
      />
    );
  }

  return <>{children}</>;
}
