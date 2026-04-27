"use client";

import Image from "next/image";
import { faqbanner } from "@/assets/images/faq";
import { faqs } from "@/data/faqdata";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto mt-[60px] md:mt-[66px] px-4 md:px-10 py-6">
        {/* Banner */}
        <div className="relative w-full h-36 md:h-48 bg-[#06162D] rounded-xl flex items-center">
          <h1 className="absolute bottom-5 left-5 md:left-10 text-white font-semibold text-md sm:text-xl md:text-2xl z-10">
            Frequently Asked Questions
          </h1>

          <div className="absolute right-6 top-0 bottom-0 flex items-center">
            <Image
              src={faqbanner}
              alt="FAQ Banner"
              className="h-[90%] mt-5 w-auto object-cover animate-pulse pointer-events-none select-none"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="w-full rounded-xl mt-5 bg-[#11131800] border border-white/5 shadow-lg overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/5 last:border-none">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-left bg-[#06162D] hover:bg-[#0e233f] transition"
              >
                <span className="text-white text-sm md:text-[15px] font-medium">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`w-7 h-7 p-1 text-white/60 bg-[#0C2851] rounded-lg transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 md:px-6 py-5 text-white/70 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
