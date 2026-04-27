'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {faqs} from "@/data/faqdata"

export default function FAQComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full mt-6 p-3 md:px-10  ">
      {/* Heading */}
      <h2 className="text-white ml-2 text-xl md:text-2xl  mb-3">
        Frequently Asked Questions
      </h2>

      <p className="text-white/70 ml-2 text-sm text-[13px] md:text-base mb-5">
        Corem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      {/* FAQ CARD WRAPPER */}
      <div className="w-full rounded-xl  bg-[#11131800] border border-white/5 shadow-lg overflow-hidden">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-white/5 last:border-none"
          >
            {/* Toggle Button */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-left bg-[#06162D] hover:bg-[#0e233f] transition"
            >
              <span className="text-white text-sm md:text-[15px] font-medium">
                {faq.question}
              </span>

              <ChevronDown
                className={`w-7 h-7 p-1 text-white/60 bg-[#0C2851] rounded-lg transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''} `}
              />
            </button>

            {/* Answer */}
            <div
              className={`transition-all duration-500 overflow-hidden ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'  }`}
            >
              <div className="px-4 py-5 md:px-6 pb-4 text-white/70 text-sm leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
