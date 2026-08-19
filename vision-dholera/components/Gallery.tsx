"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  image: string;
  description?: string;
  created_at?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD GALLERY
  // ==========================================

  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);

        const res = await api.get(
          "/api/gallery/public"
        );

        console.log(
          "Gallery API response:",
          res.data
        );

        if (Array.isArray(res.data)) {
          setImages(res.data);
        } else {
          console.error(
            "Invalid gallery response:",
            res.data
          );

          setImages([]);
        }
      } catch (error) {
        console.error(
          "Gallery loading error:",
          error
        );

        setImages([]);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);


  // ==========================================
  // KEEP CURRENT INDEX VALID
  // ==========================================

  useEffect(() => {
    if (images.length === 0) {
      setCurrent(0);
      return;
    }

    if (current >= images.length) {
      setCurrent(0);
    }
  }, [images, current]);


  // ==========================================
  // AUTOMATIC SLIDER
  // ==========================================

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) =>
        prev >= images.length - 1
          ? 0
          : prev + 1
      );
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [images.length]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <div className="flex items-center justify-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-white shadow-sm">

              <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-amber-500" />

            </div>

          </div>

          <p className="mt-5 text-sm font-medium tracking-wide text-slate-500">
            Loading Gallery...
          </p>

        </div>

      </section>
    );
  }


  // ==========================================
  // NO IMAGES
  // ==========================================

  if (images.length === 0) {
    return (
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <div className="rounded-3xl border border-slate-200 bg-white py-16 shadow-sm">

            <p className="text-lg text-slate-500">
              No Gallery Images
            </p>

          </div>

        </div>

      </section>
    );
  }


  // ==========================================
  // CURRENT IMAGE
  // ==========================================

  const currentImage = images[current];

  const imageUrl =
    currentImage.image.startsWith("http")
      ? currentImage.image
      : `${API_URL}${
          currentImage.image.startsWith("/")
            ? ""
            : "/"
        }${currentImage.image}`;


  // ==========================================
  // PREVIOUS
  // ==========================================

  const previousImage = () => {
    setCurrent((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };


  // ==========================================
  // NEXT
  // ==========================================

  const nextImage = () => {
    setCurrent((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };


  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/10 py-20">

      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-slate-200/40 blur-3xl" />


      <div className="relative mx-auto max-w-7xl px-6">


        {/* HEADING */}

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full border border-amber-300/80 bg-amber-50 px-5 py-2 text-sm font-semibold tracking-wide text-amber-700 shadow-sm">
            Our Gallery
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">

            Explore Our{" "}

            <span className="relative inline-block text-amber-500">

              Projects

              <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-amber-400/30" />

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-slate-500">
            Take a look at our latest projects, developments
            and investment opportunities.
          </p>

        </div>


        {/* GALLERY */}

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-1.5 shadow-2xl shadow-slate-300/40">

          <div className="relative overflow-hidden rounded-[1.7rem] bg-black">


            {/* IMAGE */}

            <Image
              key={currentImage.id}
              src={imageUrl}
              alt={
                currentImage.title ||
                "Vision Dholera Gallery"
              }
              width={1500}
              height={900}
              priority={current === 0}
              unoptimized
              className="h-[350px] w-full object-cover transition-transform duration-700 md:h-[500px] lg:h-[600px]"
              onError={(event) => {
                console.error(
                  "Gallery image failed:",
                  imageUrl
                );

                event.currentTarget.src =
                  "/placeholder-property.jpg";
              }}
            />


            {/* GRADIENT */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-slate-950/10" />


            {/* PREVIOUS */}

            {images.length > 1 && (
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous gallery image"
                className="group absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 text-slate-900 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-white md:left-7 md:h-14 md:w-14"
              >
                <ChevronLeft
                  size={27}
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
              </button>
            )}


            {/* NEXT */}

            {images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                aria-label="Next gallery image"
                className="group absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/90 text-slate-900 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-amber-400 hover:bg-white md:right-7 md:h-14 md:w-14"
              >
                <ChevronRight
                  size={27}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>
            )}


            {/* IMAGE INFORMATION */}

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 text-white md:p-10">

              <div className="flex items-center gap-3">

                <span className="h-px w-8 bg-amber-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                  Vision Dholera Estate
                </span>

              </div>

              <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
                {currentImage.title}
              </h3>

              {currentImage.description && (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                  {currentImage.description}
                </p>
              )}

            </div>


            {/* COUNTER */}

            {images.length > 1 && (
              <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md md:right-7 md:top-7">
                {current + 1} / {images.length}
              </div>
            )}

          </div>

        </div>


        {/* DOTS */}

        {images.length > 1 && (
          <div className="mt-7 flex items-center justify-center gap-2">

            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-9 bg-amber-500 shadow-sm shadow-amber-400/40"
                    : "w-2.5 bg-slate-300 hover:bg-amber-300"
                }`}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}