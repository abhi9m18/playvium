import Image from "next/image";
import { stars } from "@/assets/images/favorites";

export default function FavoritesBanner() {
  return (
    <div className="relative w-full md:mt-15 h-40 sm:h-40 md:h-48 bg-[#181D25] rounded-xl sm:rounded-2xl flex items-center ">
      <h1 className="absolute bottom-5 left-5 md:left-10 text-white font-[Inter] font-semibold text-xl sm:text-xl md:text-2xl z-10">
        Favorites
      </h1>
      <div className="absolute right-0 top-0 bottom-0 flex items-center">
        <Image
          src={stars}
          alt="Star"
          className="md:h-full w-auto object-cover animate-pulse pointer-events-none  select-none"
        />
      </div>
    </div>
  );
}