"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { originals } from "@/data/originaldata";
import { FaUserAlt, FaPlay } from "react-icons/fa";

export default function Originals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ✅ Stable random users per card
  // const [onlineUsersMap, setOnlineUsersMap] = useState<Record<number, number>>({});

 const [onlineUsersMap] = useState<Record<number, number>>(() => {
    const map: Record<number, number> = {};
    originals.forEach((game) => {
      map[game.id] = Math.floor(Math.random() * 100) + 1;
    });
    return map;
  });

  const handleLeft = () => {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  };

  const handleRight = () => {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="w-full px-3 md:px-10 mt-6 flex flex-col gap-4">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-white text-lg md:text-xl font-normal md:font-semibold">
          Originals
        </h2>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleLeft}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-[#092D61] hover:bg-[#3a404d] transition"
          >
            <span className="text-white text-sm">{`<`}</span>
          </button>

          <button
            onClick={handleRight}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-[#092D61] hover:bg-[#3a404d] transition"
          >
            <span className="text-white text-sm">{`>`}</span>
          </button>

          <Link href="/lobby">
            <button className="h-8 sm:h-9 px-3 sm:px-4 rounded-md bg-[#092D61] hover:bg-[#3a404d] text-white text-xs sm:text-sm font-medium transition">
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* ================= SCROLLER (FIXED - NO CUTOFF) ================= */}
      <div className="relative w-full ">
        <div
          ref={scrollRef}
          className="
            flex w-full gap-3
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            pb-6
            no-scrollbar
          "
          style={{ 
            overflowY: 'visible',
            paddingTop: '24px',
            marginTop: '-24px'
          }}
        >
          {originals.map((game) => (
            <div
              key={game.id}
              className="
                group relative
                min-w-[120px] max-w-[120px]
                sm:min-w-[130px] sm:max-w-[130px]
                lg:min-w-[145px] lg:max-w-[145px]
                rounded-xl overflow-hidden
                bg-[#1a1f27]
                shadow-md
                cursor-pointer
                transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:-translate-y-3
                hover:z-100
                active:scale-95
                will-change-transform
              "
            >
              {/* IMAGE */}
              <div className="relative w-full h-[170px] sm:h-[170px] md:h-[180px] lg:h-[190px] xl:h-[200px]">
                <Image
                  src={game.img}
                  alt={game.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
                />

                {/* OVERLAY */}
                {/* <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" /> */}
                <div className="absolute inset-0 bg-black/60 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                {/* GAME NAME */}
                <div className="absolute top-6 left-3 right-3 text-white text-md text-center font-semibold opacity-0 translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:translate-y-0 z-10 drop-shadow-lg">
                  {game.name}
                </div>

                {/* PLAY BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:scale-100 z-10">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30 transition-all duration-300 group-hover:bg-white/30">
                    <FaPlay className="w-7 h-7 text-white ml-1 drop-shadow-lg" />
                  </div>
                </div>

                {/* ONLINE USERS */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-xs z-10 transition-all duration-300 group-hover:bg-black/80 group-hover:scale-105">
                  <FaUserAlt className="w-3 h-3" />
                  {onlineUsersMap[game.id]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}