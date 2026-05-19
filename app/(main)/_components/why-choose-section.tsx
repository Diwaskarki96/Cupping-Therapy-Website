import Image from "next/image"
import { Star, ClipboardCheck, ThumbsUp } from "lucide-react"
import { FadeIn } from "./fade-in"

const features = [
  {
    icon: Star,
    title: "4.9/5 Star Excellence",
    description:
      "With over 385 reviews, our commitment to patient care and successful outcomes is unmatched.",
  },
  {
    icon: ClipboardCheck,
    title: "Personalized Plans",
    description:
      "No two bodies are the same. We craft unique treatment journeys based on your medical history.",
  },
  {
    icon: ThumbsUp,
    title: "Friendly Environment",
    description:
      "A welcoming, inclusive clinic that ensures you feel comfortable and valued during every visit.",
  },
]

export function WhyChooseSection() {
  return (
    <section className="py-16 lg:py-[120px] bg-cmt-primary text-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <h2 className="font-serif text-[32px] font-semibold leading-[1.3] mb-8">
              Why Choose Our Clinic?
            </h2>
            <div className="flex flex-col gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-6">
                  <div className="size-12 shrink-0 bg-cmt-tertiary-fixed-dim/20 rounded-full flex items-center justify-center">
                    <feature.icon className="size-5 text-cmt-tertiary-fixed-dim" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xl font-semibold leading-[1.5] tracking-[0.01em] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="relative">
            <Image
              src="/images/therapy-session.png"
              alt="Therapy Session"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full"
            />
            <div className="absolute inset-0 border-2 border-cmt-tertiary-fixed-dim/30 rounded-2xl transform translate-x-4 translate-y-4 -z-10" />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
