"use client"
import { X, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { medal1, medal10, medal11, medal2, medal3, medal4, medal5, medal6, medal7, medal8, medal9 } from '@/assets/images/profile'
import Image from "next/image"

interface MedalsProps {
  onBack: () => void
  onClose: () => void
}

const COMPLETED_MEDALS = [
  { emoji: "🥇", name: "Top Star Player", count: 1 },
  { emoji: "🥈", name: "Fearless Star", count: 2 },
  { emoji: "🥉", name: "The Logical King", count: 3 },
  { emoji: "🏅", name: "The Lucky Dog", count: 4 },
  { emoji: "🎖️", name: "Highest Contributor", count: 5 },
  { emoji: "⭐", name: "The Elite Master", count: 6 },
]

const AWAITING_MEDALS = [
  { emoji: "🌟", name: "Talented", progress: 0 },
  { emoji: "✨", name: "Ferocious Star", progress: 0 },
  { emoji: "💎", name: "The Blind King", progress: 0 },
  { emoji: "👑", name: "Hardside Lovely Boy", progress: 0 },
  { emoji: "🎯", name: "Puzzle Solver", progress: 0 },
  { emoji: "🔥", name: "Puzzle Master", progress: 0 },
  { emoji: "⚡", name: "Incredible Crazy Boy", progress: 0 },
  { emoji: "🌈", name: "Generous Friend", progress: 0 },
]

export default function Medals({ onBack, onClose }: MedalsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "awaiting">("all")
  const medalIcons = [
    medal1,
    medal2,
    medal3,
    medal4,
    medal5,
    medal6,
    medal7,
    medal8,
    medal9,
    medal10,
  ];
  const displayMedals =
    activeTab === "completed"
      ? COMPLETED_MEDALS
      : activeTab === "awaiting"
        ? AWAITING_MEDALS
        : [...COMPLETED_MEDALS, ...AWAITING_MEDALS]

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 flex items-center justify-between p-4 border-b border-[#2d3139] bg-[#1a1f26]">
        <button onClick={onBack} className="text-white hover:opacity-80 transition">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold text-white">Medals</h2>
        <button onClick={onClose} className="text-white hover:opacity-80 transition">
          <X size={24} />
        </button>
      </div>

      {/* Recent Badge */}

      <div className="p-4 bg-[#242B35]">
        <div className="p-2  rounded-lg bg-[#191D24]">
          <div className="flex px-3 border-b-2 py-3 border-[#272F42] items-center justify-between mb-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
            <span>
                      <Image
                        src={medal11}
                        alt={`medel`}
                        width={22}
                        height={22}
                        className="rounded-lg"
                      /></span> Rewards
            </h4>

          </div>

          {/* Scrollable Medal List */}
          <div className="flex justify-around overflow-x-auto no-scrollbar">
            {medalIcons.map((icon, i) => (
              <div
                key={i}
                className="hover:scale-110 transition cursor-pointer flex-shrink-0"
                role="button"
                tabIndex={0}
              >
                <Image
                  src={icon}
                  alt={`medal-${i + 1}`}
                  width={33}
                  height={33}
                  className="rounded-lg"
                />

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="p-4 bg-[#242B35]">
        <div className="bg-[#191D24] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4 py-3 border-b-2 border-[#272F42]">
            <h3 className="text-white font-semibold  ">Your achievements</h3>
            <span className="text-xs text-gray-400">{COMPLETED_MEDALS.length}/21 Completed</span>
          </div>

          {/* Medal Grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {COMPLETED_MEDALS.slice(0, 2).map((medal, i) => (
              <div key={i} className="flex flex-col items-center bg-[#242B35] p-4 rounded-lg">
                <div className="text-3xl mb-1 hover:scale-110 transition cursor-pointer">
                  <Image
                    src={medal1}
                    alt={`medal-${i + 1}`}
                    width={33}
                    height={33}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-[10px] text-gray-400 text-center line-clamp-1">{medal.name}</span>
                <span className="text-[10px] text-[#8b5cf6] font-semibold">{medal.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#242B35] mt-4">
          <div className="bg-[#191D24] p-4 rounded-lg">
            {/* Awaiting Unlocking Section */}
            <h3 className="text-white font-semibold mb-4 py-3 border-b-2 border-[#272F42]">Awaiting unlocking</h3>
              <div className="grid grid-cols-4 gap-3 mb-6">
            {COMPLETED_MEDALS.slice(0, 4).map((medal, i) => (
              <div key={i} className="flex flex-col items-center bg-[#242B35] p-4 rounded-lg">
                <div className="text-3xl mb-1 hover:scale-110 transition cursor-pointer">
                  <Image
                    src={medal1}
                    alt={`medal-${i + 1}`}
                    width={33}
                    height={33}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-[10px] text-gray-400 text-center line-clamp-1">{medal.name}</span>
                <span className="text-[10px] text-[#8b5cf6] font-semibold">{medal.count}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
