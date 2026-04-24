"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  telegramIcon: string;
}

export default function TelegramAuthBtn({ telegramIcon }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonReadyRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;

    script.setAttribute(
      "data-telegram-login",
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || ""
    );
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-auth-url", "javascript:void(0)");
    script.setAttribute("data-onauth", "window.onTelegramAuth(user)");

    containerRef.current.appendChild(script);

    // Watch for the button to be added to the DOM
    const observer = new MutationObserver(() => {
      const button = containerRef.current?.querySelector("button");
      if (button) {
        buttonReadyRef.current = true;
        observer.disconnect();
      }
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const triggerTelegramLogin = () => {
    const container = containerRef.current;
    if (!container) return;

    const innerButton = container.querySelector("button");

    if (innerButton) {
      innerButton.click();
    } else {
      console.log("Widget still loading, please try again");
    }
  };

  return (
    <div
      onClick={triggerTelegramLogin}
      className="w-11 h-11 bg-[#15181E] rounded-lg outline-1 outline-gray-700/20 flex items-center justify-center cursor-pointer relative overflow-hidden"
    >
      <Image
        src={telegramIcon}
        alt="Telegram"
        width={20}
        height={20}
        className="z-10 pointer-events-none"
      />

      <div
        id="telegram_login_container"
        ref={containerRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
      />
    </div>
  );
}