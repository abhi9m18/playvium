"use client";

import { useMemo, useState } from "react";
import { useSearchModal } from "@/context/SearchModalContext";
import SearchHeader from "./SearchHeader";
import SearchGrid from "./SearchGrid";
import { mockGames, Game } from "./mockData";
import { StaticImageData } from "next/image";

import {
  LiveIcon,
  SlotsIcon,
  TableIcon,
  PokerIcon,
  LiveIconActive,
  SlotsIconActive,
  TableIconActive,
  PokerIconActive,
  LobbyIcon,
} from "@/assets/icons/lobby";
import { lobbybb } from "@/assets/icons/bottombar";
import { gp1, gp2, gp3, gp4, gp5 } from "@/assets/icons";
import { logo } from "@/assets/images/home";

const ITEMS_PER_PAGE = 40;

const CATEGORIES = [
  "All Games",
  "Slots",
  "Table Games",
  "Live Dealers",
  "Poker",
  "Live Casino",
  "Originals",
  "Arcade",
];
const CATEGORY_ICON_MAP = {
  "All Games": {
    icon: lobbybb,
    activeIcon: lobbybb,
  },
  Slots: {
    icon: SlotsIcon,
    activeIcon: SlotsIconActive,
  },
  "Table Games": {
    icon: TableIcon,
    activeIcon: TableIconActive,
  },
  "Live Dealers": {
    icon: LiveIcon,
    activeIcon: LiveIconActive,
  },
  Poker: {
    icon: PokerIcon,
    activeIcon: PokerIconActive,
  },
  "Live Casino": {
    icon: LiveIcon,
    activeIcon: LiveIconActive,
  },
  Originals: {
    icon: SlotsIcon,
    activeIcon: SlotsIconActive,
  },
  Arcade: {
    icon: SlotsIcon,
    activeIcon: SlotsIconActive,
  },
};

export interface Provider {
  id: string;
  name: string;
  logo: StaticImageData | null;
}

export const PROVIDERS = [
  { id: "Wolf Games", name: "Wolf Originals", logo: logo },
  { id: "pragmatic", name: "Pragmatic Play", logo: gp1 },
  { id: "betsoft", name: "Betsoft", logo: gp2 },
  { id: "evolve", name: "Evolve", logo: gp5 },
  { id: "netent", name: "NetEnt", logo: gp3 },
  { id: "igt", name: "IGT", logo: gp4 },
];

const SORT_OPTIONS = [
  { label: "Popular", value: "popular" },
  { label: "A–Z", value: "az" },
  { label: "Z–A", value: "za" },
  { label: "Newest", value: "newest" },
];

export default function GlobalSearchModal() {
  const { isOpen, close } = useSearchModal();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Games");
  const [provider, setProvider] = useState("All");
  const [sort, setSort] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGames = useMemo(() => {
    let data: Game[] = [...mockGames];

    // 🔍 Search
    if (query) {
      data = data.filter((g) =>
        g.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // 📂 Category
    if (category !== "All Games") {
      data = data.filter((g) => g.category === category);
    }

    // 🏢 Provider
    if (provider !== "All") {
      const selectedProviders = provider.split(","); // ["Pragmatic Play", "Betsoft"]

      data = data.filter((g) => selectedProviders.includes(g.provider));
    }

    // 🔃 Sorting
    if (sort === "az") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") data.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "newest") data.sort((a, b) => b.id - a.id);

    return data;
  }, [query, category, provider, sort]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="fixed inset-0 bg-[#15181ed5] flex flex-col animate-[slideUp_0.4s_ease-out_forwards]">
        {/* HEADER */}
        <SearchHeader
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          provider={provider}
          setProvider={setProvider}
          sort={sort}
          setSort={setSort}
          categories={CATEGORIES}
          categoryIcons={CATEGORY_ICON_MAP}
          providers={PROVIDERS}
          sortOptions={SORT_OPTIONS}
          onClose={close}
          onFilterChange={() => setCurrentPage(1)}
        />

        {/* GRID */}
        <SearchGrid
          games={paginatedGames}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(10%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
