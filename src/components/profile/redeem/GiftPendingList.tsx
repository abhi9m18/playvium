import React from 'react';

export default function GiftPendingList() {
  const items = [
    {
      status: "PENDING -1,000.00WC",
      color: "text-white",
      bank: "Bank - US Bank Savings 2772",
      date: "Mar 11, 2025 3:09pm",
      amount: "1,000.00 (USD)",
    },
    {
      status: "CANCELED -1,000.00WC",
      color: "text-red-400",
      bank: "Bank - US Bank Savings 2772",
      date: "Mar 11, 2025 3:09pm",
      amount: "1,000.00 (USD)",
      isCanceled: true,
      remarks:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    },
    {
      status: "SUCCESSFUL -1,000.00WC",
      color: "text-green-400",
      bank: "Bank - US Bank Savings 2772",
      date: "Mar 11, 2025 3:09pm",
      amount: "1,000.00 (USD)",
    },
  ];

  return (
    <div className="bg-[#191D24] border border-gray-800 p-3 sm:p-4 rounded-lg">
      {items.map((item, index) => (
        <div
          key={index}
          className={`${
            index !== items.length - 1
              ? "border-b border-gray-700 pb-4 sm:pb-5 mb-4 sm:mb-5"
              : ""
          }`}
        >
          {/* DESKTOP VIEW */}
          <div className="hidden sm:flex justify-between items-start w-full">
            {/* LEFT SECTION */}
            <div className="space-y-1 w-full">
              {/* STATUS */}
              <p className={`${item.color} font-semibold text-base`}>
                {item.status}
              </p>

              {/* BANK */}
              <p className="text-white text-xs font-normal">{item.bank}</p>

              {/* DATE */}
              <p className="text-gray-400 text-xs font-normal">{item.date}</p>

              {/* REMARKS + BUTTON (Only for CANCELED) */}
              {item.isCanceled && (
                <div className="flex items-start gap-4 mt-3">
                  {/* REMARKS */}
                  <div className="max-w-xl">
                    <p className="text-gray-400 text-xs font-normal leading-relaxed">
                      <span className="text-gray-300 font-medium">
                        Remarks:{" "}
                      </span>
                      {item.remarks}
                    </p>
                  </div>

                  {/* BUTTON */}
                  <button className="bg-[#384252] text-white px-3 py-1 rounded-md text-xs hover:bg-[#b14ae6] whitespace-nowrap transition-colors">
                    Open a ticket
                  </button>
                </div>
              )}
            </div>

            {/* AMOUNT RIGHT SIDE */}
            <p className="text-white font-semibold text-base whitespace-nowrap pl-4">
              {item.amount}
            </p>
          </div>

          {/* MOBILE VIEW */}
          <div className="sm:hidden space-y-3">
            {/* TOP ROW - Status and Amount */}
            <div className="flex justify-between items-start gap-2">
              <p className={`${item.color} font-semibold text-sm leading-tight flex-1`}>
                {item.status}
              </p>
              <p className="text-white font-semibold text-sm whitespace-nowrap">
                {item.amount}
              </p>
            </div>

            {/* BANK */}
            <p className="text-white text-xs font-normal">{item.bank}</p>

            {/* DATE */}
            <p className="text-gray-400 text-xs font-normal">{item.date}</p>

            {/* REMARKS + BUTTON (Only for CANCELED) */}
            {item.isCanceled && (
              <div className="space-y-3 mt-3">
                {/* REMARKS */}
                <div>
                  <p className="text-gray-400 text-xs font-normal leading-relaxed">
                    <span className="text-gray-300 font-medium">Remarks: </span>
                    {item.remarks}
                  </p>
                </div>

                {/* BUTTON */}
                <button className="bg-[#C650FF] text-white px-4 py-2 rounded-md text-xs hover:bg-[#b14ae6] transition-colors w-full sm:w-auto">
                  Open a ticket
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}