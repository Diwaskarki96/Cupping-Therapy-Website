import {
  Stethoscope,
  Activity,
  Brain,
  Heart,
  Hand,
  HeartPulse,
  ArrowRight,
  Thermometer,
  Bandage,
  Syringe,
  Pill,
  FlaskConical,
  Microscope,
  Apple,
  Dumbbell,
  Zap,
} from "lucide-react"
import { FadeIn } from "./fade-in"
import { getActiveServices } from "@/dal/services"

const iconMap: Record<string, any> = {
  Stethoscope,
  Activity,
  Brain,
  Heart,
  Hand,
  HeartPulse,
  Thermometer,
  Bandage,
  Syringe,
  Pill,
  FlaskConical,
  Microscope,
  Apple,
  Dumbbell,
  Zap,
}

export async function ServicesSection() {
  const services = await getActiveServices()

  return (
    <section className="py-16 lg:py-[120px] bg-cmt-surface-container-low" id="services">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
        <FadeIn className="text-center mb-16">
          <span className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-cmt-on-tertiary-container mb-4 block">
            WHAT WE DO
          </span>
          <h2 className="font-serif text-[32px] font-semibold leading-[1.3] text-cmt-primary">
            Our Specialized Services
          </h2>
          <div className="w-24 h-1 bg-cmt-tertiary-fixed-dim mx-auto mt-6" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Stethoscope

            return (
              <FadeIn key={service.id}>
                <div className="bg-cmt-surface-container-lowest p-8 rounded-xl border border-cmt-surface-variant service-card-hover h-full">
                  <div className="size-16 bg-cmt-primary-fixed rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="size-7 text-cmt-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-semibold leading-[1.5] tracking-[0.01em] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-cmt-on-surface-variant mb-6">{service.description}</p>
                  <a
                    className="text-cmt-primary font-bold flex items-center gap-2 hover:gap-4 transition-all"
                    href="#contact"
                  >
                    Learn More <ArrowRight className="size-4" />
                  </a>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
