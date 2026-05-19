"use client"

import {
  Calendar,
  Check,
  Clock,
  Loader2,
  Mail,
  Phone,
  Search,
  X,
} from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { updateAppointmentStatus } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Appointment = {
  id: string
  fullName: string
  email: string
  phone: string
  service: string
  preferredDate: Date
  message: string | null
  status: string
  createdAt: Date
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize",
        status === "confirmed" && "bg-primary/10 text-primary",
        status === "cancelled" && "bg-destructive/10 text-destructive",
        status === "pending" && "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  )
}

export function BookingsTable({
  initialAppointments,
}: {
  initialAppointments: Appointment[]
}) {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isPending, startTransition] = useTransition()
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const filteredAppointments = appointments.filter((app) => {
    const search = searchTerm.toLowerCase()
    const matchesSearch =
      app.fullName.toLowerCase().includes(search) ||
      app.email.toLowerCase().includes(search) ||
      app.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (
    id: string,
    newStatus: "confirmed" | "cancelled"
  ) => {
    setUpdatingId(id)
    startTransition(async () => {
      try {
        const res = await updateAppointmentStatus({ id, status: newStatus })
        if (res?.data?.success) {
          setAppointments((prev) =>
            prev.map((app) =>
              app.id === id ? { ...app, status: newStatus } : app
            )
          )
          toast.success(`Booking status updated to ${newStatus}`)
        } else {
          toast.error(res?.serverError || "Failed to update status")
        }
      } catch {
        toast.error("An error occurred while updating status")
      } finally {
        setUpdatingId(null)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-md border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patient, email, or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            if (value) {
              setStatusFilter(value)
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-md border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b bg-muted/40 text-xs font-medium text-muted-foreground">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => (
                  <tr key={app.id}>
                    <td className="max-w-sm p-4 align-top">
                      <div className="font-medium">{app.fullName}</div>
                      <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Mail className="size-3.5" />
                          {app.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="size-3.5" />
                          {app.phone}
                        </span>
                      </div>
                      {app.message && (
                        <p className="mt-3 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                          {app.message}
                        </p>
                      )}
                    </td>
                    <td className="p-4 align-top font-medium capitalize">
                      {app.service}
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="size-4 text-muted-foreground" />
                        {new Date(app.preferredDate).toLocaleDateString(
                          undefined,
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        Created {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="p-4 text-right align-top">
                      {app.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() =>
                              handleStatusChange(app.id, "confirmed")
                            }
                            disabled={isPending || updatingId === app.id}
                            title="Confirm appointment"
                          >
                            {updatingId === app.id ? <Loader2 /> : <Check />}
                            <span className="sr-only">Confirm appointment</span>
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon-sm"
                            onClick={() =>
                              handleStatusChange(app.id, "cancelled")
                            }
                            disabled={isPending || updatingId === app.id}
                            title="Cancel appointment"
                          >
                            {updatingId === app.id ? <Loader2 /> : <X />}
                            <span className="sr-only">Cancel appointment</span>
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No actions
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
