"use client";

import Image from "next/image";

interface PromotionCardProps {
  promotion: {
    id: number;
    title: string;
    description: string;
    status: string;
    tag: string;
    timestamp: string;
    image: string;
    color: string;
    featured?: boolean;
    layout?: "default" | "background";
    archived: boolean;
  };
}

export default function PromotionCard({ promotion }: PromotionCardProps) {
  const layout = promotion.layout || "default";

  if (layout === "background") {
    return (
      <div className="flex flex-col">
        <div className="rounded-t-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
          {/* Background image */}
          <div className="inset-0">
            <Image
              src={promotion.image || "/placeholder.svg"}
              alt={promotion.title}
              width={400}
              height={160}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        {/* Bottom bar */}
        <div className="bg-[#191D24] backdrop-blur-sm px-4 py-2 flex items-center justify-between text-xs rounded-b-lg">
          <span className="text-gray-300">
            {promotion.description.split(" ").slice(0, 3).join(" ")}
          </span>
          <button className="bg-gray-700 p-2 rounded-sm text-[#DBB0E2]">
            {promotion.archived ? "Archived" : promotion.status}
          </button>
        </div>
      </div>
    );
  }

  // Default layout
  return (
    <div className="flex flex-col">
      {/* Card */}
      <div
        className={`
    rounded-t-lg 
    bg-linear-to-br ${promotion.color}
    overflow-hidden 
    hover:shadow-xl 
    transition-all 
    cursor-pointer 
    group
    h-[140px]          
    md:h-48
  `}
      >
        {/* Background gradient */}
        <div className="inset-0 opacity-90"></div>
        {/* Card content */}
        <div className="relative flex items-center h-full">
          <div className="flex-1 px-2 flex flex-col justify-center z-10 ml-4">
            <h2 className="font-bold text-[#24ee89] text-[24px] leading-tight ">
              100% Bonus+
            </h2>
            <h3 className="font-bold text-white text-[20px] leading-tight">
              {promotion.title}
            </h3>
          </div>
          {/* Right side - Image */}
          <div className="w-1/2 h-full p-3 relative flex items-center justify-center">
            <div className="w-full h-full">
              <Image
                src={promotion.image || "/placeholder.svg"}
                alt={promotion.title}
                width={1000}
                height={1000}
                className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom bar - Outside the card */}
      <div className="bg-[#191D24] backdrop-blur-sm px-4 py-3 flex items-center gap-3 text-xs rounded-b-lg">
        {/* Left text */}
        <span className="text-gray-100 text-[16px] font-semibold truncate min-w-0 flex-1">
          {promotion.description}
        </span>

        {/* Right button */}
        <button className="bg-[#2E343F] px-3 py-2 rounded-md text-sm text-[#e37cf3] whitespace-nowrap">
          {promotion.archived ? "Archived" : promotion.status}
        </button>
      </div>
    </div>
  );
}
