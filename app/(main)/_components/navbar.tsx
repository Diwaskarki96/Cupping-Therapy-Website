"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { BookAppointmentDialog } from "./book-appointment-dialog"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 w-full z-50 bg-cmt-surface/80 backdrop-blur-md shadow-sm transition-shadow">
      <div className="flex justify-between items-center h-20 px-6 lg:px-0 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="Cupping Manual Therapy Logo"
            width={48}
            height={48}
            className="size-12 object-contain"
          />
          <span className="font-serif text-2xl font-bold text-cmt-primary hidden md:block">
            Cupping Manual Therapy
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base"
            href="#about"
          >
            About
          </a>
          <a
            className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base"
            href="#services"
          >
            Services
          </a>
          <a
            className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base"
            href="#testimonials"
          >
            Testimonials
          </a>
          <a
            className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base"
            href="#contact"
          >
            Contact
          </a>
          <BookAppointmentDialog>
            <button
              type="button"
              className="bg-cmt-primary text-cmt-on-primary cursor-pointer px-6 py-2 rounded-full font-semibold hover:opacity-80 transition-all active:scale-95"
            >
              Book Now
            </button>
          </BookAppointmentDialog>
        </div>

        <button
          type="button"
          className="md:hidden text-cmt-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cmt-surface border-t border-cmt-surface-variant px-6 pb-6">
          <div className="flex flex-col gap-4 pt-4">
            <a
              className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base py-2"
              href="#about"
              onClick={() => setMobileOpen(false)}
            >
              About
            </a>
            <a
              className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base py-2"
              href="#services"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </a>
            <a
              className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base py-2"
              href="#testimonials"
              onClick={() => setMobileOpen(false)}
            >
              Testimonials
            </a>
            <a
              className="text-cmt-on-surface-variant hover:text-cmt-primary transition-colors text-base py-2"
              href="#contact"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>
            <BookAppointmentDialog>
              <button
                type="button"
                className="bg-cmt-primary text-cmt-on-primary px-6 py-3 rounded-full font-semibold hover:opacity-80 transition-all w-full"
              >
                Book Now
              </button>
            </BookAppointmentDialog>
          </div>
        </div>
      )}
    </nav>
  )
}
