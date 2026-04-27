"use client";
import { useRouter } from "next/navigation";
import DepositCarousel from "./deposit-carousel";
import { useAuthStore } from "@/store/auth-store";
import { useAuthModal } from "@/store/auth-modal-store";

export default function HeroSection() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore((state) => state);
  const { openModal: openAuthModal } = useAuthModal();

  if (isLoading) return null;

  return (
    <section
      className="
        mt-14 md:mt-15
        lg:pl-8
        sm:py-6 md:py-6 lg:py-8
        bg-[#2C3034]
        md:bg-[#10141a]
        rounded-2xl
      "
    >
      <div>
        <div className="flex gap-1 sm:gap-4 md:gap-12 items-center">
          {/* LEFT CONTENT (AUTH-BASED) */}
          <div className="w-[60%] py-4 lg:w-5/12 space-y-2 sm:space-y-3 md:space-y-2 pl-2 sm:pl-2 md:pl-4">
            {/* TITLE */}
            <h1
              className="
    text-[#F2F2F2]
    font-averta-black
    text-[14px] sm:text-[24px] lg:text-[28px]
    font-bold
    leading-[20px] lg:leading-[40px]
    text-balance
  "
            >


              {isAuthenticated === "authenticated"
                ? "Great Deposit Bonus in Playvium and Sports"
                : "Unlock Exclusive Bonuses & Promotions"}
            </h1>


            {/* DESCRIPTION */}
            <p className="text-sm md:text-lg font-normal mb-3">
              {isAuthenticated === "authenticated" ? (
                <>
                  Up to
                  <span className="md:font-bold">
                    <span className="text-[#B93DEB]"> 100% + </span>
                    400FS/ 20FB
                  </span>
                </>
              ) : (
                <>
                  Sign up now and get
                  <span className="lg:font-bold">
                    <span className="text-[#B93DEB]"> 100% Bonus </span>+ Free
                    Spins & Bets
                  </span>
                </>
              )}
            </p>
            {/* CTA BUTTON */}
            {isAuthenticated === "authenticated" ? (
              <button
                onClick={() => router.push("/profile?tab=buy")}
                className="
      cursor-pointer
      px-8 py-1.5
      sm:px-4 sm:py-2
      md:px-8 md:py-3
      text-xs sm:text-sm md:text-lg
      lg:font-medium
      w-fit
      rounded-md md:rounded-lg
      bg-transparent
      text-white
      border-2 border-[#384252]
      
      hover:border-[#B93DEB]
      transition-all
      duration-300
      ease-in-out
    "
              >
                Deposit Now
              </button>
            ) : (
              <button
                onClick={() => openAuthModal("register")}
                className="
      mt-3
      md:mt-3
      inline-flex
      items-center
      justify-center
      rounded-sm
      md:rounded-lg
      bg-[#b34ae9]
      px-8
      md:px-22
      py-1.5
      md:py-2.5
      text-white
      font-medium
      md:font-semibold
      transition
      hover:brightness-110
      active:scale-[0.98]
    "
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Right side - decorative */}
          <div
            className="w-[40%] lg:w-7/12 h-full sm:h-40 md:h-52 lg:h-64 rounded-lg"
            style={{ alignItems: "center" }}
          >
            <DepositCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
