import {
  ArrowRight,
  CalendarCheck,
  Clock,
  MessageSquare,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { getAppointments } from "@/dal/appointments";
import { getTestimonials } from "@/dal/testimonials";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize",
        status === "confirmed" && "bg-primary/10 text-primary",
        status === "cancelled" && "bg-destructive/10 text-destructive",
        status === "pending" && "bg-muted text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}

export default async function AdminDashboard() {
  const [appointments, testimonials] = await Promise.all([
    getAppointments(),
    getTestimonials(),
  ]);

  const totalBookings = appointments.length;
  const pendingBookings = appointments.filter(
    (a) => a.status === "pending",
  ).length;
  const confirmedBookings = appointments.filter(
    (a) => a.status === "confirmed",
  ).length;
  const recentBookings = appointments.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Practice activity, appointment requests, and site content.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-md border bg-background p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Total bookings</p>
              <p className="text-3xl font-semibold">{totalBookings}</p>
            </div>
            <CalendarCheck className="size-5 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-md border bg-background p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Pending requests</p>
              <p className="text-3xl font-semibold">{pendingBookings}</p>
            </div>
            <Clock className="size-5 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-md border bg-background p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-3xl font-semibold">{confirmedBookings}</p>
            </div>
            <MessageSquare className="size-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="overflow-hidden rounded-md border bg-background">
          <div className="flex items-center justify-between gap-3 border-b p-5">
            <div>
              <h2 className="font-semibold">Recent appointments</h2>
              <p className="text-sm text-muted-foreground">
                Latest patient requests submitted from the website.
              </p>
            </div>
            <Link
              href="/admin/bookings"
              className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
            >
              View all
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>

          <div className="divide-y">
            {recentBookings.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No appointment requests yet.
              </div>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {booking.fullName}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {booking.service} &middot;{" "}
                      {new Date(booking.preferredDate).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <section className="rounded-md border bg-background p-5">
            <h2 className="font-semibold">Quick actions</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/admin/testimonials?new=true"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "justify-start",
                )}
              >
                <Plus data-icon="inline-start" />
                Add testimonial
              </Link>
              <Link
                href="/"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "justify-start",
                )}
              >
                <ArrowRight data-icon="inline-start" />
                Open live site
              </Link>
            </div>
          </section>

          <section className="rounded-md border bg-background p-5">
            <p className="text-sm text-muted-foreground">
              Homepage testimonials
            </p>
            <p className="mt-1 text-3xl font-semibold">{testimonials.length}</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
