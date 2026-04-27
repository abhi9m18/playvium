"use client"

import { bets, wagerd, whitewulf, wins } from "@/assets/images/profile"
import { X, ChevronLeft, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface StatisticsProps {
  onBack: () => void
  onClose: () => void
}

type ScopeType = "global" | "local"

export default function Statistics({ onBack, onClose }: StatisticsProps) {
  const [scope, setScope] = useState<ScopeType>("global")
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 flex items-center justify-between p-4 border-b border-[#2d3139] bg-[#1a1f26]">
        <button onClick={onBack} className="text-white hover:opacity-80">
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-lg font-bold text-white">Statistics details</h2>

        <button onClick={onClose} className="text-white hover:opacity-80">
          <X size={24} />
        </button>
      </div>

      {/* Details : Global / Local */}
      <div className="p-4 bg-[#242B35] border-b border-[#272F42]">
        <div className="flex items-center justify-between">
          {/* Custom Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between gap-3 px-4 py-3 min-w-[240px]
                         rounded-xl bg-[#1B2027] cursor-pointer
                         hover:bg-[#202632] transition"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 font-medium">Details:</span>
                <span className="text-green-500 font-semibold capitalize">
                  {scope}
                </span>
              </div>

              <ChevronDown
                size={18}
                className={`text-gray-400 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div
                className="absolute left-0 mt-2 w-full rounded-xl
                           bg-[#1B2027] border border-[#2d3139]
                           shadow-xl z-50 overflow-hidden"
              >
                <button
                  onClick={() => {
                    setScope("global")
                    setOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-[#202632]
                              ${
                                scope === "global"
                                  ? "text-green-500"
                                  : "text-white"
                              }`}
                >
                  Global
                </button>

                <button
                  onClick={() => {
                    setScope("local")
                    setOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-[#202632]
                              ${
                                scope === "local"
                                  ? "text-green-500"
                                  : "text-white"
                              }`}
                >
                  Local
                </button>
              </div>
            )}
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-accent">
              <img
                // src="/profiles/cyberpunk-demon-mask-red-purple.jpg"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-semibold">Zeafseppentac</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#242B35] p-4">
        <div className="p-4 rounded-lg bg-[#191D24]">
          <h4 className="text-white font-semibold mb-4 capitalize">
            {scope} Statistics
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#252d36] p-3 rounded text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-white">
                <Image src={wins} alt="wins" width={22} height={22} />
                <span>Total Wins</span>
              </div>
              <div className="text-white text-2xl mt-1">0</div>
            </div>

            <div className="bg-[#252d36] p-3 rounded text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-white">
                <Image src={bets} alt="bets" width={22} height={22} />
                <span>Total Bets</span>
              </div>
              <div className="text-white text-2xl mt-1">0</div>
            </div>
          </div>

          <div className="bg-[#252d36] p-3 rounded text-center mt-3">
            <div className="flex items-center justify-center gap-2 text-xs text-white">
              <Image src={wagerd} alt="wagered" width={22} height={22} />
              <span>Total Wagered</span>
            </div>
            <div className="text-white text-2xl mt-1"> 0</div>
          </div>
        </div>

        {/* Empty State */}
        <div className="mt-4 p-8 bg-[#191D24] rounded-lg flex flex-col items-center">
          <Image src={whitewulf} alt="empty" width={100} height={100} />
          <p className="text-gray-400 text-sm mt-2 text-center">
            Oops! There is no data yet!
          </p>
        </div>
      </div>
    </>
  )
}
