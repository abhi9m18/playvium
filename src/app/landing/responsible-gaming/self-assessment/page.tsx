"use client";

import { useState } from "react";
import GamingContentWrapper from "../components/GamingContentWrapper";
import Image from "next/image";
import { responsiblegamingbanner } from "@/assets/landing";

export default function SelfAssessmentPage() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="bg-[#1c222b] rounded-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative h-[160px] md:h-[200px] w-full">
          <Image
            src={responsiblegamingbanner}
            alt="Self Assessment"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 md:py-8 space-y-4">
          <div className="border-b border-[#5B6B86] space-y-4 pb-5">
            <h2 className="text-xl md:text-2xl font-semibold">
              Your Gaming Habits
            </h2>

            <p className="text-gray-300">
              Try the NODS Self-Assessment, a brief 3-minute quiz with 10
              questions, designed to help you understand and reflect on your
              current gaming patterns.
            </p>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="mt-4 inline-flex items-center justify-center
              bg-[#b44cff] hover:bg-[#a23df0]
              text-white font-medium px-6 py-3 rounded-lg
              transition"
          >
            Start Self-Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <GamingContentWrapper>
      <h2 className="text-xl font-semibold mb-4">Self-Assessment</h2>

      <p className="mb-4">
        Answer the following questions honestly to better understand your gaming
        behaviour.
      </p>

      <ul className="list-decimal pl-5 space-y-3 text-gray-200">
        <li>Do you often spend more time gaming than intended?</li>
        <li>Have you tried to reduce gaming but found it difficult?</li>
        <li>Do you game to escape stress or negative feelings?</li>
        <li>Has gaming affected your sleep or daily routine?</li>
      </ul>
    </GamingContentWrapper>
  );
}
