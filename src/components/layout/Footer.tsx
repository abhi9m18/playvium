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
  { href: "https://discord.gg/Auhcq9T7", img: sm6, alt: "Discord" },
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

export default function Footer(props: FooterProps) {
  const { setIsRecommendedWalletsModalActive, setFooterContentModal } = props;
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const newLocale = e.target.value
    // router.replace(pathname, { locale: newLocale })
  };

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

      <div className="flex flex-col mt-0 items-center w-full bg-[#191A1A] md:bg-[#191D24] text-[#B3BEC1] font-[Inter]">
        {/* Container with max-width and padding */}
        <div className="w-full max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-10 md:py-12 lg:py-10">
          {/* Top Section - Logo and Language */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 mb-8 md:mb-10">
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-3 md:gap-4 max-w-full md:max-w-[600px] w-full">
              <Link href={"/"} shallow={true} className="inline-block">
                <Image
                  height={100}
                  width={100}
                  src={logo}
                  alt="Wulf Casino Logo"
                  className="w-32 sm:w-36 md:w-40 lg:w-44 h-auto"
                />
              </Link>

              {/* Desktop text */}
              <p className="hidden md:block text-[13px] sm:text-[14px] md:text-[15px] leading-5 sm:leading-6 font-normal text-[#9fa6b6]">
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulpu tate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis.
              </p>

              {/* Mobile short text */}
              <p className="md:hidden text-[13.5px] leading-5 font-normal text-[#9fa6b6]">
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulpu tate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis. <br />
                <br />
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulpu tate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>

              {/* Show more button - mobile only */}
              <Link
                href="/about"
                className="md:hidden inline-flex items-center gap-2 px-4 py-2 w-32 bg-[#384252] border border-[#5B6B86] text-white text-[14px] rounded-lg hover:bg-[#253041] transition"
              >
                Show more
                <span className="text-lg">›</span>
              </Link>
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

          {/* Provider Logos Scroll - Desktop */}
          <div className="hidden md:block relative overflow-hidden w-full mb-10 lg:mb-12">
            <div className="flex items-center gap-8 lg:gap-10 animate-provider-scroll whitespace-nowrap">
              {providers.map((provider, index) => (
                <div
                  key={index}
                  className="h-8 md:h-9 lg:h-10 flex items-center justify-center shrink-0 filter brightness-0 invert opacity-60"
                >
                  {provider.svg}
                </div>
              ))}
              {providers.map((provider, index) => (
                <div
                  key={`clone-${index}`}
                  className="h-8 md:h-9 lg:h-10 flex items-center justify-center shrink-0 filter brightness-0 invert opacity-60"
                >
                  {provider.svg}
                </div>
              ))}
            </div>
          </div>

          {/* Help us improve section - Mobile only */}
          <div className="w-full  rounded-xl  mb-6 md:hidden shadow-sm border-0 border-[#2b2f3c]">
            <h3 className="text-white text-[18px] font-semibold mb-1">
              Help us improve your experience
            </h3>

            <p className="text-[#9fa6b6] text-[14px] mb-4">
              Get rewarded for your valuable feedback!
            </p>

            {/* Textarea box */}
            <textarea
              placeholder="Write your message here..."
              className="
      w-full h-32 bg-[#1a1e27] 
      rounded-lg border border-[#2e3441] 
      px-4 py-3 text-white text-sm
      focus:outline-none focus:border-[#a855f7]
      placeholder:text-[#5f6678]
    "
            />

            {/* Button + Email */}
            <div className="flex flex-col items-start gap-4 mt-5">
              <button
                className="
      bg-[#a855f7] 
      hover:bg-[#9333ea] 
      text-white px-5 py-3 rounded-md 
      text-[14px] font-medium 
      transition-all w-full
    "
              >
                Leave a message
              </button>

              <p className="text-[#9fa6b6] text-[13px]">
                Or email us:{" "}
                <a
                  href="mailto:feedback@Wulfcasinogame.com"
                  className="text-[#af63f7] hover:underline"
                >
                  feedback@Wulfcasinogame.com
                </a>
              </p>
            </div>
          </div>

          {/* Awards + Certifications - Mobile Only */}
          <div className="w-full mb-6 md:hidden">
            {/* <div className="grid grid-cols-4 gap-2 mb-6">
              {awardBadges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-[#25293a] rounded-md flex items-center justify-center border border-[#2a2e38]"
                >
                  <img
                    src={badge.image.src}
                    alt={`award-${index}`}
                    className="h-full object-fit"
                  />
                </div>
              ))}
            </div> */}

            <div className="w-full md:hidden mb-6">
              <div className="flex flex-wrap justify-center items-center gap-4">
                {certificationLogos.map((cert, index) => (
                  <img
                    key={index}
                    src={cert.image.src}
                    alt={`cert-${index}`}
                    className="h-4 sm:h-6 object-contain"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Footer Links Grid */}
          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 w-full pb-8 lg:pb-10 mb-8 lg:mb-0 border-b md:border-0 border-[#2a2e38]">
            {/* Wulf Casino */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[15px] md:text-[16px] text-white font-medium mb-1">
                Wulf Casino
              </h3>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Tournaments
              </Link>
              {/* <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Sportsbook
              </Link> */}
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Promotions
              </Link>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Loyalty Program
              </Link>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsRecommendedWalletsModalActive(true);
                }}
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Affiliates
              </Link>
            </div>

            {/* Support/Legal */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[15px] md:text-[16px] text-white font-medium mb-1">
                Support/Legal
              </h3>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Help center
              </Link>
              <Link
                href="/support"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Fairness
              </Link>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • FAQ
              </Link>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Terms Of Service
              </Link>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Live Support
              </Link>
            </div>

            {/* Originals */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[15px] md:text-[16px] text-white font-medium mb-1">
                Originals
              </h3>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Slots
              </Link>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Live Casino
              </Link>
              <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Table Games
              </Link>
              {/* <Link
                href="#"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Web 3 Games
              </Link> */}
            </div>

            {/* About Us */}
            <div className=" flex flex-col md:hidden lg:flex gap-2.5">
              <h3 className="text-[15px] md:text-[16px] text-white font-medium mb-1">
                About Us
              </h3>
              {/* <Link
                href="/blog-posts"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Blog Posts
              </Link> */}
              <Link
                href="/privacy-policy-new"
                className="text-[13px] md:text-[14px] text-[#9fa6b6] hover:text-white transition-colors"
              >
                • Support
              </Link>
            </div>

            {/* Join Our Community */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[15px] md:text-[16px]  text-white font-medium mb-1">
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
            {/* Wulfcasino Accordion */}
            <div className="border-b border-[#2a2e38]">
              <input
                type="checkbox"
                id="accordion-wulfcasino"
                className="peer hidden"
              />
              <label
                htmlFor="accordion-wulfcasino"
                className="flex justify-between items-center cursor-pointer py-4"
              >
                <span className="text-white text-[15px] sm:text-[16px] font-medium">
                  Wulfcasino
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
                <div className="flex flex-col gap-2.5 pb-4">
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Tournaments
                  </Link>
                  {/* <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Sportsbook
                  </Link> */}
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRecommendedWalletsModalActive(true);
                    }}
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Affiliates
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Promotions
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Loyalty Program
                  </Link>
                </div>
              </div>
            </div>

            {/* Promo Accordion */}
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
                  Originals
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
                <div className="flex flex-col gap-2.5 pb-4">
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Welcome Bonus
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Daily Rewards
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • VIP Program
                  </Link>
                </div>
              </div>
            </div>

            {/* Support/Legal Accordion */}
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
                  Support/Legal
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
                <div className="flex flex-col gap-2.5 pb-4">
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Help center
                  </Link>
                  <Link
                    href="/announcement"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Important Announcement
                  </Link>
                  <Link
                    href="/announcement"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Gamble Aware
                  </Link>
                  <Link
                    href="/support"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Fairness
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • FAQ
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Terms Of Service
                  </Link>
                  <Link
                    href="#"
                    className="text-[14px] ml-4 sm:text-[14px] text-[#ccd2e0] hover:text-white transition-colors"
                  >
                    • Live Support
                  </Link>
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
          <div className="w-full pt-6 md:pt-8 border-0 border-[#333741] px-0">
            {/* ---------------- MOBILE VERSION ---------------- */}
            <div className="md:hidden">
              {/* About / Description */}
              <p className="text-[12px] text-[#9fa6b6] leading-5 mb-6 border-0 border-[#384252] ">
                A multi-award winning Wulfcasino. With a player-centric
                approach, Win Win is able to satisfy millions of gamblers across
                the globe. Wulf Casino has its priority set on its community,
                ensuring an everlasting and endlessly entertaining gambling
                experience.
              </p>

              {/* Terms Notice */}
              <p className="text-[12px] text-[#9fa6b6] leading-5 mb-6">
                Your use of and access to Wulf Casino signifies that you fully
                understand and agree to be legally bound by the contents of our
                Terms of Service and Responsible Gaming Policy.
              </p>

              {/* Trading Notice */}
              <p className="text-[12px] text-[#9fa6b6] leading-5 mb-6">
                Trading is not gambling by definition, therefore it is not
                covered by our gaming license.
              </p>

              {/* GCB Badge (real image) */}
              <div className="mb-6 flex justify-start">
                <Image
                  src={gcb}
                  alt="GCB"
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Ownership Information */}
              <p className="text-[12px] text-[#9fa6b6] leading-5 mb-6">
                As of 30th April 2024, Small House B.V has taken over the
                operations of the Wulf Casino website brand previously owned by
                Blockdance B.V. All relationships entered into with players
                until 30 April 2024 remain with Blockdance B.V. All new
                relationships with players as from 30 April 2024 are formed with
                Small House B.V. All payment services related to Small House
                B.V. are processed by Fenice Tech Limited (HE410655), located at
                Griva Digeni, 81 Marinos Court, 3rd Floor, Flat/Office 301, 6043
                Larnaka, Republic of Cyprus. Small House B.V., is licensed and
                regulated by the Gaming Control Board (GCB) with License Number:
                OGL/2023/118/0060 issued on 22nd February 2024. Trust Service
                and Represented by
                <span className="text-[#9fa6b6]"> https://igagroup.com</span>
              </p>

              {/* Copyright */}
              <p className="text-[11px] text-[#adb5c9] text-center pt-6 pb-2 md:pb-0 border-t border-[#2a2e38]">
                Copyright ©{new Date().getFullYear()} Wolf Casino. ALL RIGHTS
                RESERVED.
              </p>
            </div>

            {/* ---------------- DESKTOP VERSION (UNCHANGED) ---------------- */}
            <div className="hidden md:block">
              {/* First Disclaimer */}
              <p className="text-[12px] sm:text-[13px] md:text-[16px] border-y border-[#384252] px-5 py-8 leading-5 sm:leading-6 text-[#9fa6b6] mb-4">
                Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit Dorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis.
              </p>

              {/* Copyright */}
              <p className="text-[11px] sm:text-[12px] md:text-[14px] pb-20 md:pb-0 text-[#adb5c9] text-center pt-6 border-t md:border-0 border-[#2a2e38]">
                Copyright ©{new Date().getFullYear()} Wulf Casino. ALL RIGHTS
                RESERVED.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
