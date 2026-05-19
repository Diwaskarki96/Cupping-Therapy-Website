import { LoginForm } from "./_components/LoginForm"
import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-cmt-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] space-y-8">
        <div className="text-center space-y-2">
          <h1 className="font-serif text-[40px] font-bold text-cmt-primary leading-tight">
            TheraClinic CMS
          </h1>
          <p className="text-cmt-on-surface-variant font-medium tracking-wide text-sm uppercase">
            Internal Administration Portal
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-cmt-surface-variant">
          <LoginForm />
        </div>

        <div className="text-center space-y-6">
          <p className="text-cmt-on-surface-variant/60 text-xs">
            Secure connection ensured by military-grade encryption.
          </p>

          <div className="flex items-center justify-center gap-6">
            <Link href="#" className="text-xs font-semibold text-cmt-primary/70 hover:text-cmt-primary transition-colors underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs font-semibold text-cmt-primary/70 hover:text-cmt-primary transition-colors underline underline-offset-4">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
