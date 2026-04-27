"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { facebook, google, telegram, twitter, whatsapp } from "@/assets/icons";
import { useAuthStore } from "@/store/auth-store";
import { useAuthModal } from "@/store/auth-modal-store";

export default function SocialLogin() {
  const { googleAuth, facebookAuth, telegramAuth } = useAuthStore();
  const { closeModal } = useAuthModal();

  const clientRef = useRef<any>(null);

  useEffect(() => {
    if (!window.google) return;
    
    // Skip Google auth initialization if client_id is not set
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      console.warn("Google Client ID not configured");
      return;
    }

    clientRef.current = window.google.accounts.oauth2.initCodeClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      ux_mode: "popup", // OPEN GOOGLE POPUP WINDOW
      callback: async (response: any) => {
        if (!response.code) {
          toast.error("Google login failed");
          return;
        }

        // Send authorization code to backend
        await googleAuth(response.code);
        closeModal();
      },
    });
  }, []);

  const triggerLogin = () => {
    if (!clientRef.current) {
      toast.error("Google Login not ready");
      return;
    }
    clientRef.current.requestCode(); // <-- THIS OPENS GOOGLE POPUP
  };

  // -------------------------------
  // Global Telegram callback
  // -------------------------------
  if (typeof window !== "undefined") {
    (window as any).onTelegramAuth = function (user: any) {
      window.dispatchEvent(new CustomEvent("telegram-auth", { detail: user }));
    };
  }

  const handleFacebookLogin = () => {
    // If SDK not ready, queue the callback safely
    if (!(window as any).fbReady) {
      if (!(window as any).fbReadyCallbacks) {
        (window as any).fbReadyCallbacks = [];
      }
      (window as any).fbReadyCallbacks.push(() => handleFacebookLogin());

      return;
    }

    // SDK is ready
    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          facebookAuth(accessToken);
          closeModal();
        } else {
          toast.error("Facebook login cancelled");
        }
      },
      { scope: "email,public_profile" }
    );
  };

  // -----------------------------------------
  // Telegram Auth Listener → Calls Zustand Store
  // -----------------------------------------
  useEffect(() => {
    const handler = async (event: any) => {
      const user = event.detail;

      const result = await telegramAuth(user);

      if (result.success) {
        closeModal();
        window.location.href = "/";
      }
    };

    window.addEventListener("telegram-auth", handler);

    return () => {
      window.removeEventListener("telegram-auth", handler);
    };
  }, []);

  // -----------------------------------------
  // Telegram Widget Loader
  // -----------------------------------------
  useEffect(() => {
    const container = document.getElementById("telegram_login_container");
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;

    script.setAttribute(
      "data-telegram-login",
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || ""
    );
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-request-access", "write");

    script.setAttribute("data-auth-url", "javascript:void(0)");
    script.setAttribute("data-onauth", "window.onTelegramAuth(user)");

    // Hide default widget
    Object.assign(script.style, {
      position: "absolute",
      top: "0",
      left: "0",
      opacity: "0",
      width: "100%",
      height: "100%",
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex-row ">
      <p className="text-center mb-4 text-gray-300 flex items-center gap-4">
        <span className="flex-1 h-px bg-gray-700"></span>
        Log in directly with
        <span className="flex-1 h-px bg-gray-700"></span>
      </p>

      <div className="flex items-center justify-center gap-2">
        {/* Google */}
        <div
          onClick={triggerLogin}
          className="w-11 h-11 bg-[#15181E] rounded-lg outline outline-gray-700/20 flex items-center justify-center cursor-pointer"
        >
          <Image src={google} alt="Google" width={20} height={20} />
        </div>

        {/* Facebook */}
        <div className="w-11 h-11 bg-[#15181E] rounded-lg outline-1 outline-gray-700/20 flex items-center justify-center relative overflow-hidden">
          <Image
            src={facebook}
            alt="Facebook"
            width={20}
            height={20}
            className="z-10 pointer-events-none"
          />

          <div
            className="absolute inset-0 opacity-0 cursor-pointer"
            onClick={handleFacebookLogin}
          />
        </div>

        {/* Telegram */}
        <div
          // id="telegram_login_container"
          className="w-11 h-11 bg-[#15181E] rounded-lg outline-1 outline-gray-700/20 flex items-center justify-center relative overflow-hidden cursor-pointer"
        >
          <Image src={telegram} alt="Telegram" width={20} height={20} />
        </div>

        {/* WhatsApp */}
        <div className="w-11 h-11 bg-[#15181E] rounded-lg outline-1 outline-gray-700/20 flex items-center justify-center">
          <Image src={whatsapp} alt="WhatsApp" width={20} height={20} />
        </div>

        {/* Twitter */}
        <div className="w-11 h-11 bg-[#15181E] rounded-lg outline-1 outline-gray-700/20 flex items-center justify-center">
          <Image src={twitter} alt="Twitter" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
