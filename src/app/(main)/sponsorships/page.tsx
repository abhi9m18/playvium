import {
  sponserlogo,
  menplay,
  menplay2,
  menplay3,
} from "@/assets/images/sponsorships";
import Image from "next/image";

const Sponsorships = () => {
  return (
    <div className="bg-[#15181E]">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-2 py-2">
        {/* ================= HEADER SECTION ================= */}
        <div className="mt-[66px] relative overflow-hidden rounded-xl md:rounded-none">
          {/* Gradient Background */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-b
              from-[#FFA4E5] to-[#8B2BBE]
              md:from-[#2d3642] md:to-[#242B3500]
              rounded-xl md:rounded-none
              z-0
            "
          ></div>

          {/* Content */}
          <div
            className="
              relative z-20
              flex  items-center text-center
              flex-row md:items-start ml-2 md:ml-10 md:text-left
              gap-4 md:gap-6
              px-6 py-8
            "
          >
            <Image
              src={sponserlogo}
              alt="Leicester City Logo"
              className="w-[56px] h-[56px] md:w-[90px] md:h-[90px] object-contain"
            />

            <div className="flex flex-col items-start justify-center gap-2 sm:gap-0 text-white">
  <div className="flex flex-col gap-0">
    <h1 className="font-bold text-[26px] md:text-[36px] leading-tight text-left">
      Leicester City
    </h1>
    <h1 className="font-bold text-[26px] md:text-[36px] leading-tight text-left">
      Football Club
    </h1>
  </div>

  <span className="text-[12px] tracking-widest opacity-90 text-left">
    Official website LCFC
  </span>
</div>

          </div>
        </div>

        {/* ================= CONTENT SECTION ================= */}
        <div className="bg-[#191D24] rounded-xl mt-6">
          {/* -------- Section 1 -------- */}
          <div className="w-full p-6 md:p-12 flex flex-col gap-12">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="flex-1 text-white space-y-4">
                <h2 className="text-base md:text-lg">
                  Uniting for a Thrilling Future
                </h2>

                <p className="text-[13px] leading-4 text-[#B3BEC1]">
                  Playvium is thrilled to announce a groundbreaking
                  partnership with Leicester City Football Club (LCFC), a
                  celebrated name in English football.
                </p>

                <h2 className="text-base md:text-lg">
                  A New Chapter in Sports and Gaming
                </h2>

                <p className="text-[13px] leading-4 text-[#B3BEC1]">
                  This collaboration blends the thrilling worlds of sports and
                  gaming, offering players unparalleled experiences and
                  opportunities to connect with both their favourite team and
                  the gaming community.
                </p>
              </div>

              <div className="flex-1">
                <Image
                  src={menplay}
                  alt="Player"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          {/* -------- Section 2 -------- */}
          <div className="w-full p-6 md:p-12 flex flex-col gap-12">
            <div className="flex flex-col sm:flex-row-reverse gap-6 md:gap-8">
              <div className="flex-1 text-white space-y-4">
                <h2 className="text-[16px]">
                  What Can Fans Expect?
                </h2>

                <p className="text-[12px] leading-4 text-[#B3BEC1]">
                  Fans can look forward to exclusive promotions, in-game events,
                  signed merchandise, and unforgettable football experiences.
                </p>

                <h2 className="text-[16px]">
                  Benefits of the Partnership
                </h2>

                  <p className=" font-normal text-[12px] leading-4 text-[#B3BEC1]">
                    The Playvium community will enjoy a range of
                    exclusive benefits through the partnership with LCFC: <br />
                    1. VIP matchday hospitality experience and VIP access to all
                    LCFC home games. <br />
                    2. Exclusive player interactions, including open training
                    sessions and meet-and-greets with players. <br />
                    3. Shirts signed by the majority of LCFC’s First Team squad{" "}
                    <br />
                    <br />
                    Guided tour of King Power Stadium with a Club legend,
                    featuring personal insights into LCFC’s history.
                  </p>
                </div>
              <div className="flex-1">
                <Image
                  src={menplay2}
                  alt="Player"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

            <div className="w-full  p-6 md:p-12 rounded-xl flex flex-col gap-12 mt-3">
              {/* Top Section */}
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                {/* Text Left */}
                <div className="flex-1 text-white space-y-4">
                  <h2 className=" font-normal text-base leading-6 md:text-lg">
                    About Leicester City Football Club
                  </h2>

                  <p className=" font-normal text-[12px] leading-4 text-[#B3BEC1]">
                    eicester City Football Club, nicknamed The Foxes, has a
                    unique history, which includes their remarkable 2015/2016
                    season when they won the Premier League title against all
                    odds. With a strong fanbase and a commitment to excellence,
                    LCFC continues to be a powerhouse in English football.
                  </p>

                  <h2 className=" font-normal text-base leading-6 md:text-lg">
                    About Playvium{" "}
                  </h2>

                  <p className=" font-normal text-[12px] leading-4 text-[#B3BEC1]">
                    Playvium is a leading online gaming platform known for
                    its innovative approach to iGaming. With a focus on
                    providing a seamless and engaging experience for players,
                    Playvium has quickly become a favourite among gaming
                    enthusiasts worldwides
                  </p>
                  <p className=" font-normal text-[12px] leading-4 text-[#B3BEC1]">
                    This partnership with LCFC paves the way for exciting new
                    ventures in the realms of sports and gaming. Stay tuned for
                    more updates and be part of this thrilling journey as
                    Playvium and LCFC redefine the boundaries of player engagement
                    and entertainment.
                  </p>
                </div>
              <div className="flex-1">
                <Image
                  src={menplay3}
                  alt="Player"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsorships;
