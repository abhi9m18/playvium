"use client";

import Image from "next/image";
import { Game } from "./mockData";
import { Play } from "lucide-react";
import { playicon } from "@/assets/icons";
import { useState } from "react";

interface Props {
  games: Game[];
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function SearchGrid({
  games,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-2 md:px-40 pt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 md:gap-3">
        {games.map((game) => {
          const isHovered = !isTouchDevice && hoveredId === game.id;

          return (
            <div
              key={game.id}
              onMouseEnter={() => {
                if (!isTouchDevice) setHoveredId(game.id);
              }}
              onMouseLeave={() => {
                if (!isTouchDevice) setHoveredId(null);
              }}
              style={{
                transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
                transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform",
              }}
              className="relative cursor-pointer touch-none md:touch-auto"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full aspect-3/4 rounded-sm md:rounded-lg overflow-visible">
                <Image
                  src={game.img}
                  alt={game.name}
                  fill
                  className="object-cover rounded-xs md:rounded-lg "
                />

                {/* DARK OVERLAY */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    backgroundColor: isHovered
                      ? "rgba(0,0,0,0.45)"
                      : "rgba(0,0,0,0)",
                    transition: "background-color 200ms ease",
                  }}
                />

                {/* PLAY BUTTON */}
                <div
                  className="absolute inset-0 mt-4 flex items-center justify-center pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 200ms ease",
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center shadow-lg">
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
                  className="absolute top-6 left-0 right-0 pb-3 text-center pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(6px)",
                    transition: "all 200ms ease",
                  }}
                >
                  <p className="text-white text-sm font-semibold">
                    {game.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 py-6">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 bg-[#1A2027] text-white rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-9 h-9 rounded-lg ${
                currentPage === i + 1
                  ? "bg-[#B93DEB] text-white"
                  : "bg-[#1A2027] text-white/70"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 bg-[#1A2027] text-white rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
