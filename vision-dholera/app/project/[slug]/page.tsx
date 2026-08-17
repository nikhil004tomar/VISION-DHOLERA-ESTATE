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
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto" />

          <p className="mt-4 text-gray-500">
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
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">

          <h1 className="text-4xl font-bold text-slate-900">
            Property Not Found
          </h1>

          <p className="mt-4 text-gray-500">
            {error ||
              "The property you are looking for does not exist or is no longer available."}
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-amber-500 transition"
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
    <main className="min-h-screen bg-slate-50">

      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <section className="relative">

        <div className="relative h-[500px] md:h-[650px] w-full bg-slate-200">

          <Image
            src={imageUrl}
            alt={property.title}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Back Button */}

          <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur px-5 py-3 rounded-xl font-semibold text-slate-900 hover:bg-white transition shadow-lg"
          >
            <ArrowLeft size={18} />

            Back
          </button>

          {/* Featured */}

          {property.featured && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">

              <span className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">

                <Star size={16} />

                Featured Property

              </span>

            </div>
          )}

          {/* Active */}

          {property.status && (
            <div className="absolute top-6 right-6 z-20">

              <span className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">

                <CheckCircle size={16} />

                Active

              </span>

            </div>
          )}

          {/* Hero Content */}

          <div className="absolute bottom-0 left-0 right-0 z-10">

            <div className="max-w-7xl mx-auto px-6 pb-12">

              <div className="text-amber-400 uppercase font-semibold text-sm mb-3">
                {property.property_type}
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                {property.title}
              </h1>

              <div className="mt-5 flex items-center gap-2 text-white/90 text-lg">

                <MapPin
                  size={22}
                  className="text-amber-400"
                />

                {property.location}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          PROPERTY CONTENT
      ================================================= */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-3 gap-10">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="lg:col-span-2">

              {/* Description */}

              <div className="bg-white rounded-3xl shadow-lg border p-8 md:p-10">

                <h2 className="text-3xl font-bold text-slate-900">
                  About This Property
                </h2>

                <div className="mt-6 text-gray-600 leading-8 whitespace-pre-line">
                  {property.description}
                </div>

              </div>

              {/* Property Information */}

              <div className="mt-8 bg-white rounded-3xl shadow-lg border p-8 md:p-10">

                <h2 className="text-3xl font-bold text-slate-900">
                  Property Information
                </h2>

                <div className="mt-8 grid sm:grid-cols-2 gap-6">

                  <div className="border rounded-2xl p-5">
                    <p className="text-sm text-gray-500">
                      Property Type
                    </p>

                    <p className="mt-2 font-bold text-lg">
                      {property.property_type}
                    </p>
                  </div>

                  <div className="border rounded-2xl p-5">
                    <p className="text-sm text-gray-500">
                      Location
                    </p>

                    <p className="mt-2 font-bold text-lg">
                      {property.location}
                    </p>
                  </div>

                  {property.area && (
                    <div className="border rounded-2xl p-5">
                      <p className="text-sm text-gray-500">
                        Area
                      </p>

                      <p className="mt-2 font-bold text-lg">
                        {property.area}
                      </p>
                    </div>
                  )}

                  {property.possession && (
                    <div className="border rounded-2xl p-5">
                      <p className="text-sm text-gray-500">
                        Possession
                      </p>

                      <p className="mt-2 font-bold text-lg">
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

              <div className="bg-white rounded-3xl shadow-xl border p-8 sticky top-8">

                <p className="text-gray-500">
                  Starting Price
                </p>

                <h2 className="mt-2 text-4xl font-extrabold text-amber-600 break-words">
                  {property.price}
                </h2>

                <div className="border-t my-7" />

                <div className="space-y-5">

                  <div className="flex items-start gap-3">

                    <MapPin
                      size={20}
                      className="text-amber-500 mt-1"
                    />

                    <div>
                      <p className="text-sm text-gray-500">
                        Location
                      </p>

                      <p className="font-semibold text-slate-900">
                        {property.location}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <CheckCircle
                      size={20}
                      className="text-green-600 mt-1"
                    />

                    <div>
                      <p className="text-sm text-gray-500">
                        Status
                      </p>

                      <p className="font-semibold text-green-600">
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
                  className="mt-8 w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-amber-500 text-white py-4 rounded-xl font-semibold transition"
                >
                  Enquire Now
                </Link>

                {/* Back */}

                <Link
                  href="/project"
                  className="mt-3 w-full flex justify-center items-center gap-2 border border-slate-300 hover:border-amber-500 hover:text-amber-600 py-4 rounded-xl font-semibold transition"
                >
                  <ArrowLeft size={18} />

                  View All Projects
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}