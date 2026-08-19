"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const playVideo = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch (error) {
        console.error(error);
      }
    };

    playVideo();

    const handlePageShow = () => {
      playVideo();
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <section id="home" className="relative w-full pt-20">
      <div className="relative h-[calc(100vh-80px)] min-h-[560px] w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/20" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-[#D4A03A]/40 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#06285F] shadow-sm">
                India&apos;s First Greenfield Smart City
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-[#06285F] md:text-5xl lg:text-6xl">
                Invest in{" "}
                <span className="text-[#D4A03A]">Dholera Smart City</span>
              </h1>

              <div className="mt-5 h-1 w-16 rounded-full bg-[#D4A03A]" />

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
                Premium residential and commercial plots with trusted guidance,
                transparent processes, and long-term growth potential.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/project"
                  className="rounded-full bg-[#06285F] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#041c44]"
                >
                  View Projects
                </Link>
                <a
                  href="#contact"
                  className="rounded-full border border-[#D4A03A]/50 bg-white/90 px-8 py-3.5 text-sm font-semibold text-[#06285F] shadow-sm transition hover:border-[#D4A03A] hover:text-[#D4A03A]"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
