import { wallet, spinwheel, crown, lootbox, message, goldcoins } from '@/assets/images/vip'
import Image from 'next/image'



export function FeatureCards() {
  const features = [
    {
      image: wallet,
      title: "No-Fee",
      subtitle: "Withdrawal",
      description: "Reach VIP 38 for no-fee currency withdrawals.",
    },
    {
      image: spinwheel,
      title: "Rewarding",
      subtitle: "Lucky Spin",
      description: "Spin the wheel & receive bigger prizes as you level up.",
    },
    {
      image: crown,
      title: "Dedicated",
      subtitle: "VIP Host",
      description: "Selected VIPs get personalized attention from a dedicated host.",
    },
    {
      image: lootbox,
      title: "Amazing",
      subtitle: "Level Up Bonus",
      description: "Unlock multiple surprise rewards as you level up.",
    },
    {
      image: message,
      title: "Fun Tips & Raining",
      subtitle: "",
      description: "Tip to show appreciation or try Coin Drops to win rewards.",
    },
    {
      image: goldcoins,
      title: "Exclusive Cashback",
      subtitle: "",
      description: "Earn incredible cashback rewards every week & month.",
    },
  ]

  return (
    <div className="">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4  gap-y-14 pt-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="relative bg-[#191D24]  rounded-lg pt-12 pb-4 px-6 text-center"
          >
          
            <div className="absolute -top-10 left-1/2 -translate-x-1/2">
              <Image src={feature.image} alt={feature.title} className="w-24 h-24 object-contain" />
            </div>

            <div className="mt-2">
              <h3 className="text-gray-100 font-normal text-sm sm:text-base">{feature.title}</h3>
              {feature.subtitle && <p className="text-gray-100 font-normal text-sm sm:text-base">{feature.subtitle}</p>}
              <p className="text-gray-500 sm:text-[#B3BEC1] text-xs sm:text-sm mt-3 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
