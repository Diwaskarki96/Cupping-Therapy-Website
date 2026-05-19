import { BarChart3, Video } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-cmt-surface-container w-full py-16 lg:py-[120px]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1200px] mx-auto px-5 lg:px-0">
        <div className="col-span-1 md:col-span-1">
          <div className="font-serif text-[32px] font-semibold leading-[1.3] text-cmt-primary mb-4">
            Cupping Manual Therapy
          </div>
          <p className="text-cmt-on-surface-variant text-base leading-relaxed">
            Heal Naturally. Live Fully. Premium therapeutic care in Bhaktapur.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-bold text-cmt-on-surface mb-6">Contact</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                className="text-cmt-on-surface-variant hover:text-cmt-tertiary-fixed-dim transition-colors text-base"
                href="tel:9813123213"
              >
                Phone: 981-3123213
              </a>
            </li>
            <li>
              <a
                className="text-cmt-on-surface-variant hover:text-cmt-tertiary-fixed-dim transition-colors text-base"
                href="#contact"
              >
                Kaushaltar - Balkot Rd, Bhaktapur
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-bold text-cmt-on-surface mb-6">Clinic Info</h4>
          <ul className="flex flex-col gap-3">
            <li>
              <span className="text-cmt-on-surface-variant text-base">
                Hours: Mon-Sat 9am-6pm
              </span>
            </li>
            <li>
              <a
                className="text-cmt-on-surface-variant hover:text-cmt-tertiary-fixed-dim transition-colors text-base"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-bold text-cmt-on-surface mb-6">Quick Links</h4>
          <div className="flex gap-4">
            <a
              className="size-10 bg-cmt-primary/10 rounded-full flex items-center justify-center text-cmt-primary hover:bg-cmt-primary hover:text-white transition-all"
              href="#"
              aria-label="Social media"
            >
              <BarChart3 className="size-5" />
            </a>
            <a
              className="size-10 bg-cmt-primary/10 rounded-full flex items-center justify-center text-cmt-primary hover:bg-cmt-primary hover:text-white transition-all"
              href="#"
              aria-label="Videos"
            >
              <Video className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 lg:px-0 border-t border-cmt-surface-variant/30 mt-16 pt-8">
        <p className="text-cmt-on-surface-variant text-base text-center">
          © 2024 Cupping Manual Therapy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
