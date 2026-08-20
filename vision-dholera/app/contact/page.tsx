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
      }
    } catch (error: any) {
      console.error(error);

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
      className="relative overflow-hidden bg-white py-24 text-slate-900"
    >
      <div className="absolute left-1/4 top-0 h-[35rem] w-[35rem] -translate-y-1/2 rounded-full bg-amber-200/20 blur-[120px]" />
      <div className="absolute bottom-0 right-10 h-[30rem] w-[30rem] rounded-full bg-blue-100/30 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-blue-900">
            Let's Connect
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-blue-950 md:text-5xl">
            Book Your <span className="text-amber-500">Site-Now</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-700">
            Interested in investing in Dholera Smart City? Fill out the form
            below and our property experts will contact you shortly.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">

          {/* Left Side */}
          <div className="space-y-8">

            <div>
              <h3 className="text-3xl font-bold text-blue-950">
                Get in Touch
              </h3>

              <p className="mt-4 leading-relaxed text-slate-700">
                Our experienced advisors are ready to help you choose the best
                investment opportunity in Dholera Smart City.
              </p>
            </div>
                        {/* Contact Cards */}

            <div className="space-y-6">

              {/* Phone */}
              <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-amber-300">

                <div className="rounded-xl bg-blue-50 p-4 text-blue-900">
                  <Phone size={24} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-900">
                    Call Us
                  </h4>

                  <p className="mt-1 text-lg font-medium text-slate-900">
                    +91 97738 92312
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-amber-300">

                <div className="rounded-xl bg-blue-50 p-4 text-blue-900">
                  <Mail size={24} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-900">
                    Email
                  </h4>

                  <p className="mt-1 text-lg font-medium text-slate-900">
                    visiondholeraestates@gmail.com
                  </p>
                </div>

              </div>

              {/* Office */}
              <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-amber-300">

                <div className="rounded-xl bg-blue-50 p-4 text-blue-900">
                  <MapPin size={24} />
                </div>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-900">
                    Office
                  </h4>

                  <p className="mt-1 text-lg font-medium text-slate-900">
                    Registered Office: 1120, Galaxy Daimond Plaza, Sector - 4, Haibatpur, Greater Noida (W), U.P. 201016

Branch Office: 810, 8th Floor, 31FIVE Corporate Rd, Prahlad Nagar, Ahmedabad, Gujarat 380015

Branch Office: Krishna Market, Gupta Store Road In Front of Laxmi Atta Chakki, Subhashnagar, Clement Town, Dehradun (Uttarakhand) 248002
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Contact Form */}

          <div className="rounded-3xl border border-slate-300 bg-white p-8 shadow-xl md:p-10">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

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
                  required
                  className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
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
                  required
                  className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
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
                  required
                  className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
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
                  required
                  className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />

              </div>
                            {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-4 text-lg font-bold text-blue-950 transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={20} />

                {loading ? "Submitting..." : "Book-Now"}
              </button>

              {/* Status */}

              {status && (
                <div
                  className={`rounded-xl p-4 text-center font-medium ${
                    status.startsWith("✅")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status}
                </div>
              )}

              <p className="text-center text-xs text-slate-500">
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