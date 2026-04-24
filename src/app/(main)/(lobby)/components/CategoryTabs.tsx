"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LOBBY_CATEGORIES } from "../data/categories";
import { LobbyIcon, LobbyIconActive } from "@/assets/icons/lobby";

export default function CategoryTabs() {
  const path = usePathname();
  const active = path.split("/").pop();

  return (
    <div className="w-full mt-2 mb-1 overflow-x-auto scrollbar-hide">
      <div
        className="
          flex items-center gap-1 sm:gap-4 py-3 
          w-max
        "
      >
        {/* LOBBY */}
        <Link href="/lobby">
          <div
            className={`
              group flex items-center justify-center gap-3
              px-4 py-2 sm:px-6 sm:py-2 
              rounded-lg 
              text-xs sm:text-sm font-medium 
              min-w-fit whitespace-nowrap 
              bg-[#14171D] border border-[#242B35] 
              transition
              ${
                active === "lobby"
                  ? "text-white shadow-[0_0_10px_rgba(185,61,235,0.6)]"
                  : "text-white/70 hover:text-white"
              }
            `}
          >
            <Image
              src={active === "lobby" ? LobbyIconActive : LobbyIcon}
              width={14}
              height={14}
              alt="Lobby"
              className="transition group-hover:brightness-125"
            />

            <span className="leading-none">Lobby</span>
          </div>
        </Link>

        {/* CATEGORY LINKS */}
        {LOBBY_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.id}`}
            className={`
              group flex items-center justify-center gap-1.5
              px-2 py-2 sm:px-5 sm:py-2
              rounded-lg
              text-xs sm:text-sm font-medium
              min-w-fit whitespace-nowrap
              bg-[#14171D] border border-[#242B35]
              transition
              ${
                active === cat.id
                  ? "text-white  shadow-[0_0_10px_rgba(185,61,235,0.6)]"
                  : "text-white/70 hover:text-white"
              }
            `}
          >
            <Image
              src={active === cat.id ? cat.activeIcon : cat.icon}
              width={16}
              height={16}
              alt={cat.name}
              className={`transition group-hover:brightness-125`}
            />

            <span className="leading-none">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
