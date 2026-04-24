"use client";

import Image from "next/image";
import { ChevronLeft, ChevronDown, ChevronRight } from "lucide-react";
import { coingold, coingreen } from "@/assets/icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const { token, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const paymentMethod = "card_ending_1234";

  const handlePurchase = async () => {
    if (loading) return; // ✅ prevent double click

    try {
      if (!BASE_URL) throw new Error("NEXT_PUBLIC_API_URL is missing");
      if (!token || isAuthenticated !== "authenticated") {
        throw new Error("Unauthorized. Please login again.");
      }
      if (!bundleId) throw new Error("BundleId missing");

      setLoading(true);

      const res = await fetch(`${BASE_URL}/admin/coin-bundles/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bundleId, paymentMethod }),
      });

      if (!res.ok) {
        // ✅ try json error first, fallback text
        let msg = "";
        try {
          const j = await res.json();
          msg = j?.message || JSON.stringify(j);
        } catch {
          msg = await res.text();
        }
        throw new Error(msg || `Purchase failed: ${res.status}`);
      }

      toast.success("Payment successful ✅");
      window.dispatchEvent(new Event("wallet-refresh"));
      onCancel(); // ✅ go back
    } catch (e: any) {
      toast.error(e?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl -mt-6 mx-auto">
      <button
        onClick={onCancel}
        className="hidden md:flex items-center gap-1 text-gray-400 hover:text-white transition mb-3"
      >
        <ChevronLeft size={18} />
        <span className="text-sm">Back</span>
      </button>

      <p className="text-gray-400 text-sm md:text-base font-normal">
        You will receive
      </p>

      <div className="flex items-center gap-2 md:gap-2 mt-3 flex-nowrap overflow-x-auto no-scrollbar">
        <Image src={coingold} alt="coin" width={22} height={22} />
        <span className="text-white font-normal text-sm md:text-base">
          {amount.toLocaleString()}
        </span>

        <span className="text-gray-400 text-sm md:text-base">
          Free Wulf Coin
        </span>

        <Image src={coingreen} alt="cash" width={20} height={20} />
        <span className="text-white text-sm md:text-base">{free}</span>

        <span className="text-gray-400 text-sm md:text-base">
          Free Wulf Cash
        </span>
      </div>

      <p className="mt-2 text-gray-400 text-[13px] md:text-base leading-relaxed max-w-2xl">
        Purchase Wulf Coin using your card. please keep in mind, you must redeem
        any
        <br />
        win Cash using same payment method chosen.
      </p>

      <div className="text-center my-10">
        <h2 className="text-white text-xl font-bold">Order Summary</h2>
        <p className="text-[#D96BFF] text-3xl font-bold mt-1">{price}</p>
        <p className="text-gray-400 text-xs mt-1">
          {amount.toLocaleString()} Wulf Coin and bonus FREE {free}
        </p>
      </div>

      <div className="mb-6">
        <p className="text-gray-400 text-xs mb-2">Your online banking</p>
        <div className="bg-[#191D24] border border-gray-800 rounded-lg px-4 h-12 flex items-center justify-between">
          <span className="text-gray-500 text-sm">Your online banking</span>
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>

      <div className="mb-10">
        <p className="text-gray-400 text-xs mb-2">Other payment methods</p>
        <div className="bg-[#191D24] border border-gray-800 rounded-lg px-4 h-12 flex items-center justify-between">
          <span className="text-gray-500 text-sm"></span>
          <ChevronRight size={18} className="text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-85 h-9 bg-[#B93DEB] rounded-md text-white text-sm font-bold flex justify-center items-center mx-auto disabled:opacity-60"
        >
          {loading ? "Processing..." : "Proceed to payment"}
        </button>

        <button
          onClick={onCancel}
          className="w-85 h-9 bg-[#2B2F36] rounded-md text-gray-300 text-sm font-bold flex justify-center items-center mx-auto"
        >
          Cancel payment
        </button>
      </div>
    </div>
  );
}
