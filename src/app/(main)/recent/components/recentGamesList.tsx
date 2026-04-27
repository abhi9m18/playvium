"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { newReleases } from "@/data/newreleases";

export default function RecentGamesList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");

  const filteredGames = newReleases.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {/* ------------------------- SEARCH BAR ------------------------- */}
      <div className="w-full relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
        <input
          type="text"
          placeholder="Search Games"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#14171D] text-white px-12 py-2.5 rounded-xl border border-[#20242C]
                     focus:ring-2 focus:ring-[#B93DEB] outline-none transition placeholder:text-white/40"
        />
      </div>

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center w-full mt-2">

        {/* Title */}
        <h2 className="text-white text-lg md:text-xl font-normal md:font-normal">
          Recent Games
        </h2>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-[#092D61]
                       hover:bg-[#3A404D] transition"
          >
            <span className="text-white text-base sm:text-lg font-bold">{`<`}</span>
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md bg-[#092D61]
                       hover:bg-[#3A404D] transition"
          >
            <span className="text-white text-base sm:text-lg font-bold">{`>`}</span>
          </button>

          {/* View All */}
          <Link href="/recent">
            <button
              className="h-8 sm:h-9 px-3 sm:px-4 rounded-md bg-[#092D61] hover:bg-[#3A404D]
                               text-white text-xs sm:text-sm font-medium transition whitespace-nowrap"
            >
              View All
            </button>
          </Link>
        </div>
      </div>

      {/* ================= SCROLLER ================= */}
      <div
        ref={scrollRef}
        className="flex w-full gap-3 overflow-x-auto scroll-smooth snap-x pb-2
        [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-16 bg-[#171b22] rounded-xl">
            <div className="relative mb-4">
              <div className="absolute inset-0 blur-2xl bg-purple-500/20 rounded-full"></div>
              <div className="relative w-14 h-14 flex items-center justify-center bg-[#2B3140] rounded-full shadow-[0_0_12px_rgba(185,61,235,0.4)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#B93DEB]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.25l-6.188 3.75 1.64-7.03L2 9.75l7.19-.62L12 2.25l2.81 6.88 7.19.62-5.45 4.22 1.64 7.03z" />
                </svg>
              </div>
            </div>

            <p className="text-white/90 text-lg font-semibold">
              No Recent Games Found
            </p>
            <p className="text-white/50 text-sm mt-1">
              Try searching for something else.
            </p>
          </div>
        )}

        {/* Cards */}
        {filteredGames.length > 0 &&
          filteredGames.map((game) => (
            <div
              key={game.id}
              className="min-w-[100px] max-w-[110px] sm:min-w-[120px] sm:max-w-[120px] lg:min-w-[122px] lg:max-w-[138px]
                    cursor-pointer snap-start rounded-xl overflow-hidden bg-[#1A1F27]
                    shadow-lg hover:scale-[1.05] transition-all"
            >
              <div className="relative w-full h-[140px] sm:h-[120px] lg:h-[170px] overflow-hidden rounded-xl">
                <Image
                  src={game.img}
                  alt={game.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
