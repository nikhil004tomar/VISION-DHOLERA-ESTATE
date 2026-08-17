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

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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

    try {
      const res = await api.post("/api/inquiries/public", form);

      if (res.data.success) {
        setStatus("✅ Thank you! Our team will contact you shortly.");

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus(
          res.data.detail ||
            "❌ Failed to submit inquiry. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Contact form error:", error);

      if (error.response?.data?.detail) {
        setStatus(`❌ ${error.response.data.detail}`);
      } else {
        setStatus("❌ Failed to submit inquiry. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-24"
    >
      {/* Decorative Background */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-amber-500/30 bg-slate-900 px-5 py-2 text-sm font-semibold text-amber-400 shadow-sm">
            Let's Connect
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Book Your
            <span className="text-amber-500"> Site Visit</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Interested in investing in Dholera Smart City? Fill out the form
            below and our property experts will contact you with the best
            investment opportunities.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              Get in Touch
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              Our experienced advisors are ready to help you find the perfect
              residential or commercial investment in Dholera Smart City.
            </p>

            <div className="mt-10 space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl">
                <div className="rounded-xl bg-slate-900 p-4 text-amber-400 shadow-md">
                  <Phone />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    Call Us
                  </h4>
                  <p className="text-slate-600">+91 97738 92312</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl">
                <div className="rounded-xl bg-slate-900 p-4 text-amber-400 shadow-md">
                  <Mail />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    Email
                  </h4>
                  <p className="break-all text-slate-600">
                    visiondholeraestates@gmail.com
                  </p>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:border-amber-500/30 hover:shadow-xl">
                <div className="rounded-xl bg-slate-900 p-4 text-amber-400 shadow-md">
                  <MapPin />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    Office
                  </h4>
                  <p className="text-slate-600">
                    Vision Dholera Estate
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
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
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  required
                />
              </div>

              {/* Email */}
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
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  required
                />
              </div>

              {/* Phone */}
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
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  required
                />
              </div>

              {/* Message */}
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
                  className="w-full rounded-xl border border-slate-300 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-amber-500/30 bg-slate-900 py-4 text-lg font-semibold text-amber-400 shadow-lg transition duration-300 hover:scale-[1.01] hover:border-amber-500 hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={20} className="text-amber-400" />

                {loading ? "Sending..." : "Book Now"}
              </button>

              {/* Status */}
              {status && (
                <p className="text-center font-medium text-slate-800">
                  {status}
                </p>
              )}

              <p className="text-center text-sm text-slate-500">
                🔒 Your information is secure and will never be shared with
                third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}