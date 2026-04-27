"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import {
  drPoker,
  gooseBoomBang,
  deadMenWalking,
  gatesUnderworld,
  duckHunters,
  veracruzWild,
  wildTiger2,
  pinball,
  reelRacer,
} from "@/assets/images/home/newreleases";

type Category = "active" | "claimed" | "myClaimed";
type SortOption = "created" | "az" | "provider";

type Game = {
  id: number;
  name: string;
  provider?: string;
  category: Category;
  img: string;
  createdAt?: string;
};

const gamesData: Game[] = [
  {
    id: 1,
    name: "Goose Boom Bang!",
    provider: "PlayArt",
    category: "active",
    img: gooseBoomBang,
    createdAt: "2025-11-12T10:00:00Z",
  },
  {
    id: 2,
    name: "Dr. Rock & Creepy Monster",
    provider: "FunLabs",
    category: "claimed",
    img: drPoker,
    createdAt: "2025-11-11T09:00:00Z",
  },
  {
    id: 3,
    name: "Dead Men Walking",
    provider: "RedCat",
    category: "active",
    img: deadMenWalking,
    createdAt: "2025-11-10T08:00:00Z",
  },
  {
    id: 4,
    name: "Gates of the Underworld",
    provider: "HotGames",
    category: "myClaimed",
    img: gatesUnderworld,
    createdAt: "2025-11-09T07:00:00Z",
  },
  {
    id: 5,
    name: "Duck Hunters",
    provider: "AquaPlay",
    category: "active",
    img: duckHunters,
    createdAt: "2025-11-08T06:00:00Z",
  },
  {
    id: 6,
    name: "Veracruz Wild",
    provider: "SpinCorp",
    category: "claimed",
    img: veracruzWild,
    createdAt: "2025-11-07T05:00:00Z",
  },
  {
    id: 7,
    name: "Gonzo's Quest 2",
    provider: "Netfun",
    category: "active",
    img: wildTiger2,
    createdAt: "2025-11-06T04:00:00Z",
  },
  {
    id: 8,
    name: "Wild Tiger 2",
    provider: "TigerGames",
    category: "active",
    img: pinball,
    createdAt: "2025-11-05T03:00:00Z",
  },
  {
    id: 9,
    name: "Reel Racer",
    provider: "SpinWorks",
    category: "claimed",
    img: reelRacer,
    createdAt: "2025-11-04T02:00:00Z",
  },
];

export default function SidehustleGamesList() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Category | "all">("active");
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [sortOption, setSortOption] = useState<SortOption>("created");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const filteredAndSorted = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    let list = gamesData.filter(
      (g) => activeTab === "all" || g.category === activeTab
    );

    if (q.length) {
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          (g.provider || "").toLowerCase().includes(q)
      );
    }

    if (sortOption === "created") {
      list = list.sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : a.id;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : b.id;
        return db - da;
      });
    } else if (sortOption === "az")
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "provider")
      list = list.sort((a, b) =>
        (a.provider || "").localeCompare(b.provider || "")
      );

    return list;
  }, [debouncedQuery, activeTab, sortOption]);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 500, behavior: "smooth" });

  const handleImgLoad = (id: number) =>
    setImagesLoaded((s) => ({ ...s, [id]: true }));

  const tabs = [
    { id: "active", label: "Active" },
    { id: "claimed", label: "All Claimed" },
    { id: "myClaimed", label: "My Claimed" },
  ] as const;

  return (
    <div className="w-full mt-4 sm:mt-6">
      {/* SEARCH BAR */}
      <div className="relative mb-4 sm:mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Games"
          className="w-full bg-[#06162D] text-white px-12 py-2.5 rounded-xl border border-[#20242C]  outline-none transition placeholder:text-white/40"
        />
      </div>

      {/* TABS + SORT */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        {/* TABS */}
        <div className="flex items-center gap-2 p-1 bg-[#06162D] rounded-2xl border border-[#242B35] shadow-[0_0_8px_rgba(255,255,255,0.03)] w-full sm:w-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all
          ${
            activeTab === t.id
              ? "bg-[#187BF0] text-white"
              : "text-white/60 hover:text-white"
          }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* SORT BUTTON (Moves below in mobile) */}
        <div className="relative w-full sm:w-auto">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center justify-between sm:justify-center gap-2 px-4 py-2 rounded-xl bg-[#06162D] border border-[#242B35] text-white/90 hover:text-white text-xs sm:text-sm transition w-full sm:w-auto"
          >
            {sortOption === "created"
              ? "Created"
              : sortOption === "az"
              ? "A - Z"
              : "Provider"}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {sortOpen && (
            <div className="absolute right-0 mt-2 w-full sm:w-44 bg-[#0F1317] border border-[#242B35] rounded-xl shadow-xl z-20">
              {["created", "az", "provider"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortOption(opt as SortOption);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs sm:text-sm ${
                    sortOption === opt
                      ? "bg-[#15171B] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {opt === "created"
                    ? "Created"
                    : opt === "az"
                    ? "A - Z"
                    : "Provider"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GAME LIST */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x pb-3 
        no-scrollbar"
      >
        {/* Loading Skeleton */}
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[120px] max-w-[120px] sm:min-w-[140px] sm:max-w-[150px] snap-start rounded-xl overflow-hidden bg-[#16181b] animate-pulse"
            >
              <div className="w-full h-[120px] sm:h-[160px] bg-[#1b1f24]" />
            </div>
          ))}

        {/* Empty State */}
        {!isLoading && filteredAndSorted.length === 0 && (
          <div className="w-full flex justify-center py-12 text-white/70">
            No Games Found
          </div>
        )}

        {/* Actual Game Cards */}
        {!isLoading &&
          filteredAndSorted.map((game) => (
            <div
              key={game.id}
              className="min-w-[100px] max-w-[120px] sm:min-w-[140px] sm:max-w-[150px] 
              snap-start rounded-xl overflow-hidden bg-[#1A1F27] shadow-lg hover:scale-105 transition"
            >
              <div className="relative w-full h-[140px] sm:h-[160px] overflow-hidden rounded-xl bg-[#111316]">
                <Image
                  src={game.img}
                  alt={game.name}
                  fill
                  className={`object-cover transition-transform duration-300 ${
                    imagesLoaded[game.id]
                      ? "hover:scale-110"
                      : "scale-105 blur-sm"
                  }`}
                  onLoadingComplete={() => handleImgLoad(game.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
