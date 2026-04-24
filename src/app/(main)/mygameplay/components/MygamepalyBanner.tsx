import { remote } from "@/assets/images/mygameplay";
import Image from "next/image";

export default function MygameplayBanner() {
  return (
    <div className="relative w-full h-40 sm:h-40 md:h-48 bg-[#181D25] rounded-xl sm:rounded-2xl flex items-center ">
      <h1 className="absolute bottom-5 left-5 md:left-10 text-white font-semibold text-lg sm:text-xl md:text-2xl z-10">
        My Game Play
      </h1>
      <div className="absolute right-6 top-0 bottom-0 flex items-center">
        <Image
          src={remote}
          alt="Star"
          className="md:h-[80%] w-auto object-cover mt-10 animate-pulse pointer-events-none  select-none"
        />
      </div>
    </div>
  );
}
