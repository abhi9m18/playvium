import React from 'react';

export default function HistoryList() {
  const historyItems = [
    {
      status: "PENDING -1,000.00 WC",
      statusColor: "text-white",
      bank: "Bank - US Bank Savings 2772",
      date: "Mar 11, 2025 3:09pm",
      amount: "1,000.00 (USD)",
    },
    {
      status: "PENDING -1,000.00 WC",
      statusColor: "text-white",
      bank: "Bank - US Bank Savings 2772",
      date: "Mar 11, 2025 3:09pm",
      amount: "1,000.00 (USD)",
    },
    {
      status: "PENDING -1,000.00 WC",
      statusColor: "text-white",
      bank: "Bank - US Bank Savings 2772",
      date: "Mar 11, 2025 3:09pm",
      amount: "1,000.00 (USD)",
    },
  ];

  return (
    <div className="bg-[#191D24] border border-gray-800 p-3 sm:p-4 rounded-lg">
      {historyItems.map((item, index) => (
        <div
          key={index}
          className={`${
            index !== historyItems.length - 1
              ? "border-b border-gray-700 pb-4 sm:pb-5 mb-4 sm:mb-5"
              : ""
          }`}
        >
          {/* DESKTOP VIEW */}
          <div className="hidden sm:flex justify-between items-start">
            <div>
              <p className={`${item.statusColor} font-semibold text-base`}>
                {item.status}
              </p>

              <p className="text-white font-normal text-xs">{item.bank}</p>

              <p className="text-gray-400 text-xs font-normal mt-1">
                {item.date}
              </p>
            </div>

            <p className="text-white font-semibold text-base whitespace-nowrap pl-4">
              {item.amount}
            </p>
          </div>

          {/* MOBILE VIEW */}
          <div className="sm:hidden space-y-2">
            {/* TOP ROW - Status and Amount */}
            <div className="flex justify-between items-start gap-2">
              <p className={`${item.statusColor} font-semibold text-sm leading-tight flex-1`}>
                {item.status}
              </p>
              <p className="text-white font-semibold text-sm whitespace-nowrap">
                {item.amount}
              </p>
            </div>

            {/* BANK */}
            <p className="text-white font-normal text-xs">{item.bank}</p>

            {/* DATE */}
            <p className="text-gray-400 text-xs font-normal">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}