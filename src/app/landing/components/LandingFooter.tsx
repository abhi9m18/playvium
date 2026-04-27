import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { globe, logo } from "@/assets/images/home";
import {
  footerlangicon,
  sm1,
  sm2,
  sm3,
  sm4,
  sm5,
  sm6,
  sm7,
  sm8,
} from "@/assets/icons/index";
import { providers } from "@/data/providers";
import { useEffect, useRef } from "react";

import {
  gcb,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  sc1,
  sc2,
  sc3,
  sc4,
} from "@/assets/icons/footer";
import { plus } from "@/assets/landing";

interface FooterProps {
  setIsRecommendedWalletsModalActive: Dispatch<SetStateAction<boolean>>;
  setFooterContentModal: Dispatch<SetStateAction<string | null>>;
}

const socialMediaLinks = [
  { href: "https://t.me/wolf", img: sm8, alt: "Telegram" },
  { href: "https://x.com/wolf?s=21", img: sm2, alt: "Twitter" },
  { href: "https://facebook.com", img: sm3, alt: "Facebook" },
  { href: "https://instagram.com", img: sm4, alt: "Instagram" },
  { href: "https://youtube.com", img: sm5, alt: "YouTube" },
  // { href: "https://discord.gg/Auhcq9T7", img: sm6, alt: "Discord" },
  { href: "https://reddit.com", img: sm7, alt: "Reddit" },
  { href: "https://linkedin.com", img: sm1, alt: "LinkedIn" },
];

// Award badges
const awardBadges = [
  { image: sc1 },
  { image: sc2 },
  { image: sc3 },
  { image: sc4 },
];

// Certification logos
const certificationLogos = [
  { image: p1 },
  { image: p2 },
  { image: p3 },
  { image: p4 },
  { image: p5 },
  { image: p6 },
  { image: p7 },
  { image: p8 },
];

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "English", value: "en" },
  { label: "Espanol ", value: "es" },
];

export default function LandingFooter() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
          
          @keyframes provider-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-provider-scroll {
            animation: provider-scroll 30s linear infinite;
          }
        `}
      </style>

      <div className="flex flex-col mt-0 items-center w-full bg-[#15181E] text-[#B3BEC1] font-[Inter]">
        {/* Container with max-width and padding */}
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-10 md:py-12 lg:py-10">
          {/* Top Section - Logo and Language */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 mb-8 md:mb-10">
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-3 md:gap-4 max-w-full md:max-w-[600px] w-full">
              <Link href={"/"} shallow={true} className="inline-block">
                <Image
                  height={100}
                  width={100}
                  src={logo}
                  alt="Playvium Logo"
                  className="w-20 sm:w-20 md:w-32 lg:w-32 h-auto"
                />
              </Link>

              {/* Desktop text */}
              <p className="hidden md:block text-[12px] sm:text-[12px] md:text-[16px] leading-5 sm:leading-6 font-normal text-[#9fa6b6]">
                NO PURCHASE NECESSARY — Experience a new, evolved way to play
                slot games with Playvium’s exciting social casino
                Sweepstakes-style games.
              </p>

              {/* Mobile short text */}
              <p className="md:hidden text-[13.5px] leading-5 font-normal text-[#9fa6b6]">
                NO PURCHASE NECESSARY — Experience a new, evolved way to play
                slot games with Playvium’s exciting social casino
                Sweepstakes-style games.
              </p>

              {/* Show more button - mobile only */}
              {/* <Link
                href="/about"
                className="md:hidden inline-flex items-center gap-2 px-4 py-2 w-32 bg-[#384252] border border-[#5B6B86] text-white text-[14px] rounded-lg hover:bg-[#253041] transition"
              >
                Show more
                <span className="text-lg">›</span>
              </Link> */}
            </div>

            {/* RIGHT SIDE - LANGUAGE */}
            <div className="flex flex-row md:flex-col gap-10 md:gap-3 md:pr-5 items-center md:items-end  w-full">

              <div className="flex items-center gap-2">
                <Image
                  height={20}
                  width={20}
                  src={globe}
                  alt="Language"
                  className="w-5 h-5"
                />
                <span className="text-[18px] md:text-[16px] leading-8 text-white font-medium">
                  Language
                </span>
              </div>

              <div ref={ref} className="relative w-full md:w-[150px] select-none">
                {/* SELECT BUTTON */}
                <button
                  type="button"
                  onClick={() => setOpen((p) => !p)}
                  className="w-full bg-[#242B35] md:bg-[#15181E] text-white px-3 py-3 md:py-2.5 pr-10
                              rounded-md border border-[#2a2e38]
                              hover:border-[#3a3e48]
                              flex items-center justify-between
                              focus:outline-none"
                >
                  <span className="text-[15px] md:text-[16px]">
                    {selected.label}
                  </span>

                  {/* ARROW */}
                  <span
                    className={`absolute right-3 top-1/2 -translate-y-1/2
                                  transition-transform duration-200
                                  ${open ? "rotate-180" : ""}`}
                  >
                    <Image
                      src={footerlangicon}
                      alt="arrow"
                      width={12}
                      height={12}
                    />
                  </span>
                </button>

                {/* DROPDOWN */}
                {open && (
                  <ul
                    className="absolute z-50  w-full bg-[#15181E]
                     border border-[#2a2e38] rounded-md
                     shadow-lg overflow-hidden"
                  >
                    {options.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleSelect(option)}
                        className={`px-3 py-2 text-sm cursor-pointer
                          hover:bg-[#232833]
                          ${
                            selected.value === option.value
                              ? "bg-[#232833] text-white"
                              : "text-gray-300"
                          }`}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 w-full pb-8 lg:pb-4 mb-8 lg:mb-0 border-b md:border-0 border-[#2a2e38]">
            {/* Playvium */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[10px] md:text-[12px] text-white font-medium mb-1">
                Playvium
              </h3>

              {/* Item with Coming Soon */}
              <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                <span className="text-[8px] md:text-[14px] opacity-60">
                  • Tournaments
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>

              {/* Item with Coming Soon */}
              <div className="flex items-center justify-start text-[#9fa6b6]  cursor-not-allowed">
                <span className="text-[8px] md:text-[14px] opacity-60">
                  • Affiliates
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>

              {/* Item with Coming Soon */}
              <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                <span className="text-[8px] md:text-[14px] opacity-60">
                  • Promotions
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>

              {/* Item with Coming Soon */}
              <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                <span className="text-[8px] md:text-[12px] opacity-60">
                  • Loyalty Program
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-0.5 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Support/Legal */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[10px] md:text-[12px] text-white font-medium mb-1">
                Support/Legal
              </h3>
              <Link
                href="#"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • Help center
              </Link>

              <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                <span className="text-[8px] md:text-[14px] opacity-60">
                  • Fairness
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>
              <Link
                href="#"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • FAQ
              </Link>
              <Link
                href="/privacy-policy"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • Terms Of Service
              </Link>
              <Link
                href="/landing/responsible-gaming"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • Responsible Gaming
              </Link>
              <Link
                href="#"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • Live Support
              </Link>
            </div>

            {/* Originals */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[10px] md:text-[12px] text-white font-medium mb-1">
                Originalsfdfdh
              </h3>

              <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                <span className="text-[8px] md:text-[14px] opacity-60">
                  • Slots
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>

              <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                <span className="text-[8px] md:text-[14px] opacity-60">
                  • Live Casino
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>

              <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                <span className="text-[8px] md:text-[14px] opacity-60">
                  • Table Games
                </span>
                <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[7px] md:text-[10px] font-medium text-white">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* About Us */}
            <div className=" flex flex-col md:hidden lg:flex gap-2.5">
              <h3 className="text-[10px] md:text-[12px] text-white font-medium mb-1">
                About Us
              </h3>
              {/* <Link
                href="/blog-posts"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • Blog Posts
              </Link> */}
              <Link
                href="/privacy-policy-new"
                className="text-[8px] md:text-[14px] text-[#ffffff] hover:text-white transition-colors"
              >
                • Support
              </Link>
            </div>

            {/* Join Our Community */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[10px] md:text-[12px]  text-white font-medium mb-1">
                Join Our Community
              </h3>

              <div className="grid grid-cols-4 md:grid-cols-4 md:gap-2">
                {socialMediaLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9  flex items-center justify-center rounded-lg bg-[#14161b] hover:bg-[#3a3e48] transition-colors"
                  >
                    {/* NORMALIZED ICON WRAPPER */}
                    <div
                      className={`flex items-center justify-center 
        ${social.img === sm7 ? "w-6 h-6" : "w-7 h-7"}`}
                    >
                      <Image
                        src={social.img}
                        alt={social.alt}
                        width={25}
                        height={25}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Accordion Section */}
          <div className="flex flex-col gap-0 w-full md:hidden mb-6">
            {/* ================= PLAYVIUM ================= */}
            <div className="border-b border-[#2a2e38]">
              <input
                type="checkbox"
                id="accordion-playvium"
                className="peer hidden"
              />

              <label
                htmlFor="accordion-playvium"
                className="flex justify-between items-center cursor-pointer py-4"
              >
                <span className="text-white text-[15px] sm:text-[16px] font-medium">
                  Playvium
                </span>
                <svg
                  className="w-5 h-5 text-[#9fa6b6] peer-checked:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>

              <div className="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all duration-300">
                <div className="flex flex-col gap-2.5 pb-4 pl-4">
                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">
                      • Tournaments
                    </span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">• Promotions</span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">
                      • Loyalty Program
                    </span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">• Affiliates</span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= PROMO ================= */}
            <div className="border-b border-[#2a2e38]">
              <input
                type="checkbox"
                id="accordion-promo"
                className="peer hidden"
              />

              <label
                htmlFor="accordion-promo"
                className="flex justify-between items-center cursor-pointer py-4"
              >
                <span className="text-white text-[15px] sm:text-[16px] font-medium">
                  Promo
                </span>
                <svg
                  className="w-5 h-5 text-[#9fa6b6] peer-checked:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>

              <div className="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all duration-300">
                <div className="flex flex-col gap-2.5 pb-4 pl-4">
                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">
                      • Welcome Bonus
                    </span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">
                      • Daily Rewards
                    </span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>

                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">
                      • VIP Program
                    </span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= SUPPORT / LEGAL ================= */}
            <div className="border-b border-[#2a2e38]">
              <input
                type="checkbox"
                id="accordion-support"
                className="peer hidden"
              />

              <label
                htmlFor="accordion-support"
                className="flex justify-between items-center cursor-pointer py-4"
              >
                <span className="text-white text-[15px] sm:text-[16px] font-medium">
                  Support / Legal
                </span>
                <svg
                  className="w-5 h-5 text-[#9fa6b6] peer-checked:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>

              <div className="max-h-0 overflow-hidden peer-checked:max-h-96 transition-all duration-300">
                <div className="flex flex-col gap-2.5 pb-4 pl-4">
                  <Link
                    href="#"
                    className="text-[14px] text-[#ccd2e0] hover:text-white"
                  >
                    • Help Center
                  </Link>

                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">• Fairness</span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>

                  <Link
                    href="#"
                    className="text-[14px] text-[#ccd2e0] hover:text-white"
                  >
                    • FAQ
                  </Link>

                  <Link
                    href="#"
                    className="text-[14px] text-[#ccd2e0] hover:text-white"
                  >
                    • Privacy Policy
                  </Link>

                  <Link
                    href="#"
                    className="text-[14px] text-[#ccd2e0] hover:text-white"
                  >
                    • Terms Of Service
                  </Link>

                  <div className="flex items-center justify-start text-[#9fa6b6] cursor-not-allowed">
                    <span className="text-[14px] opacity-60">
                      • Live Support
                    </span>
                    <span className="ml-2 rounded-xs bg-[#22C55E] px-1 py-[2px] text-[10px] font-medium text-white">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Our Community - Mobile */}
          <div className="flex flex-col gap-4 w-full md:hidden mb-6">
            <h3 className="text-[15px] sm:text-[16px] text-white font-medium">
              Join Our Community
            </h3>

            <div className="grid grid-cols-8 gap-2">
              {socialMediaLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full aspect-square flex items-center justify-center rounded-lg bg-[#2a2e38] hover:bg-[#3a3e48] transition-colors"
                >
                  {/* NORMALIZE ICON WRAPPER */}
                  <div
                    className={`flex items-center justify-center
        ${social.img === sm7 ? "w-5 h-5" : "w-7 h-7"}`}
                  >
                    <Image
                      src={social.img}
                      alt={social.alt}
                      width={20}
                      height={20}
                      className="object-contain w-full h-full filter brightness-0 invert opacity-70"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Legal Text */}
          <div className="w-full px-4 md:px-0 pt-6 md:pt-10">
            <div className="max-w-6xl mx-auto text-center">
              {/* Main Disclaimer Text */}
              <p className="text-[11px] sm:text-[11px] md:text-[12px] leading-5 sm:leading-6 text-[#9fa6b6] mb-3">
                © {new Date().getFullYear()} Playvium | All Rights Reserved.
              </p>

              <p className="text-[11px] sm:text-[11px] md:text-[12px] leading-5 sm:leading-6 text-[#9fa6b6] mb-3">
                Playvium is owned and operated by Triple8 Games, registration
                number &lt;&gt;, with its registered address at &lt;&gt;.
              </p>

              <p className="text-[11px] sm:text-[11px] md:text-[12px] leading-5 sm:leading-6 text-[#9fa6b6] mb-3">
                For support, contact us at{" "}
                <span className="text-[#ffffff]">support@playvium.com</span>.
                | For press inquiries, please contact{" "}
                <span className="text-[#ffffff]">press@playvium.com</span>.
              </p>

              <p className="text-[11px] sm:text-[11px] md:text-[12px] leading-5 sm:leading-6 text-[#9fa6b6] mb-3 uppercase">
                <span className="text-[#ffffff]">No Purchase Necessary </span>{" "}
                to enter the Sweepstakes. Sweepstakes are void where prohibited
                by law. <br />
                For complete details, please refer to our{" "}
                <span className="text-[#ffffff]">Terms of Service</span>.
              </p>

              <p className="text-[11px] sm:text-[11px] md:text-[12px] leading-5 sm:leading-6 text-[#9fa6b6] mb-6">
                Playvium is committed to responsible social play.
              </p>

              {/* Icon */}
              <div className="flex justify-center pb-6">
                <Image
                  src={plus}
                  alt="18+"
                  className="w-14 md:w-18 h-14 md:h-18 opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
