"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    onTelegramAuth?: (user: any) => void;
  }
}

export default function TelegramSDKLoader() {
  useEffect(() => {
    // Telegram widget callback
    window.onTelegramAuth = function (user: any) {
      window.dispatchEvent(new CustomEvent("telegram-auth", { detail: user }));
    };

    // Listen for postMessage from Telegram iframe
    const listener = (event: MessageEvent) => {
      if (event.origin.includes("oauth.telegram.org")) {
        if (event.data?.hash) {
          window.onTelegramAuth?.(event.data);
        }
      }
    };

    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
      delete window.onTelegramAuth;
    };
  }, []);

  return null;
}
