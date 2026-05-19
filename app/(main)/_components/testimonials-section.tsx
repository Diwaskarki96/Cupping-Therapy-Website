import { Star } from "lucide-react"
import { FadeIn } from "./fade-in"
import { getActiveTestimonials } from "@/dal/testimonials"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const fallbackTestimonials = [
  {
    content:
      '"Amazing experience... Dr. Bhupal Gautam is very professional, friendly and knowledgeable. He took time to understand my problems and created a personalised protocol."',
    name: "Bini Badal",
    role: "Patient",
    rating: 5,
  },
  {
    content:
      '"Excellent service and good physiotherapy skills. One of the best physiotherapists in Balkot, Bhaktapur."',
    name: "Indra Kunwar",
    role: "Local Resident",
    rating: 5,
  },
  {
    content:
      '"Very thankful to Dr. Bhupal Gautam for helping me recover from my back pain. He has very good experience of various therapy methods."',
    name: "Jas Stha",
    role: "Patient",
    rating: 5,
  },
  {
    content:
      '"I felt immediate relief after the first cupping session. The team is very caring and explains everything thoroughly."',
    name: "Suman Shrestha",
    role: "Athlete",
    rating: 5,
  },
]

export async function TestimonialsSection() {
  const dbTestimonials = await getActiveTestimonials()
  const displayTestimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials

  return (
    <section className="py-16 lg:py-[120px] bg-cmt-surface-bright" id="testimonials">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        <FadeIn className="text-center mb-16">
          <h2 className="font-serif text-[32px] font-semibold leading-[1.3] text-cmt-primary">
            Patient Stories
          </h2>
          <p className="text-cmt-on-surface-variant mt-4">
            Hear from those who have regained their strength and mobility.
          </p>
        </FadeIn>

        <FadeIn>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {displayTestimonials.map((testimonial, idx) => (
                <CarouselItem
                  key={`${testimonial.name}-${idx}`}
                  className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="bg-white p-10 rounded-2xl shadow-sm border border-cmt-surface-variant text-center h-full flex flex-col">
                    <div className="flex justify-center mb-6 text-cmt-tertiary-fixed-dim">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={`star-${i.toString()}`}
                          className={`size-5 ${
                            i < (testimonial.rating || 5)
                              ? "fill-cmt-tertiary-fixed-dim text-cmt-tertiary-fixed-dim"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-serif italic text-cmt-on-surface-variant mb-8 leading-relaxed flex-1">
                      "{testimonial.content.replace(/^["']|["']$/g, '')}"
                    </p>
                    <div>
                      <div className="font-bold text-cmt-primary">{testimonial.name}</div>
                      {testimonial.role && (
                        <div className="text-sm text-cmt-on-surface-variant uppercase tracking-widest mt-1">
                          {testimonial.role}
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-white text-cmt-primary border-cmt-surface-variant hover:bg-cmt-primary hover:text-white transition-colors" />
              <CarouselNext className="-right-12 bg-white text-cmt-primary border-cmt-surface-variant hover:bg-cmt-primary hover:text-white transition-colors" />
            </div>
          </Carousel>
        </FadeIn>
      </div>
    </section>
  )
}

