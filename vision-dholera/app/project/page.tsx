"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Star,
  CheckCircle,
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
  image?: string | null;
}
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

function getImageUrl(image?: string | null) {
  if (!image) {
    return "/placeholder-property.jpg";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${API_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

export default function Project() {
  const [projects, setProjects] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await api.get("/api/properties/public");

        console.log("PROJECT API RESPONSE:", res.data);

        setProjects(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load properties:",
          error
        );

        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-amber-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            Loading Properties...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/10 py-24"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-amber-300/80 bg-amber-50 px-5 py-2 text-sm font-semibold tracking-wide text-amber-700 shadow-sm">
            Premium Investment Projects
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
            Discover Your{" "}
            <span className="relative inline-block text-amber-500">
              Future Investment
              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-amber-400/30" />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Explore premium residential and commercial
            projects located in the rapidly growing
            Dholera Smart City.
          </p>

        </div>


        {/* No Projects */}
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-sm">
            <p className="text-gray-500">
              No Properties Available
            </p>
          </div>
        ) : (

          /* Project Grid */
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {projects.map((project) => {

              const imageUrl =
                getImageUrl(project.image);

              console.log(
                "PROPERTY:",
                project.title
              );

              console.log(
                "IMAGE:",
                project.image
              );

              console.log(
                "FINAL IMAGE URL:",
                imageUrl
              );

              return (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-md shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-slate-300/40"
                >

                  {/* Top Gold Accent */}
                  <div className="absolute left-0 top-0 z-20 h-1 w-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 transition-all duration-500 group-hover:w-full" />


                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">

                    <Image
                      src={imageUrl}
                      alt={
                        project.title ||
                        "Property"
                      }
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(event) => {
                        console.error(
                          "IMAGE FAILED:",
                          imageUrl
                        );

                        event.currentTarget.style.display =
                          "none";
                      }}
                    />

                    {/* Image Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 opacity-70" />


                    {/* Featured */}
                    {project.featured && (
                      <div className="absolute left-4 top-4 z-10">

                        <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">

                          <Star
                            size={13}
                            fill="currentColor"
                          />

                          Featured Property

                        </span>

                      </div>
                    )}


                    {/* Active */}
                    {project.status && (
                      <div className="absolute right-4 top-4 z-10">

                        <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-green-600/95 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">

                          <CheckCircle size={13} />

                          Active

                        </span>

                      </div>
                    )}

                  </div>


                  {/* Content */}
                  <div className="p-7">

                    {/* Property Type */}
                    <div className="flex items-center gap-2">

                      <span className="h-px w-6 bg-amber-400" />

                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-amber-600">
                        {project.property_type}
                      </div>

                    </div>


                    {/* Title */}
                    <h3 className="mt-3 line-clamp-1 text-2xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-slate-800">
                      {project.title}
                    </h3>


                    {/* Location */}
                    <div className="mt-3 flex items-start text-sm text-slate-500">

                      <MapPin
                        size={17}
                        className="mr-2 mt-0.5 shrink-0 text-amber-500"
                      />

                      <span className="line-clamp-2">
                        {project.location}
                      </span>

                    </div>


                    {/* Price */}
                    <div className="mt-6 border-t border-slate-100 pt-5">

                      <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Starting Price Per SQYD
                      </div>

                      <div className="mt-1 text-2xl font-extrabold tracking-tight text-amber-600">
                        ₹{project.price}
                      </div>

                    </div>


                    {/* View Details */}
                    <Link
                      href={`/project/${encodeURIComponent(
                        project.slug
                      )}`}
                      className="group/button mt-7 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                    >

                      <span>
                        View Details
                      </span>

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover/button:translate-x-1"
                      />

                    </Link>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}