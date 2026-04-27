"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

import { ChevronDown } from "lucide-react";
import { playicon, search } from "@/assets/icons";
import { useSidebar } from "@/components/ui/sidebar";
import CategoryTabs from "./CategoryTabs";

interface GameItem {
  id: number;
  name: string;
  provider: string;
  img: any;
}

export default function GameBrowser({
  games,
  title,
}: {
  games: GameItem[];
  title: string;
}) {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [providerOption, setProviderOption] = useState("all");

  const [sortOpen, setSortOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);

  const { open } = useSidebar();

  const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const providers: string[] = [
    "all",
    ...Array.from(
      new Set(
        (games || [])
          .map((g) => g.provider) // now TS knows provider is string
          .filter((p) => p && typeof p === "string")
      )
    ),
  ];

  /** ------------------------------
   *  FILTER + SEARCH + SORT LOGIC
   * ----------------------------- */
  const filteredAndSorted = useMemo(() => {
    if (!games) return [];

    let result = [...games];

    // Search
    if (query.trim() !== "") {
      result = result.filter((g) =>
        g.name.toLowerCase().includes(query.toLowerCase())
      );
    }

   

    // Provider filter
    if (providerOption !== "all") {
      result = result.filter((g) => g.provider === providerOption);
    }

    // Sorting
    if (sortOption === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOption === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sortOption === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [games, query, sortOption, providerOption]);

  // Calculate games to display and items per row
  const getItemsPerRow = () => {
    if (open) {
      return 7; // xl:grid-cols-7 when sidebar is open
    }
    return 8; // xl:grid-cols-8 when sidebar is closed
  };

  const itemsPerRow = getItemsPerRow();
  const displayedGames = showAll ? filteredAndSorted : filteredAndSorted.slice(0, itemsPerRow * 4);
  const hasMoreGames = filteredAndSorted.length > itemsPerRow * 4;
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <div className="w-full space-y-2  pt-2 pb-5 relative">
        

      {/* =============== SEARCH BAR (Full width) =============== */}
      <div className="w-full relative mt-4 md:mt-4">
        <Image
          src={search}
          alt="search"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
          width={20}
          height={20}
        />

        <input
          type="text"
          placeholder="Search Games"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#14171D] text-white px-12 py-3 rounded-xl border border-[#20242C] 
                focus:ring-2 focus:ring-[#187BF0] outline-none transition placeholder:text-white/40"
        />
      </div>
      <CategoryTabs />

      {/* =============== TITLE + CONTROLS =============== */}
      <div className="flex flex-wrap items-center  justify-between gap-2 md:gap-3 w-full ">
        {/* TITLE */}
        <h2 className="text-white text-md sm:text-xl md:text-2xl font-semibold whitespace-nowrap">
          {title}
        </h2>

        {/* CONTROLS (Sort + Provider) */}
        <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3 ms-auto">
          {/* SORT DROPDOWN */}
          <div className="relative">
            {/* SORT DROPDOWN */}
            <button
              onClick={() => {
                setSortOpen((s) => !s);
                setProviderOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#14171D] border border-[#242B35] text-white/90 hover:text-white text-xs sm:text-sm whitespace-nowrap"
            >
              {" "}
              <span className="text-gray-400  ">Sort by</span>
              <span className="font-medium">
                {sortOption === "popular"
                  ? "Popular"
                  : sortOption === "az"
                  ? "A - Z"
                  : sortOption === "za"
                  ? "Z - A"
                  : "Newest"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 w-40 sm:w-44 bg-[#0F1317] border border-[#242B35] rounded-xl shadow-lg z-30">
                {[
                  { id: "popular", label: "Popular" },
                  { id: "az", label: "A - Z" },
                  { id: "za", label: "Z - A" },
                  { id: "newest", label: "Newest" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortOption(opt.id);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs sm:text-sm ${
                      sortOption === opt.id
                        ? "text-white bg-[#15171B]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PROVIDER DROPDOWN */}
          <div className="relative">
            {/* PROVIDER DROPDOWN */}
            <button
              onClick={() => {
                setProviderOpen((s) => !s);
                setSortOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#14171D] border border-[#242B35] text-white/90 hover:text-white text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="font-medium capitalize">
                {providerOption === "all" ? "All Providers" : providerOption}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  providerOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {providerOpen && (
              <div className="absolute right-0 mt-2 w-40 sm:w-44 bg-[#0F1317] border border-[#242B35] rounded-xl shadow-lg z-30">
                {providers.map((p: string) => (
                  <button
                    key={p}
                    onClick={() => {
                      setProviderOption(p);
                      setProviderOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs sm:text-sm ${
                      providerOption === p
                        ? "text-white bg-[#15171B]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {p === "all" ? "All Providers" : p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =============== LOADING STATE =============== */}
      {isLoading &&
        Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[120px] max-w-[120px] lg:min-w-[140px] snap-start rounded-xl overflow-hidden bg-[#16181b] animate-pulse"
          >
            <div className="w-full h-[120px] lg:h-[170px] bg-[#1b1f24]" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 bg-[#1b1f24] rounded" />
              <div className="h-3 w-1/2 bg-[#1b1f24] rounded" />
            </div>
          </div>
        ))}

      {/* =============== GAME GRID =============== */}
      {!isLoading && displayedGames.length > 0 && (
        <>
     <div
  className={`grid gap-3 py-5 w-full
    grid-cols-3 sm:grid-cols-4 md:grid-cols-5
    ${
      open
        ? "lg:grid-cols-6 xl:grid-cols-7"
        : "lg:grid-cols-7 xl:grid-cols-8"
    }
  `}
>
  {displayedGames.map((game) => {
    const isHovered = hoveredId === game.id;

    return (
      <div
        key={game.id}
        onMouseEnter={() => {
          if (!isTouchDevice) setHoveredId(game.id);
        }}
        onMouseLeave={() => {
          if (!isTouchDevice) setHoveredId(null);
        }}
        className="relative cursor-pointer touch-none md:touch-auto"
        style={{
          transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {/* CARD */}
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-[#1a1f27]">
          {/* IMAGE */}
          <Image
            src={game.img}
            alt={game.name}
            fill
            className="object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />

          {/* DARK OVERLAY */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: isHovered
                ? "rgba(0,0,0,0.6)"
                : "rgba(0,0,0,0)",
              transition: "background-color 200ms ease",
            }}
          />

          {/* PLAY BUTTON */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 200ms ease",
            }}
          >
            <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center shadow-lg backdrop-blur">
              <Image
                src={playicon}
                width={38}
                height={38}
                alt="Play"
                className="ml-1 invert"
              />
            </div>
          </div>

          {/* GAME NAME */}
          <div
            className="absolute top-4 left-0 right-0 text-center pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(6px)",
              transition: "all 200ms ease",
            }}
          >
            <p className="text-white text-sm font-semibold px-2">
              {game.name}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>



          {/* View All Button */}
          {!showAll && hasMoreGames && (
            <div className="w-full flex justify-center pt-6 pb-2">
              <button
                onClick={() => setShowAll(true)}
                className="px-8 py-3 bg-[#384252] hover:bg-[#A02DD6] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                View All
              </button>
            </div>
          )}

          {/* No More Data Message */}
          {showAll && (
            <div className="w-full flex justify-center pt-4 pb-2">
              <p className="text-white/50 text-sm">
                {filteredAndSorted.length === displayedGames.length
                  ? "No more games to display"
                  : ""}
              </p>
            </div>
          )}
        </>
      )}

      {/* =============== EMPTY STATE =============== */}
      {!isLoading && filteredAndSorted.length === 0 && (
        <div className="w-full flex flex-col items-center justify-center py-12 bg-[#171b22] rounded-xl">
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full blur-xl bg-[#187BF0]/20" />
            <div className="relative w-16 h-16 flex items-center justify-center bg-[#2B3140] rounded-full shadow-[0_0_18px_rgba(185,61,235,0.35)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#187BF0]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.25l-6.188 3.75 1.64-7.03L2 9.75l7.19-.62L12 2.25l2.81 6.88 7.19.62-5.45 4.22 1.64 7.03z" />
              </svg>
            </div>
          </div>
          <p className="text-white/90 text-lg font-semibold mb-1">
            No games found
          </p>
          <p className="text-white/50 text-sm">
            Try searching differently or switch tabs.
          </p>
        </div>
      )}
    </div>
  );
}