"use client";

import {
  Trenball,
  crash,
  limbo,
  mines,
  plinko,
  tower,
  twist,
  ultimate,
} from "@/assets/landing";
import Image from "next/image";
import { playicon } from "@/assets/icons";
import { useEffect, useRef } from "react";

const games = [
  { name: "Crash", img: crash },
  { name: "Crash Trenball", img: Trenball },
  { name: "Ultimate", img: ultimate },
  { name: "Limbo", img: limbo },
  { name: "Mines", img: mines },
  { name: "Twist", img: twist },
  { name: "Plinko", img: plinko },
  { name: "Tower Legend", img: tower },
];

export default function LandingGamesShowcase() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current.forEach((row) => {
      if (!row) return;

      const scrollWidth = row.scrollWidth;
      const clientWidth = row.clientWidth;

      row.scrollLeft = (scrollWidth - clientWidth) / 2;
    });
  }, []);

  return (
    <section className="w-full md:max-w-6xl mx-auto bg-[#1d232b] my-8 rounded-lg md:rounded-2xl py-8 md:py-12 md:px-8">
      {/* HEADING */}
      <div className="text-center mb-8 px-4 md:px-0">
        <h2 className="text-white text-xl md:text-2xl font-bold mb-2">
          Exciting social and Sweepstakes—style games
        </h2>
        <p className="text-white/60 text-[12px] md:text-sm">
          With OVER 300+ games to choose from, there is always something new to
          play
        </p>
      </div>

      {/* ================= DESKTOP GRID ================= */}
      <div className="hidden lg:grid grid-cols-8 gap-3 px-6  max-w-6xl mx-auto">
        {games.map((game) => (
          <div
            key={game.name}
            className="
              group relative cursor-pointer
              transition-transform duration-500
              hover:-translate-y-2
            "
          >
            {/* IMAGE */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#2a3140]">
              <Image
                src={game.img}
                alt={game.name}
                fill
                className="object-cover"
              />

              {/* DARK OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-black/0
                  group-hover:bg-black/40
                  transition-colors duration-200
                "
              />

              {/* PLAY BUTTON */}
              <div
                className="
                  absolute inset-0 flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                "
              >
                <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center shadow-lg">
                  <Image
                    src={playicon}
                    width={36}
                    height={36}
                    alt="Play"
                    className="invert ml-1"
                  />
                </div>
              </div>

              {/* GAME NAME */}
              <div
                className="
                  absolute top-4 left-0 right-0 text-center
                  opacity-0 group-hover:opacity-100
                  translate-y-2 group-hover:translate-y-0
                  transition-all duration-200
                "
              >
                <p className="text-white text-sm font-semibold">{game.name}</p>
              </div>
            </div>
          </div>
        ))}
        {games.map((game) => (
          <div
            key={game.name}
            className="
              group relative cursor-pointer
              transition-transform duration-500
              hover:-translate-y-2
            "
          >
            {/* IMAGE */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#2a3140]">
              <Image
                src={game.img}
                alt={game.name}
                fill
                className="object-cover"
              />

              {/* DARK OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-black/0
                  group-hover:bg-black/40
                  transition-colors duration-200
                "
              />

              {/* PLAY BUTTON */}
              <div
                className="
                  absolute inset-0 flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                "
              >
                <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center shadow-lg">
                  <Image
                    src={playicon}
                    width={36}
                    height={36}
                    alt="Play"
                    className="invert ml-1"
                  />
                </div>
              </div>

              {/* GAME NAME */}
              <div
                className="
                  absolute top-4 left-0 right-0 text-center
                  opacity-0 group-hover:opacity-100
                  translate-y-2 group-hover:translate-y-0
                  transition-all duration-200
                "
              >
                <p className="text-white text-sm font-semibold">{game.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE & TABLET (2 ROW SCROLL) ================= */}
      <div className="md:hidden space-y-2">
        {[0, 1].map((row) => (
          <div
            key={row}
            ref={(el) => {
              rowRefs.current[row] = el;
            }}
            className="
        relative
        gap-2
        overflow-x-auto
        no-scrollbar
      "
          >
            <div
              className="
          flex gap-2
          w-max
          items-center
          snap-x snap-mandatory
        "
            >
              {[...games, ...games].map((game, i) => (
                <div
                  key={`${game.name}-${row}-${i}`}
                  className="
              snap-center
              shrink-0
              w-[100px]
              transition-all duration-300
            "
                >
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-[#2a3140]">
                    <Image
                      src={game.img}
                      alt={game.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
