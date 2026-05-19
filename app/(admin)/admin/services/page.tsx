import { getServices } from "@/dal/services"
import { ServicesManager } from "./_components/services-manager"

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Specialized Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage the services displayed on your homepage.
        </p>
      </div>

      <ServicesManager initialServices={services} />
    </div>
  )
}
