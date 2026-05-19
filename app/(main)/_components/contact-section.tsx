import { Phone, MapPin, Clock, Share2, Map } from "lucide-react"
import { FadeIn } from "./fade-in"
import { BookAppointmentDialog } from "./book-appointment-dialog"

export function ContactSection() {
  return (
    <section className="py-16 lg:py-[120px] bg-cmt-surface" id="contact">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FadeIn>
            <h2 className="font-serif text-[32px] font-semibold leading-[1.3] text-cmt-primary mb-8">
              Get In Touch
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="text-cmt-primary p-3 bg-cmt-primary-fixed rounded-lg">
                  <Phone className="size-5" />
                </span>
                <div>
                  <div className="font-bold text-lg">Phone</div>
                  <a
                    className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors"
                    href="tel:9813123213"
                  >
                    981-3123213
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-cmt-primary p-3 bg-cmt-primary-fixed rounded-lg">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <div className="font-bold text-lg">Address</div>
                  <p className="text-cmt-on-surface-variant">
                    Kaushaltar - Balkot Rd, Bhaktapur 44600
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-cmt-primary p-3 bg-cmt-primary-fixed rounded-lg">
                  <Clock className="size-5" />
                </span>
                <div>
                  <div className="font-bold text-lg">Hours</div>
                  <p className="text-cmt-on-surface-variant">Mon-Sat: 9:00 AM - 7:00 PM</p>
                  <span className="text-emerald-600 font-semibold text-sm">Open until 7 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-cmt-primary p-3 bg-cmt-primary-fixed rounded-lg">
                  <Share2 className="size-5" />
                </span>
                <div>
                  <div className="font-bold text-lg">Follow Us</div>
                  <a
                    className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors flex items-center gap-2 mt-1"
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>

            <BookAppointmentDialog>
              <button
                type="button"
                className="w-full cursor-pointer mt-10 bg-cmt-tertiary-fixed text-cmt-primary font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Schedule Online
              </button>
            </BookAppointmentDialog>
          </FadeIn>

          <FadeIn className="h-[450px] rounded-2xl overflow-hidden shadow-inner bg-cmt-surface-container relative">
            <iframe
              src="https://maps.google.com/maps?q=Kaushaltar%20-%20Balkot%20Rd,%20Bhaktapur%2044600&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 absolute inset-0 z-10"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Clinic Location"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
