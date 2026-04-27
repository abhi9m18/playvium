"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, RefreshCw, Copy, ChevronRight } from "lucide-react";

import { qr, cash, coingold } from "@/assets/icons";

export default function PaymentFlow() {
  const [step, setStep] = useState(1);
  const [btcAddress] = useState("bc1axy8cgdyjr5etza8nQyrf2y59p8akk");
  const [transferAmount] = useState("0.00058890");

  const handleCopy = (val: string) => navigator.clipboard.writeText(val);
  const handleRefresh = () => console.log("Refreshing…");
  const handleProceedToSummary = () => setStep(2);
  const handleProceedToPayment = () => console.log("Proceeding to payment…");
  const handleCancelPayment = () => setStep(1);

  return (
    <div className="w-full flex justify-center">
      {/* STEP 1 */}
      {step === 1 && (
        <div className="w-full max-w-4xl rounded-lg">

          {/* HEADER */}
          <div className="rounded-lg bg-[#191D24] p-3 mb-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center shadow-lg overflow-hidden">
                  <Image src={coingold} alt="BTC Icon" className="w-25 h-25 object-contain" />
                </div>

                <div>
                  <h2 className="text-white font-bold text-xl">Wulf Coin</h2>
                  <p className="text-gray-400 text-xs font-normal">Coin</p>
                </div>
              </div>

              <ChevronDown className="text-gray-300 p-1 bg-[#222933] rounded-sm" size={24} />
            </div>
          </div>

          {/* BTC ADDRESS */}
          <div className="mb-6">
            <h3 className="text-gray-400 text-xs font-normal mb-3">Your BTC Address</h3>

            <div className="rounded-lg p-3 bg-[#191D24] border border-gray-800">
              <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <span className="text-gray-400 text-xs sm:text-base break-all flex-1">
                  {btcAddress}
                </span>

                <div className="flex gap-2">
                  <button onClick={handleRefresh} className="p-2 hover:bg-slate-600/60 rounded-xl transition">
                    <RefreshCw size={18} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleCopy(btcAddress)}
                    className="p-2 hover:bg-slate-600/60 rounded-xl transition"
                  >
                    <Copy size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* QR */}
          <div className="flex justify-center mb-10">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <Image src={qr} alt="BTC QR Code" width={125} height={125} className="rounded-lg" />
            </div>
          </div>

          {/* AMOUNT */}
          <div className="mb-8">
            <h3 className="text-gray-400 text-xs font-normal mb-3">
              Transfer this amount to your BTC address
            </h3>

            <div className="rounded-lg p-3 bg-[#191D24] border border-gray-800">
              <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <input
                  type="text"
                  value={transferAmount}
                  readOnly
                  className="bg-transparent outline-none text-gray-400 text-xs sm:text-base flex-1"
                />

                <button
                  onClick={() => handleCopy(transferAmount)}
                  className="p-2 hover:bg-slate-600/60 rounded-xl transition"
                >
                  <Copy size={18} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* PROCEED BUTTON */}
          <div className="flex justify-center mt-4 mb-4">
            <button
              onClick={handleProceedToSummary}
              className="w-85 h-9 bg-[#187BF0] rounded-md text-white text-sm font-bold flex justify-center items-center"
            >
              Proceed to payment
            </button>
          </div>

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="w-full">

          {/* ORDER SUMMARY */}
          <div className="text-center mb-10">
            <h2 className="text-white text-xl font-bold">Order Summary</h2>

            <p className="text-[#187BF0] text-3xl font-bold mt-1">200,000</p>

            <p className="text-gray-400 text-xs mt-1">
              35,000,000 Diamond and bonus FREE 104.00
            </p>
          </div>

          {/* BANKING */}
          <div className="mb-6">
            <p className="text-gray-400 text-xs mb-2">Your online banking</p>

            <div className="w-full bg-[#191D24] border border-gray-800 rounded-lg px-4 h-12 flex items-center justify-between">
              <span className="text-gray-500 text-sm">Your online banking</span>

              <ChevronDown size={18} className="text-gray-500 bg-[#384252] rounded-sm" />
            </div>
          </div>

          {/* OTHER METHODS */}
          <div className="mb-10">
            <p className="text-gray-400 text-xs mb-2">Other payment methods</p>

            <div className="w-full bg-[#191D24] border border-gray-800 rounded-lg px-4 h-12 flex items-center justify-between">
              <span className="text-gray-500 text-sm"></span>

              <ChevronRight size={18} className="text-gray-500 bg-[#384252] rounded-sm" />
            </div>
          </div>

          {/* BUTTONS — SAME CSS AS STEP 1 */}
          <div className="w-full flex flex-col gap-4 mt-8">

            <button
              onClick={handleProceedToPayment}
              className="w-85 h-9 bg-[#187BF0] rounded-md text-white text-sm font-bold flex justify-center items-center mx-auto"
            >
              Proceed to payment
            </button>

            <button
              onClick={handleCancelPayment}
              className="w-85 h-9 bg-[#2B2F36] rounded-md text-gray-300 text-sm font-bold flex justify-center items-center mx-auto"
            >
              Cancel payment
            </button>

          </div>

        </div>
      )}
    </div>
  );
}
