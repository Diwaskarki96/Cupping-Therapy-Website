import { getAppointments } from "@/dal/appointments"
import { BookingsTable } from "./_components/bookings-table"

export default async function BookingsPage() {
  const appointments = await getAppointments()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Bookings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your incoming patient appointment requests.
        </p>
      </div>

      <BookingsTable initialAppointments={appointments} />
    </div>
  )
}
