import Image from "next/image"
import {
  ShieldCheck,
  Users,
  UserRoundCog,
  ClipboardList,
  CheckCircle2
} from "lucide-react"
import { FadeIn } from "./fade-in"
import { getDoctorProfile } from "@/dal/doctor"

export async function AboutSection() {
  const doctor = await getDoctorProfile()

  if (!doctor) return null

  const featureIcons = [
    ShieldCheck,
    Users,
    UserRoundCog,
    ClipboardList,
  ]

  return (
    <section className="py-16 lg:py-[120px] bg-cmt-surface" id="about">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-cmt-primary p-8 rounded-xl text-white hidden md:block">
              <span className="block text-4xl font-bold mb-1">{doctor.experienceYears}+</span>
              <span className="text-sm opacity-80 uppercase tracking-widest font-bold">
                Years Experience
              </span>
            </div>
          </FadeIn>

          <FadeIn>
            <span className="font-sans text-xs font-semibold tracking-[0.1em] uppercase text-cmt-on-tertiary-container mb-4 block">
              MEET OUR EXPERT
            </span>
            <h2 className="font-serif text-[32px] font-semibold leading-[1.3] mb-6 text-cmt-primary">
              {doctor.name}
            </h2>
            <p className="text-lg leading-relaxed text-cmt-on-surface-variant mb-6">
              {doctor.bio}
            </p>
            <p className="text-base leading-relaxed text-cmt-on-surface-variant mb-8">
              {doctor.description}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {doctor.features.map((feature, index) => {
                const IconComponent = featureIcons[index] || CheckCircle2

                return (
                  <div key={feature} className="flex items-center gap-3">
                    <IconComponent className="size-5 text-cmt-tertiary-fixed-dim" />
                    <span className="font-semibold">{feature}</span>
                  </div>
                )
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
