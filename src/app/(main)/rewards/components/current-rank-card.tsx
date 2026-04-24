"use client"
import { coin } from '@/assets/images/vip'
import Image from 'next/image'
import Tabs from './tabs'
interface CurrentRankCardProps {
  rank: string
  progress: number
  wagerRemaining: string
  onClaim: () => void
}

export function CurrentRankCard({ rank, progress, wagerRemaining, onClaim }: CurrentRankCardProps) {
  const remaining = 100 - progress

  return (
    <div>
      <p className="text-xl text-white mb-5">Current Rank</p>
      <div className="bg-[#191D24] rounded-xl p-6">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 shrink-0 ml-4  right-2 ">
            <Image
              src={coin}
              alt="Rewards Vault"
              width={1000}
              height={1000}
              className="object-contain"
            />

          </div>
          <div className="px-4 flex flex-col items-center w-full">
            {/* Rank */}
            <p className="text-yellow-400 text-4xl font-medium order-1 md:order-2">
              {rank}
            </p>

            {/* Current */}
            <p className="text-gray-400 text-sm mt-2 md:mt-5 order-2 md:order-1">
              Current
            </p>
          </div>

          {/* Progress */}
          <div className="w-full mt-4 rounded-2xl space-y-5 bg-[#242B35] px-4 py-3">
            <p className="text-[16px] font-bold text-white mb-1">Wager for next Rank</p>

            <div className="w-full bg-[#3E4652] rounded-full my-3 h-2 mb-2">
              <div className="bg-[#B93DEB] h-2 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[15px] text-gray-100 mb-2">Remaining {wagerRemaining}</p>
          </div>

          <Tabs />
        </div>
      </div>
    </div>
  )
}
