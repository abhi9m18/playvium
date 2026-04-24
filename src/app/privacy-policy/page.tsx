"use client";
import { responsiblegamingbanner } from "@/assets/landing";
import Image from "next/image";
import LandingFooter from "../landing/components/LandingFooter";

export default function TermsAndConditionsPage() {
  return (
    <>
      <section className="bg-[#0f131800] min-h-screen md:max-w-[1580px] mx-auto text-white">
        {/* Hero Section */}
        <div className="relative h-[180px] md:h-[200px] w-full">
          <Image
            src={responsiblegamingbanner}
            alt="Terms and Conditions"
            fill
            priority
            className="
      object-cover
      object-[90%_center]
      md:object-center
    "
          />

          <div className="absolute inset-0 bg-black/20 flex items-center justify-center px-4">
            <h1 className="text-sm md:text-2xl pt-36 md:pb-0 md:pt-28 font-bold uppercase text-center">
              Playvium – Privacy Policy
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-2 md:px-6 py-10">
          <div className="bg-[#0f1318] rounded-2xl p-2 md:p-10">
            {/* Meta */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-400 mb-6">
              <span>Version: 1.2</span>
              <span>Last Updated: 15/09/2025</span>
            </div>

            {/* Content */}
            <div className="space-y-6 text-gray-200 leading-relaxed text-[15px]">
              <h2 className="text-lg font-semibold text-white">
                Important Notices
              </h2>

              <p>
                REALPLAY TECH INC and its Related Entities including Realplay
                Ltd (“RealPlay”, “we”, “our” or “us”) provide the websites
                located at https://www.realplayltd.com/; https://Wulf
                Casino.com/ (“Websites”) and all of their subdomains, subpages
                and successor sites thereof and the “Playvium” mobile
                application (“App“) through which the Playvium Services are
                provided (together – the “Services”).
              </p>

              <p>
                Playvium services are intended for recreational and
                entertainment purposes only and are void where prohibited.
              </p>

              <p>
                You may only access the site and use Playvium services if you
                are located in and a resident of the United States, except where
                restricted by state laws.
              </p>

              <p className="font-medium">
                By using Playvium Services, you agree to be bound by:
              </p>

              <p className="italic text-gray-300">
                (Collectively, the “Playvium Agreement”)
              </p>

              <h3 className="text-lg font-semibold text-white pt-4">
                1. Interpretation
              </h3>

              <p>
                1.1 No provision under this Agreement will be construed against
                the Company solely because the Company was involved in drafting
                such provision.
              </p>

              <p>
                1.2 Headings are for convenience only and will not affect the
                interpretation of the provisions.
              </p>

              <p>
                1.3 The term “person” refers to an individual, corporation,
                trust, or any legal entity.
              </p>

              <p>
                1.4 Any phrase including the terms “including”, “include”, or
                similar expressions shall be illustrative and shall not limit
                the scope of the words preceding those terms.
              </p>

              <p>
                1.5 If any provision is found to be invalid, the remaining
                provisions shall remain in full force and effect.
              </p>
            </div>
          </div>
        </div>
      </section>
      <LandingFooter />
    </>
  );
}
