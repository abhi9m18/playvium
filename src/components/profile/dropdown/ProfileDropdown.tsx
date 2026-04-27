"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import ProfileMenu from "./ProfileMenu"
import Image from "next/image"
import { menubb } from "@/assets/icons/bottombar"
import { mennew } from "@/assets/images/home"

interface Props {
  menuType: string
  openLanguageModal: () => void
}

export default function ProfileDropdown({ menuType, openLanguageModal }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg transition-colors hover:scale-105 active:scale-95"
      >
        {menuType === 'top' ? (
          <div className="w-10 h-10 rounded-full bg-[#6A16D1] overflow-hidden flex items-center justify-center">
            <Image src={mennew} alt="User Avatar" width={40} height={40} />
          </div>
        ) : (
          <button className="flex flex-col items-center justify-center gap-1 text-[#ffffff] hover:text-white">
            <Image src={menubb} alt="Menu" width={28} height={28} />
            <span className="text-[11px] font-medium">Menu</span>
          </button>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/30"
          />

          {/* Menu Panel - Desktop (dropdown with scroll) */}
          <div className="hidden md:block absolute right-6 top-16 z-50 max-h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden">
            <ProfileMenu onClose={() => setIsOpen(false)} openLanguageModal={openLanguageModal} />
          </div>

          {/* Menu Panel - Mobile (slide up from bottom with scroll) */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <ProfileMenu onClose={() => setIsOpen(false)} openLanguageModal={openLanguageModal} />
          </div>
        </>
      )}
    </div>
  )
}