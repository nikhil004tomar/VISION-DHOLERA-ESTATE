import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">

      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-amber-500/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-yellow-600/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">

        {/* Main Footer */}
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Company */}
          <div className="lg:pr-6">

            <h2 className="text-3xl font-bold tracking-tight text-white">
              Vision Dholera
              <span className="ml-1 text-amber-400">
                Estate
              </span>
            </h2>

            <div className="mt-4 h-[2px] w-14 rounded-full bg-amber-400/80" />

            <p className="mt-6 max-w-sm text-[15px] leading-7 text-slate-400">
              Helping investors secure premium residential and commercial
              properties in Dholera Smart City with trust, transparency,
              and expert guidance.
            </p>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-semibold tracking-wide text-white">
              Quick Links
            </h3>

            <div className="mt-3 h-px w-10 bg-amber-400/70" />

            <ul className="mt-7 space-y-4 text-[15px]">

              <li>
                <Link
                  href="#home"
                  className="group flex items-center text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-amber-400"
                >
                  <span className="mr-2 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-4" />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="#about"
                  className="group flex items-center text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-amber-400"
                >
                  <span className="mr-2 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-4" />
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="#benefits"
                  className="group flex items-center text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-amber-400"
                >
                  <span className="mr-2 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-4" />
                  Why Invest
                </Link>
              </li>

              <li>
                <Link
                  href="#contact"
                  className="group flex items-center text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-amber-400"
                >
                  <span className="mr-2 h-px w-0 bg-amber-400 transition-all duration-300 group-hover:w-4" />
                  Contact
                </Link>
              </li>

            </ul>

          </div>


          {/* Contact */}
          <div>

            <h3 className="text-lg font-semibold tracking-wide text-white">
              Contact Info
            </h3>

            <div className="mt-3 h-px w-10 bg-amber-400/70" />

            <div className="mt-7 space-y-6">

              {/* Phone */}
              <div className="group flex items-start gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/[0.06]">
                  <Phone
                    size={17}
                    className="text-amber-400"
                  />
                </div>

                <span className="pt-1 text-[14px] text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  +91 97738 92312
                </span>

              </div>


              {/* Email */}
              <div className="group flex items-start gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/[0.06]">
                  <Mail
                    size={17}
                    className="text-amber-400"
                  />
                </div>

                <span className="break-all pt-1 text-[14px] text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  visiondholeraestates@gmail.com
                </span>

              </div>


              {/* Address */}
              <div className="group flex items-start gap-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/[0.06]">
                  <MapPin
                    size={17}
                    className="text-amber-400"
                  />
                </div>

                <div className="text-[13px] leading-6 text-slate-400">

                  <p className="font-medium text-slate-300">
                    Vision Dholera Estate
                  </p>

                  <p className="mt-2">
                    <span className="font-medium text-slate-300">
                       Address:
                    </span>{" "}
                   OFFICE NO-1909 18TH FLOOR GALAXY BLUE SAPPHIRE PLAZA SECTOR-4 GREATER NOIDA WEST
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* CTA */}
          <div>

            <h3 className="text-lg font-semibold tracking-wide text-white">
              Ready to Invest?
            </h3>

            <div className="mt-3 h-px w-10 bg-amber-400/70" />

            <p className="mt-6 text-[15px] leading-7 text-slate-400">
              Schedule your consultation and discover premium investment
              opportunities in Dholera Smart City.
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-amber-400/40 bg-amber-400/[0.04] px-6 py-3.5 text-sm font-semibold text-amber-400 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-400/[0.08] hover:shadow-amber-500/10"
            >
              Book Now

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

        </div>


        {/* Divider */}
        <div className="my-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />


        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">

          <p className="text-xs tracking-wide text-slate-500">
            © {new Date().getFullYear()} Vision Dholera Estate. All Rights Reserved.
          </p>

          <p className="text-xs tracking-[0.08em] text-slate-400">
            Investing Today
            <span className="mx-2 text-amber-400/60">•</span>
            Building Tomorrow
            <span className="mx-2 text-amber-400/60">•</span>
            Growing Together
          </p>

          <a
            href="/#home"
            className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:text-amber-400"
          >
            <ArrowUp
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Back to Top
          </a>

        </div>

      </div>
    </footer>
  );
}