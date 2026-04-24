"use client";

import Image from "next/image";
import { herodragon } from "@/assets/images/home";
import { useEffect, useState } from "react";

export default function LobbyBanner({
  title,
  banners,
}: {
  title: string;
  banners: any[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  return (
    <div className="w-full">
      <div
        className="relative w-full bg-linear-to-b from-[#222933] to-transparent
        h-48 sm:h-64 md:h-[300px] lg:h-80 overflow-hidden"
      >
        {/* Mobile left gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0f1317] via-[#0f1317cc] to-transparent z-3 sm:hidden" />

        {/* Background slides */}
        {banners.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute right-0 top-0 w-64 md:w-180 h-full">
              <Image
                src={img}
                alt={title}
                className="w-full h-full object-cover md:object-fill"
                priority
              />
            </div>
          </div>
        ))}

        {/* Dragon */}
        <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none">
          <Image
            src={herodragon}
            alt="Hero Dragon"
            className="h-[50%] w-auto sm:h-[60%] object-contain"
          />
        </div>

        {/* Title */}
        <h1
          className="
            absolute z-20
            bottom-12 left-4 md:left-12
            sm:bottom-20 sm:left-10
            text-white font-bold
            text-[22px] sm:text-[30px] md:text-[35px] lg:text-[50px]
            leading-tight
            max-w-60 sm:max-w-[450px]"
        >
          {title}
        </h1>

        {/* Pagination dots */}
        {banners.length > 1 && (
          <div
            className="
              absolute bottom-6 md:bottom-8
              left-15 md:left-36 -translate-x-1/2
              flex gap-1 z-20"
          >
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all ${
                  index === currentSlide
                    ? "w-10 h-2 bg-[#b13fdf]"
                    : "w-2 h-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
