"use client";

import LandingFooter from "../../components/LandingFooter";
import GamingContentWrapper from "../components/GamingContentWrapper";

export default function WulfSmartPage() {
  return (
    <>
    
    <GamingContentWrapper>
      <p className="mb-4">
        Playvium is committed to providing a safe environment for all its
        players. Gaming should always remain entertainment.
      </p>

      <ul className="list-disc pl-5 space-y-2">
        <li>Informed gaming decisions</li>
        <li>Responsible gaming tools</li>
        <li>24/7 support</li>
        <li>No minor accounts</li>
      </ul>
    </GamingContentWrapper>
    
    </>
  );
}
