import { getDoctorProfile } from "@/dal/doctor"
import { DoctorProfileManager } from "./_components/doctor-manager"

export default async function DoctorProfilePage() {
  const doctor = await getDoctorProfile()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Doctor Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage the doctor's information displayed in the "About" section.
        </p>
      </div>

      <DoctorProfileManager initialDoctor={doctor} />
    </div>
  )
}
