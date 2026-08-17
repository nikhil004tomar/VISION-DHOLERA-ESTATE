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

const API_URL = "http://localhost:8000";

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
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse text-xl font-semibold text-gray-500">
            Loading Properties...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* =========================
            HEADER
        ========================= */}

        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="inline-block px-5 py-2 rounded-full bg-amber-100 text-amber-700 font-semibold text-sm">
            Premium Investment Projects
          </span>

          <h2 className="mt-5 text-5xl font-extrabold text-slate-900">
            Discover Your{" "}
            <span className="text-amber-500">
              Future Investment
            </span>
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            Explore premium residential and commercial
            projects located in the rapidly growing
            Dholera Smart City.
          </p>

        </div>

        {/* =========================
            NO PROJECTS
        ========================= */}

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No Properties Available
          </div>
        ) : (

          /* =========================
             PROJECT GRID
          ========================= */

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
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group border"
                >

                  {/* =========================
                      IMAGE
                  ========================= */}

                  <div className="relative h-64 overflow-hidden bg-gray-100">

                    <Image
                      src={imageUrl}
                      alt={
                        project.title ||
                        "Property"
                      }
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition duration-500"
                      onError={(event) => {
                        console.error(
                          "IMAGE FAILED:",
                          imageUrl
                        );

                        event.currentTarget.style.display =
                          "none";
                      }}
                    />

                    {/* Featured */}

                    {project.featured && (
                      <div className="absolute left-4 top-4 z-10">

                        <span className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">

                          <Star size={14} />

                          Featured Property

                        </span>

                      </div>
                    )}

                    {/* Active */}

                    {project.status && (
                      <div className="absolute right-4 top-4 z-10">

                        <span className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">

                          <CheckCircle size={14} />

                          Active

                        </span>

                      </div>
                    )}

                  </div>

                  {/* =========================
                      CONTENT
                  ========================= */}

                  <div className="p-7">

                    <div className="text-sm text-amber-600 font-semibold uppercase">
                      {project.property_type}
                    </div>

                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {project.title}
                    </h3>

                    <div className="mt-3 flex items-center text-gray-500">

                      <MapPin
                        size={18}
                        className="mr-2 text-amber-500"
                      />

                      {project.location}

                    </div>

                    <div className="mt-6 flex justify-between items-center border-t pt-5">

                      <div>

                        <div className="text-sm text-gray-500">
                          Starting Price
                        </div>

                        <div className="text-3xl font-bold text-amber-600">
                          {project.price}
                        </div>

                      </div>

                    </div>

                    {/* =========================
                        VIEW DETAILS
                    ========================= */}

                    <Link
                      href={`/project/${encodeURIComponent(
                        project.slug
                      )}`}
                      className="mt-8 flex justify-center items-center gap-2 bg-slate-900 hover:bg-amber-500 duration-300 text-white py-4 rounded-xl font-semibold"
                    >

                      View Details

                      <ArrowRight size={18} />

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