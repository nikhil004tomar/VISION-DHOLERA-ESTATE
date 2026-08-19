"use client";

import React, { useState } from "react";
import api from "@/lib/api";

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
}

export default function CustomerForm({
  isOpen,
  onClose,
  projectTitle,
}: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const message =
        formData.message.trim() ||
        `Customer is interested in booking ${
          projectTitle || "a property"
        }.`;

      const response = await api.post(
        "/api/inquiries/public",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message,
        }
      );

      console.log(
        "Booking inquiry response:",
        response.data
      );

      setSubmitted(true);
    } catch (error: any) {
      console.error(
        "Booking inquiry error:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        "Failed to submit your details. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);

    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-md">

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white shadow-2xl shadow-slate-950/30">

        {/* TOP GOLD ACCENT */}
        <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B]" />


        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-lg text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-white/20 hover:text-[#D4AF37]"
          aria-label="Close"
        >
          ✕
        </button>


        {/* HEADER */}
        <div className="relative overflow-hidden border-b border-[#D4AF37]/40 bg-[#0A192F] px-6 py-9 text-center sm:px-8">

          {/* Subtle Gold Glow */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative">

            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              <span className="h-px w-6 bg-[#D4AF37]/70" />
              Exclusive Portal
              <span className="h-px w-6 bg-[#D4AF37]/70" />
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Customer Registration
            </h1>

            {projectTitle && (
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/65">
                Interested in:{" "}
                <span className="font-medium text-[#D4AF37]">
                  {projectTitle}
                </span>
              </p>
            )}

          </div>

        </div>


        {/* CONTENT */}
        <div className="p-6 sm:p-8">

          {submitted ? (

            /* SUCCESS */
            <div className="space-y-5 py-8 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#0A192F] text-3xl font-bold text-[#D4AF37] shadow-lg shadow-slate-900/10">
                ✓
              </div>

              <div>

                <h2 className="text-2xl font-bold tracking-tight text-[#0A192F]">
                  Thank You!
                </h2>

                <p className="mx-auto mt-3 max-w-sm leading-7 text-slate-500">
                  Your inquiry has been submitted successfully.
                  Our team will contact you shortly.
                </p>

              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-3 rounded-xl border border-[#D4AF37] bg-[#0A192F] px-7 py-3 text-sm font-semibold text-[#D4AF37] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#112240] hover:shadow-lg"
              >
                Close Window
              </button>

            </div>

          ) : (

            /* FORM */
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#0A192F]">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10"
                />

              </div>


              {/* PHONE */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#0A192F]">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10"
                />

              </div>


              {/* EMAIL */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#0A192F]">
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10"
                />

              </div>


              {/* MESSAGE */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#0A192F]">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I am interested in this property..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10"
                />

              </div>


              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37] bg-[#0A192F] px-6 py-4 font-semibold text-[#D4AF37] shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#112240] hover:shadow-xl hover:shadow-slate-900/20 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37]" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Details
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>

          )}

        </div>

      </div>

    </div>
  );
}