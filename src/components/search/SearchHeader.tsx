"use client";

import { searchbb } from "@/assets/icons/bottombar";
import { logo } from "@/assets/images/home";
import { X, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { StaticImageData } from "next/image";

interface CategoryIcon {
  icon: StaticImageData;
  activeIcon: StaticImageData;
}

interface Provider {
  id: string;
  name: string;
  logo: StaticImageData;
}

interface Props {
  query: string;
  setQuery: (v: string) => void;

  category: string;
  setCategory: (v: string) => void;

  provider: string;
  setProvider: (v: string) => void;

  sort: string;
  setSort: (v: string) => void;

  categories: string[];
  categoryIcons: Record<string, CategoryIcon>;

  providers: Provider[];

  sortOptions: {
    label: string;
    value: string;
  }[];

  onClose: () => void;
  onFilterChange: () => void;
}

export default function SearchHeader({
  query,
  setQuery,
  category,
  setCategory,
  provider,
  setProvider,
  sort,
  setSort,
  categories,
  categoryIcons,
  providers,
  sortOptions,
  onClose,
  onFilterChange,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [providerSearch, setProviderSearch] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);

  const sortRef = useRef<HTMLDivElement>(null);
  const providerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
      if (
        providerRef.current &&
        !providerRef.current.contains(event.target as Node)
      ) {
        setProviderOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close one dropdown when opening another
  const handleSortToggle = () => {
    setSortOpen(!sortOpen);
    setProviderOpen(false);
  };

  const handleProviderToggle = () => {
    setProviderOpen(!providerOpen);
    setSortOpen(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="relative flex items-center justify-end px-2 md:px-44 pt-3 py-1">
  {/* LEFT: Logo (MOBILE ONLY) */}
  <div className="flex md:hidden absolute left-1/2 -translate-x-1/2">
    <Image src={logo} alt="Logo" className="h-9 mb-1 w-auto" />
  </div>

  {/* CENTER: Explore (DESKTOP ONLY) */}
  <h2 className="hidden md:block absolute left-1/2 -translate-x-1/2 text-white text-md font-semibold">
    Explore
  </h2>

  {/* RIGHT: Close Button (ALL SCREENS) */}
  <button
    aria-label="Close search"
    onClick={onClose}
    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
  >
    <X className="text-white/70" />
  </button>
</div>


      {/* SEARCH */}
      <div className="px-2 md:px-40 py-2 flex items-center gap-2">
        <div
          className={`flex items-center w-full h-9 md:h-10 rounded-md transition-all duration-300
      bg-[#1A2027]
      ${isFocused ? "ring-1 ring-[#B93DEB]" : "ring-1 ring-white/10"}
    `}
        >

          <div className="md:flex hidden  items-center gap-2 px-4 border-r border-white/10">
            <Image src={logo} alt="Logo" className="h-8 mb-1 w-auto" />
          </div>

          <Image src={searchbb} alt="Logo" className="ml-4 h-6  w-auto" />

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onFilterChange();
            }}
            onFocus={() => setIsFocused(true)}
            placeholder="Search games"
            className="flex-1 h-full bg-transparent px-3 text-white placeholder-gray-400 outline-none"
          />
        </div>

        {isFocused && (
          <button
            onClick={() => {
              setIsFocused(false);
              setQuery("");
            }}
            className="text-gray-100 bg-[#B93DEB] px-2 py-1 rounded-lg hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* category */}
      <div className="w-full flex justify-center">
        <div
          className="
      w-full
      max-w-[1400px]
      px-2 sm:px-6 md:px-[90px]
      py-1
      overflow-hidden
    "
        >
          <div
            className="
        relative
        flex gap-1.5 md:gap-1
        overflow-x-auto
        scrollbar-hide
        snap-x snap-mandatory
        px-1
        pb-1
      "
          >
            {categories.map((c) => {
              const isActive = category === c;
              const Icon = isActive
                ? categoryIcons[c]?.activeIcon
                : categoryIcons[c]?.icon;

              return (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    onFilterChange();
                  }}
                  className={`
              snap-start
              flex items-center gap-1.5 md:gap-2
              px-3 py-1.5
              sm:px-3 sm:py-2
              rounded-sm sm:rounded-sm
              text-[12px] sm:text-[15px]
              font-medium
              whitespace-nowrap
              transition-all duration-200
              ${
                isActive
                  ? "bg-[#2A2F36] text-white shadow-inner ring-1 ring-[#B93DEB]/30"
                  : "text-white/70 bg-[#252D37] md:bg-[#252d3700]  hover:bg-[#252D37]"
              }
            `}
                >
                  {Icon && (
                    <Image
                      src={Icon}
                      alt={c}
                      width={18}
                      height={18}
                      className="w-5 h-5 shrink-0"
                    />
                  )}
                  <span>{c}</span>
                </button>
              );
            })}
          </div>

          {/* LEFT / RIGHT FADE (DESKTOP ONLY) */}
          <div className="pointer-events-none hidden md:block absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#15181e] to-transparent" />
          <div className="pointer-events-none hidden md:block absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#15181e] to-transparent" />
        </div>
      </div>

      {/* FILTERS - UPDATED SECTION */}
      <div className="px-2 md:px-40 pb-2 flex flex-row gap-1 md:gap-4 relative overflow-visible">
        {/* SORT FILTER */}
        <div ref={sortRef} className="relative flex-1 md:flex-none md:w-56">
          <button
            onClick={handleSortToggle}
            className="w-full h-11 px-3 md:px-4 rounded-lg bg-[#2A313A] text-white flex justify-between items-center border border-white/10 hover:bg-[#323943] transition-colors"
          >
            <span className="text-xs  md:text-sm truncate">
              <span className="inline">Sort By: </span>
              <span className="font-semibold capitalize">{sort}</span>
            </span>
            <ChevronDown
              className={`w-5 h-5 md:w-5 md:h-5 shrink-0 ml-2 transition-transform ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {sortOpen && (
            <div className="absolute left-0 right-0 md:left-auto md:right-auto mt-2 w-full bg-[#1F252C] rounded-xl border-l-4 border-l-[#B93DEB] border-t border-r border-b border-white/10 shadow-2xl z-50 overflow-hidden">
              {sortOptions.map((s, idx) => {
                const active = sort === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => {
                      setSort(s.value);
                      setSortOpen(false);
                      onFilterChange();
                    }}
                    className={`w-full px-3 md:px-4 py-3 flex items-center justify-between hover:bg-[#2A313A] transition-colors ${
                      idx !== sortOptions.length - 1
                        ? "border-b border-white/5"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-xs md:text-sm ${
                        active ? "text-white font-medium" : "text-white/80"
                      }`}
                    >
                      {s.label}
                    </span>
                    <div
                      className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        active
                          ? "border-[#B93DEB] bg-[#B93DEB]"
                          : "border-white/30"
                      }`}
                    >
                      {active && (
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* PROVIDER FILTER */}
        <div ref={providerRef} className="relative flex-1 md:flex-none md:w-72">
          <button
            onClick={handleProviderToggle}
            className="w-full h-11 px-3 md:px-4 rounded-lg bg-[#2A313A] text-white flex justify-between items-center border border-white/10 hover:bg-[#323943] transition-colors"
          >
            <span className="text-xs md:text-sm truncate">
              <span className="inline">Providers: </span>
              <span className="font-semibold">
                {selectedProviders.length === 0
                  ? "All"
                  : selectedProviders.length}
              </span>
            </span>
            <ChevronDown
              className={`w-5 h-5 md:w-5 md:h-5 shrink-0 ml-2 transition-transform ${
                providerOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {providerOpen && (
            <div className="absolute left-0 right-0 md:left-auto md:right-auto mt-2 w-full bg-[#1F252C] rounded-lg md:rounded-xl border-l-4 border-l-[#B93DEB] border-t border-r border-b border-white/10 shadow-2xl z-50 overflow-hidden">
              {/* SEARCH */}
              <div className="p-2 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    value={providerSearch}
                    onChange={(e) => setProviderSearch(e.target.value)}
                    placeholder="Search"
                    className="w-full bg-[#2A313A] pl-10 pr-3 py-2 rounded-sm md:rounded-xl text-xs md:text-sm text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-[#B93DEB]"
                  />
                </div>
              </div>

              {/* PROVIDER LIST */}
              <div className="max-h-48 md:max-h-64 overflow-y-auto">
                {providers
                  .filter((p) =>
                    p.name.toLowerCase().includes(providerSearch.toLowerCase())
                  )
                  .map((p) => {
                    const active = selectedProviders.includes(p.name);

                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          const updated = active
                            ? selectedProviders.filter((x) => x !== p.name)
                            : [...selectedProviders, p.name];

                          setSelectedProviders(updated);
                          setProvider(
                            updated.length ? updated.join(",") : "All"
                          );
                          onFilterChange();
                        }}
                        className="w-full px-3 md:px-4 py-0.5 md:py-0.5 flex items-center gap-3 hover:bg-[#2A313A] transition-colors"
                      >
                        {/* CHECKBOX */}
                        <div
                          className={`w-4 h-4 md:w-5 md:h-5 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                            active
                              ? "bg-[#B93DEB] border-[#B93DEB]"
                              : "border-white/30"
                          }`}
                        >
                          {active && (
                            <svg
                              className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>

                        {/* LOGO */}
                        <div className="shrink-0">
                          <Image
                            src={p.logo}
                            alt={p.name}
                            width={60}
                            height={45}
                            className="object-contain w-[60px] h-[45px] md:w-[80px] md:h-[60px]"
                          />
                        </div>
                      </button>
                    );
                  })}
              </div>

              {/* CLEAR */}
              <button
                onClick={() => {
                  setSelectedProviders([]);
                  setProvider("All");
                  onFilterChange();
                }}
                className="w-full py-2.5 md:py-3 text-[#B93DEB] text-xs md:text-sm font-semibold border-t border-white/10 /10 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All
              </button>
            </div>
          )}
        </div>
        </div>
    </>
  );
}
