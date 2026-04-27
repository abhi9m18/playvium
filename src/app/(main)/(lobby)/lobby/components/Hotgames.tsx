"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { wins } from "@/data/recentBigWinsData";

export default function Hotgames() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full px-3 md:px-10 mt-6 flex flex-col gap-4">
      {/* ------------------- HEADER ------------------- */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-white text-lg md:text-xl font-normal md:font-semibold">
          Hot Games
        </h2>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Left Arrow */}
          <button
            onClick={handleLeft}
            className="
              w-7 h-7 sm:w-8 sm:h-8 
              flex items-center justify-center 
              rounded-md bg-[#092D61]
              hover:bg-[#3a404d] 
              transition
            "
          >
            <span className="text-white/90 font-semibold text-sm">{`<`}</span>
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleRight}
            className="
              w-7 h-7 sm:w-8 sm:h-8
              flex items-center justify-center 
              rounded-md bg-[#092D61] 
              hover:bg-[#3a404d] 
              transition
            "
          >
            <span className="text-white/90 font-semibold text-sm">{`>`}</span>
          </button>

          {/* View All */}
          <Link href="/lobby">
            <button
              className="
                h-8 sm:h-9 px-3 sm:px-4 
                rounded-md bg-[#092D61]
                hover:bg-[#3a404d]
                text-white 
                text-xs sm:text-sm 
                font-medium transition
              "
            >
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* ------------------- CARD SCROLLER ------------------- */}
      <div
        ref={scrollRef}
        className="
          flex w-full gap-3 
          overflow-x-auto scroll-smooth 
          snap-x snap-mandatory 
          pb-2 
          no-scrollbar
        "
      >
        {wins.map((game) => (
          <div
            key={game.id}
            className="
              min-w-[120px] max-w-[120px]
              sm:min-w-[130px] sm:max-w-[130px]
              lg:min-w-[145px] lg:max-w-[145px]
              cursor-pointer snap-start 
              rounded-xl overflow-hidden 
              bg-[#1a1f27] shadow-md 
              transition hover:scale-[1.04] active:scale-95
            "
          >
            {/* Image */}
            <div className="relative w-full h-[160px] sm:h-[150px] lg:h-[180px] overflow-hidden rounded-t-xl">
              <Image
                src={game.image}
                alt={"hello"}
                className="
                  w-full h-full 
                  object-cover 
                  transition-transform 
                  duration-500 ease-in-out 
                  hover:scale-110
                "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
