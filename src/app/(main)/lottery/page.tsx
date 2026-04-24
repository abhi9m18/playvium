"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { lotteybanner, trophy } from "@/assets/icons/lottery";
import { banners } from "@/data/herobannerdata";
import { useRef } from "react";
import {
  contentimg,
  drawflag,
  flag1,
  flag2,
  flag3,
  flag4,
  flag5,
  flag6,
  person1,
  person2,
  person3,
  person4,
  person5,
  mobilelotterybanner,
  person6,
  popularflag,
} from "@/assets/icons/lottery";
import Link from "next/link";
import { herodragon } from "@/assets/images/home";

export default function LotteryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openStep, setOpenStep] = useState(1);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [popularAtStart, setPopularAtStart] = useState(true);
  const [popularAtEnd, setPopularAtEnd] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  // Check scroll boundaries
  const checkPopularScroll = () => {
    const container = document.getElementById("popular-scroll");
    if (!container) return;

    setPopularAtStart(container.scrollLeft <= 5);

    setPopularAtEnd(
      container.scrollWidth - container.clientWidth - container.scrollLeft <= 5
    );
  };

  // Scroll function
  const scrollPopular = (direction: "left" | "right") => {
    const container = document.getElementById("popular-scroll");
    if (!container) return;

    const amount = 300;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Attach listener
  useEffect(() => {
    checkPopularScroll();

    const container = document.getElementById("popular-scroll");
    if (!container) return;

    container.addEventListener("scroll", checkPopularScroll);

    return () => container.removeEventListener("scroll", checkPopularScroll);
  }, []);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Scroll logic
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Track scroll position
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, [scrollRef, checkScroll]);

  // Upcoming lottery data
  const upcomingLotteries = [
    {
      id: 1,
      pooled: "$1,200.00",
      hrs: "01h",
      min: "15m",
      sec: "32s",
      flagimg: drawflag,
    },
    {
      id: 2,
      pooled: "$3,500.00",
      hrs: "00h",
      min: "45m",
      sec: "10s",
      flagimg: drawflag,
    },
    {
      id: 3,
      pooled: "$2,250.00",
      hrs: "02h",
      min: "20m",
      sec: "05s",
      flagimg: drawflag,
    },
    {
      id: 4,
      pooled: "$5,000.00",
      hrs: "00h",
      min: "10m",
      sec: "50s",
      flagimg: drawflag,
    },
    {
      id: 5,
      pooled: "$4,150.00",
      hrs: "03h",
      min: "00m",
      sec: "22s",
      flagimg: drawflag,
    },
    {
      id: 6,
      pooled: "$1,850.00",
      hrs: "00h",
      min: "35m",
      sec: "44s",
      flagimg: drawflag,
    },
    {
      id: 7,
      pooled: "$6,200.00",
      hrs: "04h",
      min: "10m",
      sec: "15s",
      flagimg: drawflag,
    },
  ];

  // Popular lottery data
  const popularLotteries = [
    {
      id: 1,
      name: "WIN WIN Lottery",
      draw: "03h19m31s",
      price: "$100,000.00",
      hasButtons: false,
      flagImg: popularflag,
    },
    {
      id: 2,
      name: "Greece KENO 20/80",
      draw: "00 h00 m00 s",
      price: "$2,500.00",
      hasButtons: true,
      flagImg: popularflag,
    },
    {
      id: 3,
      name: "Greece KENO 20/80",
      draw: "00 h00 m00 s",
      price: "$2,500.00",
      hasButtons: true,
      flagImg: popularflag,
    },
    {
      id: 4,
      name: "Greece KENO 20/80",
      draw: "00 h00 m00 s",
      price: "$2,500.00",
      hasButtons: true,
      flagImg: popularflag,
    },
    {
      id: 5,
      name: "Greece KENO 20/80",
      draw: "00 h00 m00 s",
      price: "$2,500.00",
      hasButtons: true,
      flagImg: popularflag,
    },
    {
      id: 6,
      name: "Greece KENO 20/80",
      draw: "00 h00 m00 s",
      price: "$2,500.00",
      hasButtons: true,
      flagImg: popularflag,
    },
    {
      id: 7,
      name: "Greece KENO 20/80",
      draw: "00 h00 m00 s",
      price: "$2,500.00",
      hasButtons: true,
      flagImg: popularflag,
    },
    {
      id: 8,
      name: "Greece KENO 20/80",
      draw: "00 h00 m00 s",
      price: "$2,500.00",
      hasButtons: true,
      flagImg: popularflag,
    },
  ];

  // Recent Winners data
  const recentWinners = [
    {
      id: 1,
      player: "Niymsb6ngpac",
      prize: "$600.00",
      flagImg: flag1,
      personImg: person1,
    },
    {
      id: 2,
      player: "Uhezpbeduoac",
      prize: "$600.00",
      flagImg: flag2,
      personImg: person2,
    },
    {
      id: 3,
      player: "Blackmagic562",
      prize: "$600.00",
      flagImg: flag3,
      personImg: person3,
    },
    {
      id: 4,
      player: "Blackmagic562",
      prize: "$600.00",
      flagImg: flag4,
      personImg: person4,
    },
    {
      id: 5,
      player: "Vdisiclokqac",
      prize: "$600.00",
      flagImg: flag5,
      personImg: person5,
    },
    {
      id: 6,
      player: "BonesTheTVShow",
      prize: "$600.00",
      flagImg: flag6,
      personImg: person6,
    },
  ];

  // Top Winning Lotteries data
  const topWinningLotteries = [
    {
      id: 1,
      name: "Gosloto Russia 7/49",
      draw: "30 h53 m5 s",
      amount: "$35,176.25",
      flagImg: flag1,
    },
    {
      id: 2,
      name: "Slovakia Eklub Keno 20/80",
      draw: "00 h00 m0 s",
      amount: "$7,709.00",
      flagImg: flag2,
    },
    {
      id: 3,
      name: "Gosloto Russia 5/36",
      draw: "00 h00 m0 s",
      amount: "$5,831.15",
      flagImg: flag3,
    },
    {
      id: 4,
      name: "FAST KENO 20/80",
      draw: "00 h00 m0 s",
      amount: "$2,734.30",
      flagImg: flag4,
    },
  ];

  const totalPages = 10;

  // Latest results data
  const latestResults = [
    {
      id: 1,
      name: "Slovakia Eklub Keno 20/80",
      date: "05/11/2024, 04:44:01",
      flagImg: flag1,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 2,
      name: "Slovakia Eklub Keno 20/80",
      date: "05/11/2024, 04:42:01",
      flagImg: flag1,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 3,
      name: "FAST KENO 20/80",
      date: "05/11/2024, 04:44:01",
      flagImg: flag4,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 4,
      name: "Greece KENO 20/80",
      date: "05/11/2024, 04:47:01",
      flagImg: flag2,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 5,
      name: "Italy 10e Lotto 20/90",
      date: "05/11/2024, 04:45:01",
      flagImg: flag3,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 6,
      name: "Slovakia Eklub Keno 20/80",
      date: "05/11/2024, 04:44:01",
      flagImg: flag1,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 7,
      name: "Slovakia Eklub Keno 20/80",
      date: "05/11/2024, 04:42:01",
      flagImg: flag1,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 8,
      name: "FAST KENO 20/80",
      date: "05/11/2024, 04:44:01",
      flagImg: flag4,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 9,
      name: "Slovakia Eklub Keno 20/80",
      date: "05/11/2024, 04:40:01",
      flagImg: flag1,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 10,
      name: "Greece KENO 20/80",
      date: "05/11/2024, 04:49:01",
      flagImg: flag2,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 11,
      name: "FAST KENO 20/80",
      date: "05/11/2024, 04:44:01",
      flagImg: flag4,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 12,
      name: "Slovakia Eklub Keno 20/80",
      date: "05/11/2024, 04:42:01",
      flagImg: flag1,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 13,
      name: "FAST KENO 20/80",
      date: "05/11/2024, 04:44:01",
      flagImg: flag4,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 14,
      name: "Greece KENO 20/80",
      date: "05/11/2024, 04:47:01",
      flagImg: flag2,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
    {
      id: 15,
      name: "Italy 10e Lotto 20/90",
      date: "05/11/2024, 04:45:01",
      flagImg: flag3,
      numbers: [9, 0, 6, 6, 8, 2, 6, 4, 0, 9, 3, 3, 5, 6, 7, 8, 0, 9, 0, 8],
    },
  ];

  const howToPlaySteps = [
    {
      id: 1,
      title: "Select your Game",
      content: (
        <div className="space-y-1">
          {/* Centered Image */}
          <div className="w-full flex justify-center items-center py-1 bg-[#242B35]">
            <Image
              src={contentimg}
              alt="Select your game"
              className="h-auto rounded-lg"
              style={{ width: "auto", maxWidth: "500px" }}
            />
          </div>

          <p>
            To begin wagering select your preferred Lucky Numbers game by
            clicking on the 'BET' button.
          </p>
          <p>
            Choose from our extensive list of international Lucky Numbers draws
            by searching available draws on the Lucky Numbers page or find the
            most recent upcoming draws on the home page carousel.
          </p>
          <p>
            Numerous Lucky Numbers draws take place regularly offering you the
            chance to win easy any given week.
          </p>
          <p>
            Once you have selected the Lucky Numbers you will be provided with
            betting market types available for your selected game.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Select your Market",
      content: (
        <div className="space-y-3">
          <p>
            After selecting your game, choose the market type you wish to bet
            on.
          </p>
          <p>
            Different games offer different market options such as betting on 2
            balls, 3 balls, or other available betting formats.
          </p>
          <p>
            Review the odds and potential payouts for each market before making
            your selection.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Make your Wager",
      content: (
        <div className="space-y-3">
          <p>
            Once you've selected your market, it's time to place your wager.
          </p>
          <p>Enter the amount you wish to bet and confirm your selection.</p>
          <p>
            Double-check your bet slip to ensure all details are correct before
            finalizing your wager.
          </p>
          <p>
            Your bet will be confirmed and you'll receive a bet confirmation
            with all the details.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "View your Wagers",
      content: (
        <div className="space-y-3">
          <p>
            You can view all your active and past wagers in the 'My Bets'
            section.
          </p>
          <p>
            Track the status of your bets in real-time and see if you've won.
          </p>
          <p>
            All winning bets will be automatically credited to your account
            balance.
          </p>
          <p>
            You can also view detailed bet history including stake amount, odds,
            and results.
          </p>
        </div>
      ),
    },
  ];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleStep = (stepId: any) => {
    setOpenStep(openStep === stepId ? null : stepId);
  };

  return (
    <div className="">
      <div className="relative w-full  bg-[#0F131A] h-[260px] md:h-[300px] lg:h-[340px]  rounded-none">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-[#1A2027] to-transparent" />

        {/* Center Watermark (Dragon) */}
        <div className="absolute inset-0 mt-20 flex items-center justify-center opacity-40 pointer-events-none">
          <Image
            src={herodragon}
            alt="Dragon"
            className="w-[15%] md:w-[12%] object-contain"
          />
        </div>

        {/* Desktop Banner */}
        <div className="absolute hidden md:flex right-0 top-0 mt-10 items-end justify-end w-[65%] h-full pointer-events-none">
          <Image
            src={lotteybanner}
            alt="Lottery Banner"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Mobile Banner */}
        <div className="absolute flex md:hidden right-0 top-0 mt-10 items-end justify-end w-[60%] h-full pointer-events-none">
          <Image
            src={mobilelotterybanner}
            alt="Mobile Lottery Banner"
            className="object-contain w-full h-full"
          />
        </div>

        {/* LEFT SIDE CONTENT */}
        <div className="relative z-20 h-full flex items-center mt-5 px-6 md:px-12 lg:px-16">
          <div className="flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-white text-xl md:text-4xl lg:text-[42px] font-normal md:font-bold leading-tight">
              Lottery
            </h1>

            {/* Desktop Subtitle */}
            <p className="hidden md:block text-white/70 text-base max-w-md leading-relaxed">
              Play lotteries online with Lotto and hit the jackpot!
            </p>

            {/* Mobile Subtitle */}
            <p className="block md:hidden text-gray-600 text-[13px] max-w-md leading-relaxed">
              Play lotteries online Lotto with <br /> and hit the jackpot!
            </p>

            {/* How to play */}
            <button className="text-[#981aca] md:text-[#B93DEB] text-sm md:text-base font-medium hover:text-[#B93DEB] underline underline-offset-4 w-fit">
              How to play?
            </button>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-[#0F131A] px-4 md:px-10 py-6 text-white">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
        </style>
        <style>{`
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

        <div className="w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Games"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#14171D] text-white px-12 py-3 rounded-xl border border-[#20242C] 
                           focus:ring-2 focus:ring-[#B93DEB] outline-none transition placeholder:text-white/40"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-0 py-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-sm md:text-lg font-semibold text-white"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                Upcoming Lottery draw
              </h2>

              <div className="flex items-center gap-1 md:gap-2">
                <Link
                  href="/all"
                  className="
      px-4 md:px-6 py-1.5 md:py-2.5 
      rounded-lg text-sm font-medium
      bg-[#2A3545] hover:bg-[#3a4657] 
      text-white shadow
      transition flex items-center justify-center
    "
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  All
                </Link>
                {/* LEFT ARROW */}
                <button
                  onClick={() => scroll("left")}
                  disabled={atStart}
                  className={`
    w-8 h-8 md:w-10 d:h-10
    flex items-center justify-center 
    rounded-lg transition 
    bg-[#394150]
    ${atStart ? "opacity-40 cursor-not-allowed" : "hover:bg-[#454D5A]"}
  `}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 block leading-none mx-0 my-0"
                    fill="none"
                    stroke={atStart ? "#6B7280" : "#D1D5DB"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18L9 12L15 6" />
                  </svg>
                </button>

                {/* RIGHT ARROW */}
                <button
                  onClick={() => scroll("right")}
                  disabled={atEnd}
                  className={`
    w-8 h-8 md:w-10 d:h-10
    flex items-center justify-center 
    rounded-xl transition 
    bg-[#394150]
    ${atEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-[#454D5A]"}
  `}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 block leading-none mx-0 my-0"
                    fill="none"
                    stroke={atEnd ? "#6B7280" : "#D1D5DB"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6L15 12L9 18" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div
                className="flex gap-4 pb-2"
                style={{
                  minWidth: "min-content",
                  scrollSnapType: "x mandatory",
                  paddingBottom: 8,
                }}
              >
                {upcomingLotteries.map((lottery) => (
                  <div
                    key={lottery.id}
                    className="relative rounded-xl w-[240px] md:w-[280px] bg-[#313538] overflow-hidden border border-[#1a3535] shrink-0"
                    style={{
                      scrollSnapAlign: "start",
                    }}
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: "url('/pngs/bgdrawimg.png')" }}
                    ></div>

                    {/* Card Content */}
                    <div className="relative z-10 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-sm text-gray-300 font-medium"
                          style={{ fontFamily: "Rubik, sans-serif" }}
                        >
                          Poland keno 20/70
                        </span>

                        <div className="absolute -top-4 z-10 -right-2 w-20 h-20 rounded-full overflow-hidden shadow-md border border-[#1a3535]">
                          <Image
                            alt="flag"
                            src={lottery.flagimg}
                            fill
                            className="object-center"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div
                          className="text-white mb-1"
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 800,
                            fontStyle: "italic",
                            fontSize: "18.46px",
                            lineHeight: "20px",
                          }}
                        >
                          {lottery.pooled}
                        </div>
                        <div
                          className="text-sm text-gray-400"
                          style={{ fontFamily: "Rubik, sans-serif" }}
                        >
                          Next Draw Starts in
                        </div>
                      </div>

                      <div className="flex gap-2 mb-4">
                        <div className="flex-1 bg-[#0a1e1e]/70 rounded px-2 py-2 text-center">
                          <div
                            className="text-sm font-semibold text-white"
                            style={{ fontFamily: "Rubik, sans-serif" }}
                          >
                            {lottery.hrs}
                          </div>
                        </div>
                        <div className="flex items-center text-white text-sm">
                          :
                        </div>
                        <div className="flex-1 bg-[#0a1e1e]/70 rounded px-2 py-2 text-center">
                          <div
                            className="text-sm font-semibold text-white"
                            style={{ fontFamily: "Rubik, sans-serif" }}
                          >
                            {lottery.min}
                          </div>
                        </div>
                        <div className="flex items-center text-white text-sm">
                          :
                        </div>
                        <div className="flex-1 bg-[#0a1e1e]/70 rounded px-2 py-2 text-center">
                          <div
                            className="text-sm font-semibold text-white"
                            style={{ fontFamily: "Rubik, sans-serif" }}
                          >
                            {lottery.sec}
                          </div>
                        </div>
                      </div>

                      <button
                        className="w-full bg-[#B93DEB] hover:bg-[#b01fe9] text-white font-medium py-1 rounded-sm transition-colors"
                        style={{ fontFamily: "Rubik, sans-serif" }}
                      >
                        Bet Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-sm md:text-lg font-semibold text-white"
                style={{ fontFamily: "Rubik, sans-serif" }}
              >
                Popular
              </h2>
              <div className="flex items-center gap-2 md:gap-3">
                {/* VIEW ALL */}
                <Link
                  href="/popular"
                  className="
      px-4 md:px-6 py-1.5 md:py-2.5 
      rounded-lg text-sm font-medium
      bg-[#2A3545] hover:bg-[#3a4657] 
      text-white shadow
      transition flex items-center justify-center
    "
                  style={{ fontFamily: "Rubik, sans-serif" }}
                >
                  All
                </Link>
                {/* LEFT */}
                <button
                  onClick={() => scrollPopular("left")}
                  disabled={popularAtStart}
                  className={`
    w-8 h-8 md:w-10 md:h-10 
    flex items-center justify-center 
    rounded-lg transition 
    bg-[#394150]
    ${popularAtStart ? "opacity-40 cursor-not-allowed" : "hover:bg-[#454D5A]"}
  `}
                >
                  <ChevronLeft
                    size={18}
                    className={`${
                      popularAtStart ? "text-gray-500" : "text-gray-300"
                    }`}
                  />
                </button>

                {/* RIGHT */}
                <button
                  onClick={() => scrollPopular("right")}
                  disabled={popularAtEnd}
                  className={`
    w-8 h-8 md:w-10 md:h-10
    flex items-center justify-center 
    rounded-lg transition 
    bg-[#394150]
    ${popularAtEnd ? "opacity-40 cursor-not-allowed" : "hover:bg-[#454D5A]"}
  `}
                >
                  <ChevronRight
                    size={18}
                    className={`${
                      popularAtEnd ? "text-gray-500" : "text-gray-300"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div id="popular-scroll" className="overflow-x-auto scrollbar-hide">
              <div
                className="flex gap-4 pb-2"
                style={{ minWidth: "min-content" }}
              >
                {popularLotteries.map((lottery) => (
                  <div
                    key={lottery.id}
                    className="bg-[#191D24] w-[240px] md:w-[280px] rounded-xl overflow-hidden shrink-0"
                  >
                    <div className="p-4">
                      {/* Top Section - Star and Flag */}
                      <div className="flex items-start justify-between mb-3">
                        <button className="text-gray-400 bg-[#242B35] p-1 rounded-md hover:text-yellow-400 transition-colors">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="#B3BEC1"
                          >
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        </button>
                        <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                          <Image
                            alt="flag"
                            src={popularflag}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Next Draw Timer */}
                      <div className="mb-5">
                        <div
                          className="text-xs text-gray-400"
                          style={{ fontFamily: "Rubik, sans-serif" }}
                        >
                          Next Draw in {lottery.draw}
                        </div>
                      </div>

                      {/* Prize Amount */}
                      <div className="mb-5 flex items-center justify-between">
                        <div
                          className="text-white"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: 400,
                            fontSize: "13px",
                            lineHeight: "1.3",
                          }}
                        >
                          {lottery.name}
                        </div>
                        <div
                          className="text-white"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: 400,
                            fontSize: "15px",
                            lineHeight: "20px",
                          }}
                        >
                          {lottery.price}
                        </div>
                      </div>

                      <div className="mb-5">
                        <div
                          className="text-xs text-gray-400"
                          style={{ fontFamily: "Rubik, sans-serif" }}
                        >
                          Top prize
                        </div>
                      </div>

                      {/* Buttons */}
                      <Link href={`/lottery/${lottery.id}`}>
                        {lottery.hasButtons ? (
                          <div className="flex gap-2">
                            <button
                              className="flex-1 bg-[#242B35] hover:bg-[#242B35] text-white text-sm font-normal py-2.5 rounded-lg transition-colors"
                              style={{ fontFamily: "Rubik, sans-serif" }}
                            >
                              Bet 2 balls
                            </button>
                            <button
                              className="flex-1 bg-[#242B35] hover:bg-[#242B35] text-white text-sm font-normal py-2.5 rounded-lg transition-colors"
                              style={{ fontFamily: "Rubik, sans-serif" }}
                            >
                              Bet 3 balls
                            </button>
                          </div>
                        ) : (
                          <button
                            className="w-full bg-[#242B35] hover:bg-[#242B35] text-white font-normal py-2.5 rounded-lg transition-colors"
                            style={{ fontFamily: "Rubik, sans-serif" }}
                          >
                            Bet Now
                          </button>
                        )}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Winners and Top Winning Lotteries Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Recent Winners */}
            <div className="bg-[#191D24] rounded-xl overflow-hidden border-0 md:border border-[#351a2e]">
              <div className="p-5">
                <div className="flex items-center gap-3">
                  {/* Purple Glowing Dot */}
                  <div className=" w-2 h-2 rounded-full bg-[#B93DEB] animate-[pulse_1.2s_ease-in-out_infinite] shadow-[0_0_10px_4px_rgba(185,61,235,0.8)]"></div>

                  {/* Title */}
                  <h2 className="text-base sm:text-lg text-white font-medium">
                    Recent Winners
                  </h2>
                </div>

                <div className=" mt-5 mb-5">
                  <div className="flex items-center justify-between py-3 px-5 bg-[#282F3B]  rounded-md">
                    <span
                      className="text-sm text-gray-300"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      Prizes Paid Out
                    </span>
                    <span
                      className="text-[#bb46e9] font-bold text-base"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      $16,729,986.87
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-white text-lg pb-2 px-2">
                    <span style={{ fontFamily: "Roboto, sans-serif" }}>
                      Player
                    </span>
                    <span style={{ fontFamily: "Roboto, sans-serif" }}>
                      Prize
                    </span>
                  </div>

                  {recentWinners.map((winner) => (
                    <div
                      key={winner.id}
                      className="flex items-center justify-between py-2.5 hover:bg-[#14171D] rounded-lg px-2 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-700 shrink-0">
                          {/* Person avatar image */}
                          <Image
                            src={winner.personImg}
                            alt={winner.player}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <span
                          className="text-sm text-white"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {winner.player}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[#bb46e9] font-medium"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          {winner.prize}
                        </span>
                        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                          {/* Flag image */}
                          <Image
                            src={winner.flagImg}
                            alt="flag"
                            width={20}
                            height={20}
                            className="object-cover rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Winning Lotteries */}
            <div className="bg-[#191D24] rounded-xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 relative">
                    <Image
                      src={trophy}
                      alt="Trophy"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h2
                    className="text-base font-semibold text-white"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Top Winning Lotteries
                  </h2>
                </div>

                <div className="space-y-0">
                  {topWinningLotteries.map((lottery, index) => (
                    <div
                      key={lottery.id}
                      className="flex items-center gap-4 py-4 border-b border-[#1a3535] last:border-b-0"
                    >
                      <div
                        className="text-white"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: 400,
                          fontStyle: "normal",
                          fontSize: "68.07px",
                          lineHeight: "68.07px",
                          letterSpacing: "0%",
                          textTransform: "capitalize",
                          minWidth: "35px",
                        }}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 relative">
                            <Image
                              src={lottery.flagImg}
                              alt="flag"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span
                            className="text-sm text-white font-normal"
                            style={{
                              fontFamily: "Roboto, sans-serif",
                              fontWeight: 400,
                            }}
                          >
                            {lottery.name}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mb-2 ">
                          <span
                            style={{
                              fontFamily: "Roboto, sans-serif",
                              fontWeight: 400,
                            }}
                          >
                            Next draw: {lottery.draw}
                          </span>
                        </div>
                        <div
                          className="text-[#bb46e9] "
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                          }}
                        >
                          {lottery.amount}
                        </div>
                      </div>

                      <button
                        className="bg-[#bb46e9] hover:bg-[#bb46e9] text-white font-medium px-5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "16px",
                        }}
                      >
                        Bet Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Latest Results Section */}
          <div className="overflow-hidden mt-8">
            <div className="p-1 md:p-1">
              <h2
                className="text-lg md:text-xl font-semibold text-white mb-6"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Latest Results
              </h2>

              {(() => {
                const itemsPerPage = 10;
                const totalPages = Math.ceil(
                  latestResults.length / itemsPerPage
                );
                const startIdx = (currentPage - 1) * itemsPerPage;
                const paginatedData = latestResults.slice(
                  startIdx,
                  startIdx + itemsPerPage
                );

                return (
                  <div>
                    {/* Table Container */}
                    {/* ======================= DESKTOP VERSION (UNCHANGED) ======================= */}
                    <div className="hidden md:block">
                      <div
                        className="bg-[#191D24] rounded-t-xl border border-[#292228] overflow-x-auto md:overflow-x-visible scrollbar-hide"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {/* Header */}
                        <div className="grid grid-cols-[2.5fr_4fr_2fr] gap-4 px-6 py-3 bg-[#191D24] border-b border-[#352f34]">
                          <div className="text-sm text-gray-400">
                            Lottery Name
                          </div>
                          <div className="text-sm text-gray-400 text-center">
                            Jackpot Number
                          </div>
                          <div className="text-sm text-gray-400 text-right">
                            Action
                          </div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-[#1a3535] min-w-[700px]">
                          {paginatedData.map((result) => (
                            <div
                              key={result.id}
                              className="grid grid-cols-[2fr_5fr_2fr] items-center px-6 py-3 hover:bg-[#191D24] transition-colors"
                            >
                              {/* Info */}
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full overflow-hidden relative">
                                  <Image
                                    src={result.flagImg}
                                    alt="flag"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-white font-medium">
                                    {result.name}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {result.date}
                                  </span>
                                </div>
                              </div>

                              {/* Numbers */}
                              <div className="flex flex-wrap gap-1 justify-end">
                                {result.numbers.map((num, idx) => (
                                  <div
                                    key={idx}
                                    className="w-5.5 h-5.5 bg-[#D9D9D9] rounded-full flex items-center justify-center"
                                  >
                                    <span className="text-black text-[10px] font-normal">
                                      {num}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Button */}
                              <div className="flex justify-end">
                                <button className="bg-[#B93DEB] text-white font-bold px-4 py-3 rounded-lg text-xs">
                                  BET NOW
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ======================= MOBILE VERSION (NEW) ======================= */}
                    <div className="block md:hidden">
                      {paginatedData.map((result) => (
                        <div
                          key={result.id}
                          className="bg-[#191D24] rounded-xl border border-[#292228] p-3 mb-3"
                        >
                          {/* TOP ROW */}
                          <div className="flex justify-between items-start mb-2">
                            {/* Info */}
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full overflow-hidden relative">
                                <Image
                                  src={result.flagImg}
                                  alt="flag"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm text-white font-medium">
                                  {result.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {result.date}
                                </span>
                              </div>
                            </div>

                            {/* Button */}
                            <button className=" text-[#B93DEB] font-medium px-4 py-0 rounded-lg text-sm">
                              BET NOW
                            </button>
                          </div>

                          {/* NUMBERS (MOBILE → SCROLL X) */}
                          <div className="flex gap-1 mt-2 overflow-x-auto  scrollbar-hide">
                            {result.numbers.map((num, idx) => (
                              <div
                                key={idx}
                                className="w-6 h-6 bg-[#D9D9D9] rounded-full flex items-center justify-center shrink-0"
                              >
                                <span className="text-black text-[10px] font-normal">
                                  {num}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* pagination  */}
                    <div className="flex bg-[#191D24] items-center justify-center md:justify-end gap-1 md:pr-8 md:rounded-b-md p-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="w-8 h-10 flex items-center justify-center rounded-l  bg-gray-900  transition-colors  disabled:cursor-not-allowed text-gray-400"
                        aria-label="Previous page"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 9L4.5 6L7.5 3"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <div className="flex items-center gap-1.5 px-3 py-[7px] bg-gray-900 rounded-[2px]">
                        <span className="text-sm text-white bg-gray-800 rounded-xs p-1 px-2 font-normal">
                          0{currentPage}
                        </span>
                        <span className="text-sm text-gray-500">of</span>
                        <span className="text-sm  p-1 rounded-xs px-2 text-gray-400">
                          0{totalPages}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="w-8 h-10 flex items-center justify-center rounded-r bg-gray-900  transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-50"
                        aria-label="Next page"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.5 3L7.5 6L4.5 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Hide scrollbar */}
                    <style jsx>{`
                      .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                  </div>
                );
              })()}
            </div>
          </div>

          <div className="max-w-7xl md:mb-10 mt-10   mx-auto">
            <h2
              className="text-xl md:text-2xl font-bold mb-6 px-2"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              How to play
            </h2>

            <div className="space-y-3">
              {howToPlaySteps.map((step) => (
                <div
                  key={step.id}
                  className="bg-[#191D24] rounded-lg overflow-hidden border border-[#303131]"
                >
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full flex justify-between items-center px-4 md:px-6 py-4 text-left text-white font-medium text-sm md:text-base transition-all hover:bg-[#303333]/30"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      background:
                        openStep === step.id ? "bg-[#0C1B0F]" : "bg-[#0C1B0F]",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex items-center justify-center w-7 h-7 md:w-10 md:h-10 rounded-full bg-[#242B35] text-white font-semibold text-base"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {step.id}
                      </span>
                      <span>{step.title}</span>
                    </div>
                    {openStep === step.id ? (
                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-[#ffffff] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400 shrink-0" />
                    )}
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: openStep === step.id ? "1000px" : "0",
                      opacity: openStep === step.id ? 1 : 0,
                    }}
                  >
                    <div
                      className="px-4 md:px-6 py-4 md:py-5 bg-[#191D24] text-gray-300 text-sm md:text-base leading-relaxed border-t border-[#303131]"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {step.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
