import { ExternalLink } from "lucide-react";
import { annupic } from "@/assets/images/announcement";
import Image from "next/image";
const Announcement = () => {
  const bonusCards = [
    {
      id: 1,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!",
    },
    {
      id: 2,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!",
    },
    {
      id: 3,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!",
    },
    {
      id: 4,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!",
    },
    {
      id: 5,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!",
    },
    {
      id: 6,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!",
    },
    {
      id: 7,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!⚽",
    },
    {
      id: 8,
      date: "7/30/2025",
      time: "10:10:20 AM",
      timeLeft: "🏀Its Weekly Sports Bonus Time!⚽",
    },
  ];

  return (
    <div className="w-full bg-[#0F131A]">
      <div className="mt-[60px] md:mt-[66px] px-1 md:px-3 py-2">
        <div className=" max-w-7xl justify-center mx-auto items-center md:p-6 px-4 md:px-10 py-6">
          <div className="w-full">
            <h2 className="text-white mb-4 text-xl font-medium">
              Announcement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bonusCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#191D24] backdrop-blur-sm rounded-lg p-2 md:p-6"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-gray-400 text-[15px] ">
                      <div>
                        {card.date}, {card.time}
                      </div>
                    </div>
                  </div>

                  {/* Time! Section */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-white font-normal leading-0.5 text-[16px] ">
                      {card.timeLeft}
                    </span>                  
                  </div>

                  <div className="relative rounded-lg cursor-pointer hover:scale-[1.02] transition-transform duration-200 overflow-hidden">
                    <Image
                      src={annupic}
                      alt=""
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                  <div className="mt-4">
                    <button className=" text-[#CA6BEF] text-sm hover:text-[#CA6BEF] transition-colors flex items-center space-x-1">
                      {/* <span>Click to know more</span> */}
                      {/* <ExternalLink size={12} /> */}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
