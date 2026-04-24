"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { logo, globe } from "@/assets/images/home";
import Link from "next/link";
import LanguageModal from "@/components/model/LanguageModal";

export default function LandingHeader() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <div className="fixed w-full z-999 bg-[#191d24] ">
     <div className="w-full max-w-6xl mx-auto">
          {/* Desktop & Tablet Header */}
          <div className="flex items-center justify-between w-full h-[66px] px-4 md:px-4">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center">
              <Image
                height={40}
                width={160}
                src={logo}
                alt="Logo"
                className="w-28 h-8 md:w-36 md:h-11"
              />
            </Link>

            {/* Right: Language Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLanguageOpen(true)}
              className="w-9 h-9 md:w-9 md:h-9 rounded-md bg-gray-950 hover:bg-black/80 p-2 transition-colors"
            >
              <Image
                height={40}
                width={40}
                src={globe}
                alt="Language"
                className="w-full h-full object-contain"
              />
            </Button>
          </div>
        </div>

      <LanguageModal
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
      />
    </div>
  );
}
