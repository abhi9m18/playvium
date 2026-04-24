"use client";

import { GoogleLogin, GoogleLoginProps } from "@react-oauth/google";
import Image from "next/image";
import { useRef } from "react";
interface Props {
  googleAuth: (token: string) => void;
  closeModal: () => void;
  googleIcon: string; // path to your icon
}

export default function GoogleAuthBtn({ googleAuth, closeModal, googleIcon }: Props) {
  const googleBtnRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    googleBtnRef.current?.querySelector("div")?.click();
  };

  return (
    <div
      className="w-11 h-11 bg-[#15181E] rounded-lg outline-1 outline-gray-700/20 flex items-center justify-center relative overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Your custom Google icon */}
      <Image
        src={googleIcon}
        alt="Google"
        width={20}
        height={20}
        className="z-10 pointer-events-none"
      />

      {/* Invisible Google login */}
      <div className="absolute inset-0 opacity-0" ref={googleBtnRef}>
        <GoogleLogin
          onSuccess={(cred) => {
            if (!cred.credential) return;
            googleAuth(cred.credential);
            closeModal();
          }}
          onError={() => console.error("Google login failed")}
        />
      </div>
    </div>
  );
}
