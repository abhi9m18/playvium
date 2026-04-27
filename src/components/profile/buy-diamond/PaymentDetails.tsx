"use client";

import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { coingold, coingreen } from "@/assets/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { purchaseBundle } from "@/lib/mock-site-data";

interface PaymentDetailsProps {
  bundleId: string;
  amount: number;
  price: number;
  free: string;
  onCancel: () => void;
}

export default function PaymentDetails({
  bundleId,
  amount,
  price,
  free,
  onCancel,
}: PaymentDetailsProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (loading) return;

    try {
      if (!bundleId) throw new Error("BundleId missing");

      setLoading(true);
      await purchaseBundle(bundleId);
      toast.success("Payment successful");
      window.dispatchEvent(new Event("wallet-refresh"));
      onCancel();
    } catch (error: any) {
      toast.error(error?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto -mt-6 w-full max-w-4xl">
      <button
        onClick={onCancel}
        className="mb-3 hidden items-center gap-1 text-gray-400 transition hover:text-white md:flex"
      >
        <ChevronLeft size={18} />
        <span className="text-sm">Back</span>
      </button>

      <p className="text-sm font-normal text-gray-400 md:text-base">You will receive</p>

      <div className="mt-3 flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar md:gap-2">
        <Image src={coingold} alt="coin" width={22} height={22} />
        <span className="text-sm font-normal text-white md:text-base">
          {amount.toLocaleString()}
        </span>
        <span className="text-sm text-gray-400 md:text-base">Free Wulf Coin</span>

        <Image src={coingreen} alt="cash" width={20} height={20} />
        <span className="text-sm text-white md:text-base">{free}</span>
        <span className="text-sm text-gray-400 md:text-base">Free Wulf Cash</span>
      </div>

      <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-gray-400 md:text-base">
        Purchase Wulf Coin using your card. please keep in mind, you must redeem any
        <br />
        win Cash using same payment method chosen.
      </p>

      <div className="my-10 text-center">
        <h2 className="text-xl font-bold text-white">Order Summary</h2>
        <p className="mt-1 text-3xl font-bold text-[#187BF0]">{price}</p>
        <p className="mt-1 text-xs text-gray-400">
          {amount.toLocaleString()} Wulf Coin and bonus FREE {free}
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-xs text-gray-400">Your online banking</p>
        <div className="flex h-12 items-center justify-between rounded-lg border border-gray-800 bg-[#191D24] px-4">
          <span className="text-sm text-gray-500">Your online banking</span>
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>

      <div className="mb-10">
        <p className="mb-2 text-xs text-gray-400">Other payment methods</p>
        <div className="flex h-12 items-center justify-between rounded-lg border border-gray-800 bg-[#191D24] px-4">
          <span className="text-sm text-gray-500"></span>
          <ChevronRight size={18} className="text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="mx-auto flex h-9 w-85 items-center justify-center rounded-md bg-[#187BF0] text-sm font-bold text-white disabled:opacity-60"
        >
          {loading ? "Processing..." : "Proceed to payment"}
        </button>

        <button
          onClick={onCancel}
          className="mx-auto flex h-9 w-85 items-center justify-center rounded-md bg-[#2B2F36] text-sm font-bold text-gray-300"
        >
          Cancel payment
        </button>
      </div>
    </div>
  );
}
