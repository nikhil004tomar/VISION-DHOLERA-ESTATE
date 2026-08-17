"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Why Invest", href: "/#benefits" },
    { name: "Project", href: "/project" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md py-3 border-b border-[#D4A03A]/20"
          : "bg-white/80 backdrop-blur-md py-4 border-b border-slate-100"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* Logo Container with fixed dimensions */}
        <Link
          href="/"
          className="relative flex items-center h-12 w-48 transition-transform duration-300 hover:scale-105"
        >
          {/* Absolute image allows logo to be large (e.g. h-28 / h-32) without expanding the header */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-auto">
            <Image
              src="/logo.png"
              alt="Vision Dholera Estates"
              width={240}
              height={100}
              priority
              className="h-28 w-auto max-w-none object-contain drop-shadow-sm"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 rounded-full bg-white px-8 py-3 shadow-md border border-[#D4A03A]/30">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative font-medium text-[#06285F] transition-all duration-300 hover:text-[#D4A03A]
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
              after:bg-[#D4A03A] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full bg-[#06285F] border border-[#D4A03A]/40 px-6 py-2.5 font-semibold text-[#D4A03A] shadow-md transition-all duration-300 hover:bg-[#041c44] hover:border-[#D4A03A] hover:shadow-lg"
          >
            <Phone size={18} className="text-[#D4A03A]" />
            <span>Book Now</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-[#D4A03A]/30 bg-white p-2.5 text-[#06285F] shadow-md lg:hidden hover:text-[#D4A03A]"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="mx-4 mt-3 rounded-2xl border border-[#D4A03A]/30 bg-white p-6 shadow-xl">
          <nav className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-[#06285F] transition hover:text-[#D4A03A]"
              >
                {link.name}
              </Link>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#06285F] border border-[#D4A03A]/40 py-3 font-semibold text-[#D4A03A] shadow-md transition hover:bg-[#041c44]"
            >
              <Phone size={18} />
              Book Now
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}