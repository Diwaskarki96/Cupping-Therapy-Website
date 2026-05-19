import Image from "next/image"
import { Star } from "lucide-react"
import { FadeIn } from "./fade-in"
import { BookAppointmentDialog } from "./book-appointment-dialog"

export function HeroSection() {
  return (
    <header className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cmt-primary/50 z-10" />
        <Image
          src="/images/hero-bg.png"
          alt="Wellness environment"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-20 max-w-[1200px] mx-auto px-5 lg:px-0 text-center lg:text-left w-full">
        <FadeIn className="max-w-2xl">
          <div className="flex items-center justify-center lg:justify-start gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={`star-${i.toString()}`}
                className="size-5 fill-cmt-tertiary-fixed-dim text-cmt-tertiary-fixed-dim"
              />
            ))}
            <span className="font-semibold text-white ml-2">4.9 (385+ reviews)</span>
          </div>

          <h1 className="font-serif text-[32px] lg:text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-white mb-6">
            Heal Naturally. <br />
            <span className="text-cmt-tertiary-fixed">Live Fully.</span>
          </h1>

          <p className="text-lg leading-relaxed text-white/90 mb-10">
            Experience professional therapeutic care tailored to your body&apos;s unique needs. From
            chronic pain to athletic recovery, we guide you back to peak performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <BookAppointmentDialog>
              <button
                type="button"
                className="bg-cmt-tertiary-fixed-dim cursor-pointer text-cmt-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-cmt-tertiary-fixed transition-all transform hover:-translate-y-1 shadow-lg"
              >
                Book an Appointment
              </button>
            </BookAppointmentDialog>
            <button
              type="button"
              className="border border-white/30 text-white backdrop-blur-sm px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Explore Services
            </button>
          </div>
        </FadeIn>
      </div>
    </header>
  )
}
