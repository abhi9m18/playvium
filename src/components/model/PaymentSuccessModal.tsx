"use client";

import Image, { StaticImageData } from "next/image";

interface PaymentSuccessModalProps {
  isPaymentOpen: boolean;
  closePaymentModal: () => void;
  transactionId?: string;
  tickImg: StaticImageData | string;
}

export default function PaymentSuccessModal({
  isPaymentOpen,
  closePaymentModal,
  transactionId = "16574847dfgdrtg1564",
  tickImg,
}: PaymentSuccessModalProps) {
  if (!isPaymentOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-[#1D222B] w-[500px] rounded-2xl py-5 text-center shadow-xl border border-white/10">
        
        {/* Purple Icon */}
        <div className="w-[95px] h-[95px] mx-auto rounded-full flex items-center justify-center">
          <Image
            src={tickImg}
            alt="Success"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-[26px] font-semibold text-white">
          Payment Successful
        </h2>

        {/* Description */}
        <p className="text-[13px] text-gray-300 mt-3 font-[200] leading-relaxed">
          Your payment was successful and your balance has been updated,
          <br />
          Thank you for your purchase.
        </p>

        {/* Transaction ID */}
        <p className="text-[14px] text-gray-400 mt-5">
          Transaction ID:{" "}
          <span className="text-white font-[300]">{transactionId}</span>
        </p>

        {/* Close Button */}
        <button
          onClick={closePaymentModal}
          className="mt-8  bg-[#B93DEB]  py-2 text-white text-[16px] px-15 rounded-md hover:opacity-90 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
