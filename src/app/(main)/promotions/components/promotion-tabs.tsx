"use client"

import { motion } from "framer-motion"

export default function PromotionTabs({ activeTab, setActiveTab }: {
    activeTab: "latest" | "archived"
    setActiveTab: (tab: "latest" | "archived") => void
}) {

    return (
        <section className=" px-0 md:px-4 pt-3">
            <div className="mx-auto relative inline-flex rounded-lg p-1 bg-[#000000]">
                {/* Sliding Highlight */}
                <motion.div
                    className="absolute top-1 bottom-1 rounded-md bg-[#187BF0]"
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    initial={false}
                    animate={{
                        left: activeTab === "latest" ? "6px" : "60%",
                        width: activeTab === "latest" ? "calc(60% - 6px)" : "calc(40% - 4px)",

                    }}
                />

                {/* Tabs */}
                <button
                    onClick={() => setActiveTab("latest")}
                    className={`relative cursor-pointer z-10 px-3 md:px-6 py-2 rounded-md  transition-colors duration-300 ${activeTab === "latest" ? "text-white" : "text-gray-300 hover:text-white"
                        }`}
                >
                    Latest Promotion
                </button>

                <button
                    onClick={() => setActiveTab("archived")}
                    className={` cursor-pointer relative z-10 px-3 md:px-6 py-2 rounded-md   transition-colors duration-300 ${activeTab === "archived" ? "text-white" : "text-gray-300 hover:text-white"
                        }`}
                >
                    Archived
                </button>
            </div>
        </section>
    )
}
