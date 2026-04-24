"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import FAQComponent from "@/components/home/faq";
import EmptyStatePage from "@/components/EmptyStatePage";

import {
  group,
  badge,
  mailbox,
  Vector,
  SVG,
  facebook2,
  twitter2,
  telegram2,
  uk,
  line,
  skype2,
  social,
  linkedin,
  whatsaap,
} from "@/assets/images/referral";

import { nothinghereyet } from "@/assets/icons";

export default function Dashboard() {
  return (
    <>
      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
        {/* MAIN CARD */}
        <div className="p-4 sm:p-5 md:p-6 bg-[#191D24] rounded-lg lg:col-span-8">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                Invite a Friend to Get
              </h2>
              <p className="text-[#B93DEB] text-sm cursor-pointer hover:underline">
                Referral Terms & Conditions
              </p>
            </div>

            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center border-r border-gray-600 pr-6">
                <span className="text-[#B93DEB] text-lg font-semibold">
                  88,605.85
                </span>
                <span className="text-sm text-white">
                  Referral Rewards
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-[#B93DEB] text-lg font-semibold">
                  25%
                </span>
                <span className="text-sm text-white">
                  Commission Rewards
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300">
              Get 88,605.85 for each friend you invite, plus up to 25% commission
              on their wagers. Enjoy consistent commission whether they win or lose.
            </p>

            {/* REFERRAL INPUTS */}
            <div className="flex gap-4">
              <div className="w-full">
                <label className="text-sm text-gray-400 mb-1 block">
                  Referral Link
                </label>
                <input
                  readOnly
                  value="https://example.com/ref/ABC123"
                  className="w-full rounded-lg bg-[#3A4142] border border-gray-700 px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="w-full">
                <label className="text-sm text-gray-400 mb-1 block">
                  Referral Code
                </label>
                <input
                  readOnly
                  value="ABC123"
                  className="w-full rounded-lg bg-[#3A4142] border border-gray-700 px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-white mr-2">
                Share via socials
              </span>
              {[facebook2, twitter2, telegram2, uk, line, skype2, social, linkedin, whatsaap].map(
                (icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
                  >
                    <Image src={icon} alt="social" width={20} height={20} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#191D24] rounded-lg p-4 grid grid-cols-2 gap-4">
            <div className="text-center border-r border-gray-700">
              <Image src={badge} alt="badge" width={40} height={40} />
              <p className="text-xs text-gray-400">Total Reward</p>
              <p className="text-white text-lg font-semibold">0.00</p>
            </div>
            <div className="text-center">
              <Image src={group} alt="group" width={40} height={40} />
              <p className="text-xs text-gray-400">Total Friends</p>
              <p className="text-white text-lg font-semibold">0</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#191D24] rounded-xl p-4">
              <Image src={Vector} alt="ref" width={24} height={24} />
              <p className="text-sm text-gray-400">Referral Rewards</p>
              <p className="text-white font-semibold">0.00</p>
            </div>
            <div className="bg-[#191D24] rounded-xl p-4">
              <Image src={SVG} alt="com" width={24} height={24} />
              <p className="text-sm text-gray-400">Commission Rewards</p>
              <p className="text-white font-semibold">0.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* REWARDS ACTIVITY */}
      <div className="bg-[#191D24] rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-muted mb-4">
          Rewards Activities
        </h2>
        <EmptyStatePage
          type="notFound"
          image={nothinghereyet}
          title="No info yet"
          description="Invite friends to join you now!"
        />
      </div>

      {/* AFFILIATE */}
      <Card className="bg-[#191D24] border-0 mt-6">
        <div className="p-6 flex gap-6">
          <Image src={mailbox} alt="mailbox" width={160} height={160} />
          <div>
            <h3 className="text-xl font-semibold text-white">
              Learn more about our <span className="text-[#CA6BEF]">Affiliate program</span>
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              We offer custom affiliate programs for high-volume partners.
            </p>
          </div>
        </div>
      </Card>

      {/* FAQ */}
      <div className="mt-6">
        <FAQComponent />
      </div>
    </>
  );
}
