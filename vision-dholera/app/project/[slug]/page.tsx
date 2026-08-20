"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  ArrowLeft,
  CheckCircle,
  Star,
} from "lucide-react";

import api from "@/lib/api";

interface Property {
  id: number;
  title: string;
  slug: string;
  location: string;
  price: string;
  property_type: string;
  description: string;
  featured: boolean;
  status: boolean;
  image: string | null;
  area?: string | null;
  possession?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  keywords?: string | null;
  created_at?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

function getImageUrl(image: string | null) {
  if (!image) {
    return "/placeholder-property.jpg";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${API_URL.replace(/\/$/, "")}/${image.replace(
    /^\//,
    ""
  )}`;
}

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";

  const [property, setProperty] =
    useState<Property | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    async function loadProperty() {
      try {
        setLoading(true);
        setError("");

        console.log(
          "Loading property slug:",
          slug
        );

        const res = await api.get(
          `/api/properties/public/${encodeURIComponent(
            slug
          )}`
        );

        console.log(
          "Property details:",
          res.data
        );

        setProperty(res.data);
      } catch (error: any) {
        console.error(
          "Failed to load property:",
          error
        );

        setProperty(null);

        setError(
          error?.response?.data?.detail ||
          "Property not found."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [slug]);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 pt-40">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-white shadow-md">

            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-amber-500" />

          </div>

          <p className="mt-5 text-sm font-medium tracking-wide text-slate-500">
            Loading property...
          </p>

        </div>

      </main>
    );
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6">

        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Property Not Found
          </h1>

          <p className="mt-4 leading-7 text-slate-500">
            {error ||
              "The property you are looking for does not exist or is no longer available."}
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-amber-500/20"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>

        </div>

      </main>
    );
  }


  // =====================================================
  // IMAGE
  // =====================================================

  const imageUrl = getImageUrl(
    property.image
  );


  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen bg-slate-50 pt-20">

      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <section className="relative">

        <div className="relative h-[500px] w-full overflow-hidden bg-slate-200 md:h-[650px]">

          <Image
            src={imageUrl}
            alt={property.title}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover transition-transform duration-700"
          />


          {/* Premium Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/10" />


          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="group absolute left-5 top-5 z-20 flex items-center gap-2 rounded-xl border border-white/30 bg-white/90 px-5 py-3 font-semibold text-slate-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white md:left-7 md:top-7"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back
          </button>


          {/* Featured */}
          {property.featured && (
            <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2 md:top-7">

              <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-amber-300/40 bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xl">

                <Star
                  size={15}
                  fill="currentColor"
                />

                Featured Property

              </span>

            </div>
          )}


          {/* Active */}
          {property.status && (
            <div className="absolute right-5 top-5 z-20 md:right-7 md:top-7">

              <span className="flex items-center gap-2 rounded-full border border-white/20 bg-green-600/95 px-5 py-2.5 text-sm font-semibold text-white shadow-xl backdrop-blur-md">

                <CheckCircle size={15} />

                Active

              </span>

            </div>
          )}


          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 z-10">

            <div className="mx-auto max-w-7xl px-6 pb-12 md:pb-14">

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-amber-400" />

                <div className="text-sm font-bold uppercase tracking-[0.18em] text-amber-400">
                  {property.property_type}
                </div>

              </div>

              <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
                {property.title}
              </h1>

              <div className="mt-5 flex items-start gap-2 text-base text-white/90 md:text-lg">

                <MapPin
                  size={21}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <span>
                  {property.location}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PROPERTY CONTENT
      ================================================= */}

      <section className="relative overflow-hidden py-16 md:py-20">

        {/* Subtle Background */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-3">


            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="lg:col-span-2">


              {/* Description */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 md:p-10">

                <div className="flex items-center gap-3">

                  <div className="h-8 w-1 rounded-full bg-amber-400" />

                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    About This Property
                  </h2>

                </div>

                <div className="mt-7 leading-8 text-slate-600 whitespace-pre-line">
                  {property.description}
                </div>

              </div>


              {/* Property Information */}
              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40 md:p-10">

                <div className="flex items-center gap-3">

                  <div className="h-8 w-1 rounded-full bg-amber-400" />

                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Property Information
                  </h2>

                </div>


                <div className="mt-8 grid gap-5 sm:grid-cols-2">

                  {/* Property Type */}
                  <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/30">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Property Type
                    </p>

                    <p className="mt-2 text-lg font-bold text-slate-900">
                      {property.property_type}
                    </p>

                  </div>


                  {/* Location */}
                  <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/30">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-2 text-lg font-bold text-slate-900">
                      {property.location}
                    </p>

                  </div>


                  {/* Area */}
                  {property.area && (
                    <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/30">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Area
                      </p>

                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {property.area}
                      </p>

                    </div>
                  )}


                  {/* Possession */}
                  {property.possession && (
                    <div className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50/30">

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Possession
                      </p>

                      <p className="mt-2 text-lg font-bold text-slate-900">
                        {property.possession}
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <div>

              <div className="sticky top-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30">

                {/* Gold Top Accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

                <div className="p-8">

                  <p className="text-sm font-medium uppercase tracking-wide text-black font-bold ">
                    Starting Price Per SQYD
                  </p>

                  <h2 className="mt-2 break-words text-4xl font-extrabold tracking-tight text-amber-600">
                    ₹{property.price}
                  </h2>


                  <div className="my-7 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />


                  <div className="space-y-6">

                    {/* Location */}
                    <div className="flex items-start gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-amber-50">

                        <MapPin
                          size={19}
                          className="text-amber-500"
                        />

                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Location
                        </p>

                        <p className="mt-1 font-semibold leading-6 text-slate-900">
                          {property.location}
                        </p>

                      </div>

                    </div>


                    {/* Status */}
                    <div className="flex items-start gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-200 bg-green-50">

                        <CheckCircle
                          size={19}
                          className="text-green-600"
                        />

                      </div>

                      <div>

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Status
                        </p>

                        <p
                          className={`mt-1 font-semibold ${property.status
                              ? "text-green-600"
                              : "text-red-500"
                            }`}
                        >
                          {property.status
                            ? "Available"
                            : "Not Available"}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Contact Button */}
                  <Link
                    href="/contact"
                    className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-xl hover:shadow-amber-500/20"
                  >
                    Enquire Now

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>


                  {/* Back */}
                  <Link
                    href="https://drive.google.com/drive/folders/1TTSWnsZE4DD6Mm36UPu3OF1GwMFB_MCN?usp=drive_link"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-4 font-semibold text-slate-700 transition-all duration-300 hover:border-amber-400 hover:bg-amber-50/40 hover:text-amber-600"
                  >
                    <ArrowLeft size={18} />

                    View All Projects
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}