"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuthModal } from "@/store/auth-modal-store";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import ForgotForm from "./forms/ForgotForm";
import VerifyOtpForm from "./forms/VerifyOtpForm";
import ResetPasswordForm from "./forms/ResetPasswordForm";
import Image from "next/image";
import DesktopWolf from "@/assets/images/auth/casino-wolf-desktop.svg";
import MobileWolf from "@/assets/images/auth/casino-wolf-mobile.svg";
import { useEffect, useRef } from "react";

const AUTH_TEXT: Record<
  string,
  { title: string; subtitle: string }
> = {
  login: {
    title: "Stay Untamed",
    subtitle: "Sign In & Get Welcome Bonus",
  },
  register: {
    title: "Stay Untamed",
    subtitle: "Sign Up & Get Welcome Bonus",
  },
  forgot: {
    title: "Stay Untamed",
    subtitle: "Recover Access to Your Account",
  },
  verify: {
    title: "Stay Untamed",
    subtitle: "Enter OTP to Continue",
  },
  reset: {
    title: "Stay Untamed",
    subtitle: "Create a New Secure Password",
  },
};

export default function AuthModal() {
  const { open, closeModal, view, payload } = useAuthModal();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { title, subtitle } = AUTH_TEXT[view] || AUTH_TEXT.login;


  // Reset scroll position when view changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [view]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent
        className="
          p-0 w-screen sm:w-[85vw]
          sm:max-w-[440px] md:max-w-[725px]
          bg-transparent text-white
          rounded-none md:rounded-[40px]
          overflow-hidden border-0 gap-0 shadow-lg
          h-screen md:h-[725px] z-9999
          max-h-screen md:max-h-[85vh]

          /* ---- MOBILE FULLSCREEN ---- */
          m-0! max-w-none!
          left-0! top-0! right-0!
          translate-x-0! translate-y-0!

          /* CLOSE BUTTON SHOULD SHOW ON MOBILE */
          [&>button]:flex

          /* ---- DESKTOP/TABLET (CENTERED) ---- */
          sm:[&>button]:flex
          sm:max-w-[440px]! md:max-w-[725px]!
          sm:left-1/2! sm:top-1/2!
          sm:translate-x-[-50%]! sm:translate-y-[-50%]!
          sm:right-auto!
          data-[state=open]:!m-0
        "
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{AUTH_TEXT[view].title}</DialogTitle>
        <div
          ref={scrollContainerRef}
          className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-hidden"
        >
          {/* LEFT SIDE IMAGE */}
          <div
            className="
            md:w-1/2 w-full relative 
            flex flex-col justify-end 
            p-4 sm:p-6 md:p-12 
            min-h-[280px] sm:min-h-[300px] md:min-h-0 
            md:h-full overflow-hidden shrink-0
            -mt-4 md:mt-0
          "
          >
            {/* Desktop + Tablet Image */}
            <Image
              src={DesktopWolf}
              alt="Casino Wolf"
              fill
              priority
              quality={100}
              className="absolute inset-0 bg-[#15181E] w-full h-full object-cover object-center hidden sm:block"
              sizes="(max-width: 480px) 0vw, (max-width: 1024px) 50vw, 440px"
            />
            {/* Mobile Image */}
            <Image
              src={MobileWolf}
              alt="Casino Wolf Mobile"
              fill
              priority
              quality={100}
              className="absolute inset-0 mt-3 bg-[#15181E] w-full h-full object-cover object-center sm:hidden"
              sizes="100vw"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#15181E]" />
            {/* Overlay Text */}
            <div className="hidden md:block relative z-10 text-white text-center">
              <h2 className="mx-4 text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 whitespace-nowrap">
                  {title}
              </h2>
              <p className="text-white font-bold text-xs sm:text-sm md:text-base">
                {subtitle}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div
            className="
              md:w-1/2 w-full 
              p-4 
              flex flex-col relative 
              rounded-none md:rounded-tr-[40px] md:rounded-br-[40px] 
              bg-[#15181E] backdrop-blur-xl 
              shrink-0 md:overflow-y-auto scrollbar-hide
              min-h-[calc(100vh-280px)] sm:min-h-[calc(100vh-300px)] md:min-h-0
            "
          >
            {view === "login" && <LoginForm />}
            {view === "register" && <RegisterForm />}
            {view === "forgot" && <ForgotForm />}
            {view === "verify" && <VerifyOtpForm />}
            {view === "reset" && <ResetPasswordForm />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
