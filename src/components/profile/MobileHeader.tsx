"use client";

import Image from "next/image";
import { back_arrow } from "@/assets/icons";

type MobileHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function MobileHeader({ title, onBack }: MobileHeaderProps) {
  return (
    <div className="flex items-center gap-4 md:hidden mb-3">
      <button
        onClick={onBack}
        className="p-1 rounded-md hover:opacity-90 active:scale-95"
        aria-label="Go back"
      >
        <Image
          src={back_arrow}
          alt="back"
          width={30}
          height={30}
          className=" text-white bg-gray-800 p-1 rounded-sm"
        />
      </button>

      <p className="text-white text-lg font-bold">{"Back"}</p>
    </div>
  );
}
