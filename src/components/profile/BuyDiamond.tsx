"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import Tabs from "./buy-diamond/Tabs";
import CashSection from "./buy-diamond/CashSection";
import CardSection from "./buy-diamond/CardSection";
import PaymentDetails from "./buy-diamond/PaymentDetails";

import { coingold, coingreen } from "@/assets/icons";
import toast from "react-hot-toast";
import { getActiveBundles, type ActiveBundle } from "@/lib/mock-site-data";

type BuyDiamondProps = {
  header?: React.ReactNode;
};

export default function BuyDiamond({ header }: BuyDiamondProps) {
  const [tab, setTab] = useState<"cash" | "card">("cash");

  const [selectedDiamond, setSelectedDiamond] = useState<null | {
    bundleId: string;
    amount: number;
    price: number;
    free: string;
  }>(null);

  const [bundles, setBundles] = useState<ActiveBundle[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ prevent double fetch in dev strict mode
  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const fetchActiveBundles = async () => {
      try {
        setLoading(true);
        const data = await getActiveBundles();
        data.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        setBundles(data);
      } catch (e: any) {
        toast.error(e?.message || "Failed to fetch coin bundles");
        setBundles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveBundles();
  }, []);

  const firstBundle = useMemo(() => bundles?.[0] ?? null, [bundles]);

  return (
    <div className="w-full mt-5 md:mt-0">
      {header}

      {!selectedDiamond && (
        <h2 className="hidden md:block text-white text-2xl font-bold">
          Buy Wulf Coin
        </h2>
      )}

      {!selectedDiamond && tab === "cash" && (
        <>
          <h2 className="block md:hidden text-white text-lg font-bold">
            Buy Wulf Coins
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Please Buy Wulf Coin from card you have added.
          </p>

          {loading && (
            <p className="text-gray-500 text-xs mt-2">Loading packages...</p>
          )}
        </>
      )}

      {!selectedDiamond && tab === "card" && (
        <>
          <p className="text-gray-400 text-sm">You will receive</p>

          {firstBundle ? (
            <div className="flex items-center gap-2 mt-3">
              <Image src={coingold} alt="coin" width={22} height={22} />
              <span className="text-white text-sm">
                {firstBundle.wulfCoinAmount.toLocaleString()}
              </span>
              <span className="text-gray-400 text-sm">Wulf Coin free</span>

              <Image src={coingreen} alt="cash" width={20} height={20} />
              <span className="text-white text-sm">
                {Number(firstBundle.bonusWulfCash).toFixed(2)}
              </span>
              <span className="text-gray-400 text-sm">Free Wulf Cash</span>
            </div>
          ) : (
            <p className="text-gray-500 text-xs mt-2">
              No active packages found
            </p>
          )}
        </>
      )}

      {!selectedDiamond && (
        <div className="mt-4">
          <Tabs activeTab={tab} onChange={setTab} />
        </div>
      )}

      <div className="mt-8">
        {selectedDiamond ? (
          <PaymentDetails
            bundleId={selectedDiamond.bundleId}
            amount={selectedDiamond.amount}
            price={selectedDiamond.price}
            free={selectedDiamond.free}
            onCancel={() => setSelectedDiamond(null)}
          />
        ) : tab === "cash" ? (
          <CashSection
            bundles={bundles}
            loading={loading}
            onSelectDiamond={setSelectedDiamond}
          />
        ) : (
          <CardSection />
        )}
      </div>
    </div>
  );
}
