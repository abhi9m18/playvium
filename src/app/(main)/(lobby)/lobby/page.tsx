"use client";

import Originals from "@/components/home/Originals";
import CategoryTabs from "../components/CategoryTabs";
import Hotgames from "./components/Hotgames";
import Newreleases from "@/components/home/NewReleases";
import Image from "next/image";
import { search } from "@/assets/icons";
import { useState } from "react";
import { blurhomebanner6 } from "@/assets/images/home";
import MainLobbyBanner from "../components/MainLobbyBanner";

export default function SlotsPage() {
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="gap-4 max-w-7xl mx-auto ">
        <MainLobbyBanner banners={[blurhomebanner6]} title={"Lobby"} />
        <div className="px-2 md:px-6">
          <div className="w-full relative">
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
          <div className="mt-1">
            <CategoryTabs />
          </div>
        </div>

        <Hotgames />
        <Originals />
        <Newreleases />
        <Hotgames />
      </div>
    </>
  );
}
