"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

// Your modals

// Images
import { tick,giftm } from "@/assets/images/model"; 
import DailyBonusModal from "@/components/model/DailyBonusModal";
import PaymentSuccessModal from "@/components/model/PaymentSuccessModal";

export default function DashboardPage() {
  // Payment Modal
  const [paymentOpen, setPaymentOpen] = useState(false);

  // Daily Bonus Modal
  const [open, setOpen] = useState(false);

  const showPaymentSuccess = () => {
    setPaymentOpen(true);
  };

  return (
    <div className="p-20 bg-[#191D24]">

      {/* Success Toast */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => toast.success("This is a success message!")}
      >
        Show Success Toast
      </button>

      {/* Error Toast */}
      <button
        className="bg-red-600 text-white px-4 py-2 rounded ml-4"
        onClick={() => toast.error("Something went wrong!")}
      >
        Show Error Toast
      </button>

      {/* Payment Modal Button */}
      <button
        onClick={showPaymentSuccess}
        className="bg-purple-600 ml-4 text-white px-6 py-2 rounded-md"
      >
        Pay Now
      </button>

      {/* Daily Bonus Modal Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-3 bg-blue-600 text-white rounded-lg ml-4"
      >
        Open Daily Bonus
      </button>

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        isPaymentOpen={paymentOpen}
        closePaymentModal={() => setPaymentOpen(false)}
        tickImg={tick}
        transactionId="16574847dfgdrtg1564"
      />

      {/* Daily Bonus Modal */}
      <DailyBonusModal
        isOpen={open}
        onClose={() => setOpen(false)}
        reward="200,000 Playvium Cash"
        giftImg={giftm}
        tickImg={tick}
      />
    </div>
  );
}
