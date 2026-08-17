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
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background Ambient Glow: Subtle Warm Gold Tone */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-600/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>

            <h2 className="text-3xl font-bold">
              Vision Dholera
              <span className="text-amber-400"> Estate </span>
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Helping investors secure premium residential and commercial
              properties in Dholera Smart City with trust, transparency,
              and expert guidance.
            </p>


          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3 text-slate-400">

              <li>
                <Link href="#home" className="hover:text-amber-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="#about" className="hover:text-amber-400 transition">
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="#benefits"
                  className="hover:text-amber-400 transition"
                >
                  Why Invest
                </Link>
              </li>

              <li>
                <Link
                  href="#contact"
                  className="hover:text-amber-400 transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold text-white">
              Contact Info
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">
                <Phone className="text-amber-400" size={20} />
                <span className="text-slate-400">
                  +91 97738 92312
                </span>
              </div>

              <div className="flex gap-3">
                <Mail className="text-amber-400" size={20} />
                <span className="text-slate-400 break-all">
                  visiondholeraestates@gmail.com
                </span>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-amber-400" size={20} />
                <span className="text-slate-400">
                  Vision Dholera Estate
                  <br />
                  Registered Office: 1120, Galaxy Daimond Plaza, Sector - 4, Haibatpur, Greater Noida (W), U.P. 201016

                  Branch Office: 810, 8th Floor, 31FIVE Corporate Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015

                  Branch Office: Krishna Market, Gupta Store Road In Front of Laxmi Atta Chakki, Subhashnagar, Clement Town, Dehradun (Uttarakhand) 248002
                </span>
              </div>

            </div>

          </div>

          {/* CTA */}
          <div>

            <h3 className="text-xl font-semibold text-white">
              Ready to Invest?
            </h3>

            <p className="mt-5 leading-7 text-slate-400">
              Schedule your consultation and discover premium investment
              opportunities in Dholera Smart City.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-amber-500/40 px-6 py-3 font-semibold text-amber-400 shadow-md transition duration-300 hover:border-amber-400 hover:bg-slate-800 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/10"
            >
              Book Now
            </Link>

          </div>

        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-white/10"></div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-6 text-center text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()}Vision Dholera Estate. All Rights Reserved.

          </p>

          <p className="text-slate-400">
            Investing Today • Building Tomorrow • Growing Together
          </p>

          <a
            href="/#home"
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-amber-500 hover:text-amber-400"
          >
            <ArrowUp size={18} />
            Back to Top
          </a>

        </div>

      </div>
    </footer>
  );
}