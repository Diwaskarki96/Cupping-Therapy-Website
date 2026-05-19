import { getTestimonials } from "@/dal/testimonials"
import { TestimonialsManager } from "./_components/testimonials-manager"

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Testimonials</h1>
        <p className="text-sm text-muted-foreground">
          Manage testimonials displayed on your homepage.
        </p>
      </div>

      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  )
}
