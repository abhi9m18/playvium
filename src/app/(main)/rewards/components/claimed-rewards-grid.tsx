export interface ClaimedReward {
  label: string
  value: string
}

interface ClaimedRewardsGridProps {
  rewards: ClaimedReward[]
}

export function ClaimedRewardsGrid({ rewards }: ClaimedRewardsGridProps) {
  return (
    <div>
      <p className="text-xl text-white mb-5">Claimed Rewards</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {rewards.map((reward, index) => (
          <div key={index} className="bg-[#191D24] rounded-xl p-4">
            <p className="text-[#9590C0] text-[16px] mb-1">{reward.label}</p>
            <p className="text-white text-lg md:text-3xl font-medium">{reward.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
