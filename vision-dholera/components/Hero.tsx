"use client";

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
    <section
      id="home"
      className="relative w-full pt-20"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-[calc(100vh-80px)] object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}