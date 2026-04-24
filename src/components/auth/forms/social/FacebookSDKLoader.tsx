"use client";

import { useEffect } from "react";

export default function FacebookSDKLoader() {
  useEffect(() => {
    // Prevent double-loading on navigation
    if (window.fbReady) return;

    window.fbReady = false;
    window.fbReadyCallbacks = [];

    // fbAsyncInit MUST always be a function (not undefined)
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: "v19.0",
      });

      window.fbReady = true;

      // Run all queued callbacks
      window.fbReadyCallbacks?.forEach((cb) => cb());
    };

    // Load the script
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
