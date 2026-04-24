"use client"

import { promog1, promog2, promog3, promog4, trophy, wheel } from "@/assets/images/promotions"
import PromotionCard from "./promotion-card"

interface Promotion {
  id: number
  title: string
  description: string
  status: string
  tag: string
  timestamp: string
  image: any
  color: string
  featured?: boolean
  layout: "default" | "background"
  archived: boolean
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Free Bet in Playvium",
    description: "Deposit Bonus in Playvium",
    status: "In Progress",
    tag: "NEW USERS",
    timestamp: "Playvium x Leicester City\nFIQ: 5/26/2025, 5:29:59 AM",
    image: wheel,
    color: "bg-gradient-to-l from-[#A67F3A]  to-[#514434]",
    featured: false,
    layout: "default",
    archived: false,
  },
  {
    id: 2,
    title: "5 Free Bet In Sports",
    description: "Deposit Bonus in Sports.",
    status: "In Progress",
    tag: "NEW USERS",
    timestamp: "Playvium x Leicester City\nFIQ: 5/26/2025, 5:29:59 AM",
    image: trophy,
    color: "bg-gradient-to-l from-[#23EB87] to-[#151D20]",
    featured: false,
    layout: "default",
    archived: false,
  },
  {
    id: 7,
    title: "5 Free Bet In Sports",
    description: "Get enhanced odds and free bets for your first sports wagers.",
    status: "In Progress",
    tag: "NEW USERS",
    timestamp: "Playvium x Leicester City\nFIQ: 5/26/2025, 5:29:59 AM",
    image: wheel,
    color: "bg-gradient-to-l from-[#A67F3A]  to-[#514434]",
    featured: false,
    layout: "default",
    archived: true,
  },
  // {
  //   id: 3,
  //   title: "5 Free Bet In Sports",
  //   description: "Get enhanced odds and free bets for your first sports wagers.",
  //   status: "In Progress",
  //   tag: "NEW USERS",
  //   timestamp: "Playvium x Leicester City\nFIQ: 5/26/2025, 5:29:59 AM",
  //   image: promog1,
  //   color: "bg-gradient-to-l from-[#24EE89] via-[#24EE89] to-[rgba(35, 238, 136, 0.00) 100%)]",
  //   featured: false,
  //   layout: "background",
  //   archived: false,
  // },
  // {
  //   id: 4,
  //   title: "5 Free Bet In Sports",
  //   description: "Get enhanced odds and free bets for your first sports wagers.",
  //   status: "In Progress",
  //   tag: "NEW USERS",
  //   timestamp: "Playvium x Leicester City\nFIQ: 5/26/2025, 5:29:59 AM",
  //   image: promog2,
  //   color: "bg-gradient-to-l from-[#24EE89] via-[#24EE89] to-[rgba(35, 238, 136, 0.00) 100%)]",
  //   featured: false,
  //   layout: "background",
  //   archived: false,
  // },
  // {
  //   id: 5,
  //   title: "5 Free Bet In Sports",
  //   description: "Get enhanced odds and free bets for your first sports wagers.",
  //   status: "In Progress",
  //   tag: "NEW USERS",
  //   timestamp: "Playvium x Leicester City\nFIQ: 5/26/2025, 5:29:59 AM",
  //   image: promog3,
  //   color: "bg-gradient-to-l from-[#24EE89] via-[#24EE89] to-[rgba(35, 238, 136, 0.00) 100%)]",
  //   featured: false,
  //   layout: "background",
  //   archived: false,
  // },
  // {
  //   id: 6,
  //   title: "5 Free Bet In Sports",
  //   description: "Get enhanced odds and free bets for your first sports wagers.",
  //   status: "In Progress",
  //   tag: "NEW USERS",
  //   timestamp: "Playvium x Leicester City\nFIQ: 5/26/2025, 5:29:59 AM",
  //   image: promog4,
  //   color: "bg-gradient-to-l from-[#24EE89] via-[#24EE89] to-[rgba(35, 238, 136, 0.00) 100%)]",
  //   featured: false,
  //   layout: "background",
  //   archived: false,
  // },
]

export default function PromotionGrid({ activeTab }: { activeTab: "latest" | "archived" }) {
  const filteredPromotions = promotions.filter((promo) => (activeTab === "latest" ? !promo.archived : promo.archived))

  return (
    <section className="px-1 py-2 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Horizontal scroll carousel - shows 1 card + peek of next */}
        <div className="sm:hidden">
          <div className="">
            <div className="flex-col pb-4  w-full">
              {filteredPromotions.slice(0,).map((promo) => (
                <div key={promo.id} className="w-full mb-3">
                  <PromotionCard promotion={promo} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet and Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promo) => (
            <PromotionCard key={promo.id} promotion={promo} />
          ))}
        </div>
      </div>
    </section>
  )
}
