"use client"

import { curreny, dashboard, download, referral, rules } from "@/assets/images/referral"
import { motion } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import { useEffect, useRef, useState } from "react"

export type TabKey =
  | "dashboard"
  | "rewards"
  | "referral"
  | "rules"
  | "banners"

const tabs: {
  key: TabKey
  label: string
  icon: StaticImageData
}[] = [
  { key: "dashboard", label: "Dashboard", icon: dashboard },
  { key: "rewards", label: "My Rewards", icon: curreny },
  { key: "referral", label: "Referral Codes & Friends", icon: referral },
  { key: "rules", label: "Rate & Rules", icon: rules },
  { key: "banners", label: "Download Banners", icon: download },
]

export default function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey
  setActiveTab: (tab: TabKey) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState({ width: 0, left: 0 })

  useEffect(() => {
    const index = tabs.findIndex(t => t.key === activeTab)
    const tab = tabRefs.current[index]
    const container = containerRef.current

    if (tab && container) {
      setIndicator({
        width: tab.offsetWidth,
        left: tab.offsetLeft,
      })
    }
  }, [activeTab])

  return (
    <section className="w-full pt-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div
          ref={containerRef}
          className="relative inline-flex items-center gap-1 rounded-full bg-[#0b0f1a] p-1 min-w-max"
        >
          {/* Active Tab Highlight */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-lg bg-[#B93DEB]"
            animate={indicator}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />

          {tabs.map((tab, index) => (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[index] = el
              }}
              onClick={() => setActiveTab(tab.key)}
              className={`relative z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Image
                src={tab.icon}
                alt={tab.label}
                width={16}
                height={16}
                className="shrink-0"
              />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
