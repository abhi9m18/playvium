"use client";

import Image from "next/image";
import { wins } from "@/data/recentBigWinsData";
import { badgegold } from "@/assets/images/home";
import { useRef, useState, useEffect } from "react";

export default function RecentBigWins() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    const speed = isMobile ? 1 :2;

    const scroll = () => {
      if (!isHovered) {
        container.scrollLeft += speed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div className="flex flex-col w-full px-3 sm:px-6 md:px-14 gap-4 mt-3">
      {/* ==== HEADER + FILTER TABS ==== */}
      <div className="flex items-center w-full gap-3 overflow-x-auto no-scrollbar sm:overflow-visible">
        {/* Glow Bullet */}
        <div className="relative flex items-center justify-center shrink-0 animate-ping">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c742fc]" />
          <div className="absolute inset-0 rounded-full bg-[#B93DEB]/40 blur-md animate-ping" />
        </div>

        {/* Title */}
        <h2 className="text-[13px] md:text-[15px] sm:text-lg text-white font-normal md:font-semibold shrink-0">
          Recent Big Wins
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-1 ml-2 md:gap-3 shrink-0">
          {["All", "Slots", "Live Dealers"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2 md:px-3 py-1 rounded-lg text-[9px] sm:text-sm font-normal whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-[#092D61] border border-[#092D61] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* ==== AUTO SCROLL CARDS ==== */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-row gap-2 sm:gap-3 w-full overflow-x-hidden no-scrollbar md:py-2"
      >
        {[...wins, ...wins].map((win, index) => (
          <div
            key={`${win.id}-${index}`}
            className="cursor-pointer min-w-[60px] sm:min-w-[80px] flex flex-col items-center"
          >
            {/* Game Image */}
            <div className="relative w-[65px] h-[75px] sm:w-[80px] sm:h-[95px] rounded-xl overflow-hidden">
              <Image
                src={win.image}
                alt={win.gameName}
                fill
                className="object-cover rounded-xl transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Badge */}
            <div className="flex items-center gap-1 mt-1">
              <div className="relative w-3 h-3">
                <Image
                  src={badgegold}
                  alt="badge"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-[9px] sm:text-[9px] leading-none">
                Hidden
              </p>
            </div>

            {/* Amount */}
            <p className="text-[#D892F4] text-[7px] sm:text-[9px] mt-0.5">
              {win.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
