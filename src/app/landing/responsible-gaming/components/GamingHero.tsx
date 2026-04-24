import { responsiblegamingbanner } from "@/assets/landing";
import Image from "next/image";

export default function GamingHero() {
  return (
    <div className="relative h-[180px] md:h-[200px] w-full md:max-w-[1580px] mx-auto">
      <Image
        src={responsiblegamingbanner}
        alt="Responsible Gaming"
        fill
        priority
        className="
          object-cover
          object-[90%_center]
          md:object-center
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center">
        <div
          className="
            w-full
            px-4
            md:px-36
            flex
            justify-center
            md:justify-start
          "
        >
          <h1
            className="
              text-sm
              md:text-2xl
              pt-36
              md:pt-28
              font-bold
              uppercase
              text-center
              md:text-left
            "
          >
            Responsible Social Gaming
          </h1>
        </div>
      </div>
    </div>
  );
}
