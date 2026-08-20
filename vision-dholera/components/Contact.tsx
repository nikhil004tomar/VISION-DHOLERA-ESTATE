"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  User,
  MessageSquare,
} from "lucide-react";
import api from "@/lib/api";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 97738 92312",
  },
  {
    icon: Mail,
    title: "Email",
    value: "visiondholeraestates@gmail.com",
    breakAll: true,
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Vision Dholera Estate",
  },
];

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-[#06285F] outline-none transition placeholder:text-slate-400 focus:border-[#D4A03A] focus:ring-4 focus:ring-[#D4A03A]/10";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      const res = await api.post("/api/inquiries/public", form);

      if (res.data.success) {
        setStatus("Thank you! Our team will contact you shortly.");
        setStatusType("success");

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus(
          res.data.detail || "Failed to submit inquiry. Please try again."
        );
        setStatusType("error");
      }
    } catch (error: any) {
      console.error("Contact form error:", error);

      if (error.response?.data?.detail) {
        setStatus(error.response.data.detail);
      } else {
        setStatus("Failed to submit inquiry. Please try again.");
      }
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-amber-50/20 via-white to-slate-50 py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#D4A03A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#06285F]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#D4A03A]/40 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#06285F] shadow-sm">
            Let&apos;s Connect
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#06285F] md:text-5xl">
            Book Your
            <span className="text-[#D4A03A]"> Free Site Visit</span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#D4A03A]" />

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Interested in investing in Dholera Smart City? Fill out the form
            below and our property experts will contact you with the best
            investment opportunities.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-3xl font-bold text-[#06285F]">Get in Touch</h3>

            <div className="mt-3 h-1 w-12 rounded-full bg-[#D4A03A]" />

            <p className="mt-5 leading-8 text-slate-600">
              Our experienced advisors are ready to help you find the perfect
              residential or commercial investment in Dholera Smart City.
            </p>

            <div className="mt-10 space-y-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition duration-300 hover:border-[#D4A03A]/50 hover:shadow-md"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 bg-[#D4A03A]/70 transition group-hover:bg-[#D4A03A]" />

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4A03A]/25 bg-amber-50 text-[#06285F]">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#06285F]">
                        {item.title}
                      </h4>
                      <p
                        className={`text-slate-600 ${item.breakAll ? "break-all" : ""}`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#D4A03A]/30 bg-white p-8 shadow-sm md:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D4A03A] to-transparent" />

            <h3 className="text-2xl font-bold text-[#06285F]">
              Request a Consultation
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Share your details and we will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="relative">
                <User
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div className="relative">
                <Phone
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Tell us about your investment requirements..."
                  value={form.message}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#06285F] py-4 text-base font-semibold text-white shadow-md transition hover:bg-[#041c44] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={18} />
                {loading ? "Sending..." : "Book Now"}
              </button>

              {status && (
                <p
                  className={`rounded-xl px-4 py-3 text-center text-sm font-medium ${
                    statusType === "success"
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {status}
                </p>
              )}

              <p className="text-center text-sm text-slate-500">
                Your information is secure and will never be shared with third
                parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
