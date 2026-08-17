"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  image: string;
  description?: string;
  created_at?: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

        const res = await api.get("/api/gallery/");

        console.log("Gallery API response:", res.data);

        if (Array.isArray(res.data)) {
          setImages(res.data);
        } else {
          console.error("Invalid gallery response:", res.data);
          setImages([]);
        }
      } catch (error) {
        console.error("Gallery loading error:", error);
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
        prev >= images.length - 1 ? 0 : prev + 1
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
          </div>

          <p className="mt-4 text-gray-500">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="rounded-3xl bg-gray-50 border border-gray-200 py-16">
            <p className="text-gray-500 text-lg">
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

  /**
   * Backend returns something like:
   *
   * /uploads/gallery/image.jpg
   *
   * or:
   *
   * /uploads/properties/image.jpg
   *
   * Convert it into:
   *
   * http://localhost:8000/uploads/...
   */

  const imageUrl = currentImage.image.startsWith("http")
    ? currentImage.image
    : `${API_URL}${currentImage.image.startsWith("/") ? "" : "/"}${
        currentImage.image
      }`;

  // ==========================================
  // PREVIOUS
  // ==========================================

  const previousImage = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // ==========================================
  // NEXT
  // ==========================================

  const nextImage = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}

        <div className="text-center mb-10">
          <span className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-4">
            Our Gallery
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Explore Our{" "}
            <span className="text-blue-600">
              Projects
            </span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Take a look at our latest projects, developments
            and investment opportunities.
          </p>
        </div>

        {/* GALLERY */}

        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black">

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
            className="w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover"
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* PREVIOUS */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous gallery image"
              className="
                absolute
                left-4 md:left-6
                top-1/2
                -translate-y-1/2
                w-12 h-12
                md:w-14 md:h-14
                flex
                items-center
                justify-center
                rounded-full
                bg-white/90
                hover:bg-white
                text-gray-900
                shadow-xl
                transition-all
                duration-300
                hover:scale-110
              "
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* NEXT */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next gallery image"
              className="
                absolute
                right-4 md:right-6
                top-1/2
                -translate-y-1/2
                w-12 h-12
                md:w-14 md:h-14
                flex
                items-center
                justify-center
                rounded-full
                bg-white/90
                hover:bg-white
                text-gray-900
                shadow-xl
                transition-all
                duration-300
                hover:scale-110
              "
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* IMAGE INFORMATION */}

          <div
            className="
              absolute
              left-0
              right-0
              bottom-0
              p-6
              md:p-10
              text-white
              pointer-events-none
            "
          >
            <h3 className="text-2xl md:text-4xl font-bold">
              {currentImage.title}
            </h3>

            {currentImage.description && (
              <p className="mt-2 text-white/90 text-sm md:text-base max-w-2xl">
                {currentImage.description}
              </p>
            )}
          </div>

          {/* COUNTER */}

          {images.length > 1 && (
            <div
              className="
                absolute
                top-5
                right-5
                px-4
                py-2
                rounded-full
                bg-black/60
                backdrop-blur-md
                text-white
                text-sm
                font-medium
              "
            >
              {current + 1} / {images.length}
            </div>
          )}
        </div>

        {/* DOTS */}

        {images.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`
                  h-2.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    current === index
                      ? "w-8 bg-blue-600"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }
                `}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}