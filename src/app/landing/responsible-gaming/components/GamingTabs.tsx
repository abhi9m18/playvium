"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    label: "Playvium Smart",
    href: "/landing/responsible-gaming/wulf-smart",
  },
  {
    label: "Self-Assessment",
    href: "/landing/responsible-gaming/self-assessment",
  },
  {
    label: "Recognise the signs",
    href: "/landing/responsible-gaming/recognise-signs",
  },
];

export default function GamingTabs() {
  const pathname = usePathname();

  return (
    <div className=" hidden md:block bg-[#1b212a] rounded-2xl h-48 p-3 md:w-72 w-full">
      <div className="flex flex-col gap-1">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                px-4 py-3 rounded-xl text-[18px] font-medium transition-all
                ${
                  isActive
                    ? "bg-[#b44cff] text-white shadow-md"
                    : "text-white/90 hover:bg-white/5"
                }
              `}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
