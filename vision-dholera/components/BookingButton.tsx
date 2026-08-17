"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import CustomerForm from "@/components/customerForm";

interface BookingButtonProps {
  buttonText?: string;
  className?: string;
  projectTitle?: string;
}

export default function BookingButton({
  buttonText = "Book Now",
  className,
  projectTitle,
}: BookingButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const defaultClassName =
    "bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-md border border-slate-800";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsFormOpen(true)}
        className={className || defaultClassName}
      >
        <span>{buttonText}</span>

        <ArrowRight
          size={18}
          className="text-amber-400"
        />
      </button>

      <CustomerForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        projectTitle={projectTitle}
      />
    </>
  );
}