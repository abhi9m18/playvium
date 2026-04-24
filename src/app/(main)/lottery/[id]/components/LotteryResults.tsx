"use client";

export default function LotteryResults() {
  const results = [
    {
      id: 1,
      date: "Nov 05, 2024",
      drawNo: "Draw #1452",
      numbers: [3, 12, 27, 33, 56],
      prize: "$3,000.00",
    },
    {
      id: 2,
      date: "Nov 04, 2024",
      drawNo: "Draw #1451",
      numbers: [9, 14, 22, 37, 59],
      prize: "$1,800.00",
    },
    {
      id: 3,
      date: "Nov 03, 2024",
      drawNo: "Draw #1450",
      numbers: [1, 11, 19, 25, 60],
      prize: "$2,200.00",
    },
    {
      id: 4,
      date: "Nov 05, 2024",
      drawNo: "Draw #1452",
      numbers: [3, 12, 27, 33, 56],
      prize: "$3,000.00",
    },
    {
      id: 5,
      date: "Nov 04, 2024",
      drawNo: "Draw #1451",
      numbers: [9, 14, 22, 37, 59],
      prize: "$1,800.00",
    },
  ];

  return (
    <div className="w-full bg-[#1A1E26] rounded-xl p-4 border border-[#252C36]">
      <h2 className="text-white font-semibold text-[15px] mb-4">
        Recent Results
      </h2>

      <div className="flex flex-col gap-3 w-full">
        {results.map((r) => (
          <div
            key={r.id}
            className="
              bg-[#11151B] border border-[#2C3544] rounded-xl
              p-3 flex items-center justify-between gap-3
              hover:border-[#3A4557] transition
              w-full overflow-hidden
            "
          >
            {/* LEFT: DRAW INFO */}
            <div className="flex flex-col min-w-[75px] shrink-0">
              <span className="text-white text-[13px] font-semibold">{r.drawNo}</span>
              <span className="text-white/60 text-[11px]">{r.date}</span>
            </div>

            {/* CENTER: NUMBERS (SCROLLABLE ROW) */}
            <div className="flex gap-1 overflow-x-auto scrollbar-hide flex-nowrap px-1">
              {r.numbers.map((num, i) => (
                <div
                  key={i}
                  className="
                    w-5 h-5 md:w-7 md:h-7 rounded-full bg-[#D9D9D9]
                    flex items-center justify-center
                    text-black text-[11px] font-semibold shrink-0
                  "
                >
                  {num}
                </div>
              ))}
            </div>

            {/* RIGHT: PRIZE */}
            <div className="text-right min-w-[80px] shrink-0">
              <p className="text-white/60 text-[11px]">Prize</p>
              <p className="text-green-400 text-[13px] font-semibold">
                {r.prize}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
