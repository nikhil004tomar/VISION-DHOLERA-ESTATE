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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        `Customer is interested in booking ${projectTitle || "a property"}.`;

      const response = await api.post("/api/inquiries/public", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message,
      });

      console.log("Booking inquiry response:", response.data);

      setSubmitted(true);
    } catch (error: any) {
      console.error("Booking inquiry error:", error);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden">

        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 p-1 text-xl"
          aria-label="Close"
        >
          ✕
        </button>

        {/* HEADER */}

        <div className="bg-[#0A192F] px-6 py-8 text-center border-b-2 border-[#D4AF37]">

          <span className="text-[#D4AF37] font-semibold text-xs tracking-widest uppercase mb-1 block">
            Exclusive Portal
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Customer Registration
          </h1>

          {projectTitle && (
            <p className="mt-2 text-white/70 text-sm">
              Interested in: {projectTitle}
            </p>
          )}

        </div>

        {/* CONTENT */}

        <div className="p-6 sm:p-8">

          {submitted ? (

            /* SUCCESS */

            <div className="text-center py-8 space-y-4">

              <div className="w-16 h-16 bg-[#0A192F] text-[#D4AF37] border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
                ✓
              </div>

              <h2 className="text-2xl font-bold text-[#0A192F]">
                Thank You!
              </h2>

              <p className="text-slate-600">
                Your inquiry has been submitted successfully.
                Our team will contact you shortly.
              </p>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-2.5 bg-[#0A192F] text-[#D4AF37] font-semibold rounded-lg border border-[#D4AF37] text-sm hover:bg-[#112240] transition-colors"
              >
                Close Window
              </button>

            </div>

          ) : (

            /* FORM */

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}

              <div>

                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-[#D4AF37]"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-[#D4AF37]"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-[#D4AF37]"
                />

              </div>

              {/* MESSAGE */}

              <div>

                <label className="block text-sm font-semibold text-[#0A192F] mb-1.5">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="I am interested in this property..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:border-[#D4AF37] resize-none"
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-[#0A192F] text-[#D4AF37] font-semibold py-3.5 px-6 rounded-lg border border-[#D4AF37] hover:bg-[#112240] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {loading
                  ? "Submitting..."
                  : "Submit Details"}

              </button>

            </form>

          )}

        </div>

      </div>
    </div>
  );
}