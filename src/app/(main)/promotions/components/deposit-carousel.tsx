"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  promo1,
  promo2,
  promo3,
  promo4,
  promolable1,
  promolable2,
  promolable3,
  promolable4,
} from "@/assets/images/promotions/index"
import Image from "next/image"

interface DepositCard {
  id: number
  title: string
  bonus: string
  label: string
  color: string
  borderColor: string
  icon: any
  image: any
}

const depositCards: DepositCard[] = [
  {
    id: 1,
    title: "120% BONUS",
    bonus: "First Deposit",
    label: "01",
    color: "rounded-[10px] bg-gradient-to-b from-[#F5A623]/70 via-[#F5A623]/60 to-[#696969]",
    borderColor: "border-yellow-500",
    icon: promolable1,
    image: promo1,
  },
  {
    id: 2,
    title: "100% BONUS",
    bonus: "Second Deposit",
    label: "02",
    color: "rounded-[10px] bg-gradient-to-b from-[#5DBE42]/70 via-[#5DBE42]/60 to-[#2E3C35]",
    borderColor: "border-green-500",
    icon: promolable2,
    image: promo2,
  },
  {
    id: 3,
    title: "150% BONUS",
    bonus: "Third Deposit",
    label: "03",
    color: "rounded-[10px] bg-gradient-to-b from-[#D87647]/70 via-[#D87647]/60 to-[#241108]",
    borderColor: "border-orange-500",
    icon: promolable3,
    image: promo3,
  },
  {
    id: 4,
    title: "100% BONUS",
    bonus: "Fourth Deposit",
    label: "04",
    color: "rounded-[10px] bg-gradient-to-b from-[#982FCF]/70 via-[#982FCF]/60 to-[#3D3D3D]",
    borderColor: "border-purple-500",
    icon: promolable4,
    image: promo4,
  },
]

export default function DepositCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="overflow-hidden sm:mt-3 md:mt-5">
      <div ref={scrollContainerRef}  className="overflow-x-auto scroll-smooth scrollbar-hide">
        <div
          className="flex gap-1 sm:gap-3 md:gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {depositCards.map((card) => (
            <div key={card.id} className={`shrink-0 w-40 md:w-48 pl-0 md:pl-4 pr-2 md:pr-0  py-4 md:p-0 `}>
              <div
                className={`${card.color} p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg min-h-52 sm:min-h-40 md:min-h-52 lg:min-h-60 flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="absolute top-2.5 left-2 sm:top-2 sm:left-2 md:top-2.5 md:left-2.5 w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-[6px] sm:text-[8px] md:text-[10px]">
                  <span className="absolute inset-0 flex items-center justify-center z-10">{card.label}</span>
                  <Image
                    src={card.icon || "/placeholder.svg"}
                    alt={card.title}
                    width={60}
                    height={60}
                    className="object-cover rounded-full"
                  />
                </div>

                {/* Icon/Image placeholder */}
                <div className="absolute top-[60%] md:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-24 md:w-28 lg:w-32 flex flex-col justify-center items-center">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    width={1000}
                    height={1000}
                    className="object-contain mx-auto  sm:mb-1.5 md:mb-2"
                  />
                  <p className="text-center mb-1 sm:mb-1.5 md:mb-2 text-white font-bold text-xs lg:text-sm ">{card.title}</p>
                  <p className="text-center bg-[#323738] backdrop-blur-sm rounded px-2 md:px-3 py-1 text-white/80  text-xs">{card.bonus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}