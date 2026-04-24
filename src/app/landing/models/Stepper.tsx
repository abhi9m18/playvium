export default function Stepper({ step }: { step: number }) {
    return (
      <div className="flex items-center justify-between mb-5">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex-1  flex items-center">
            <div
              className={`h-4 w-4 rounded-full ${
                step >= s ? "bg-[#C66AF7] border border-white" : "bg-[#5A6370]"
              }`}
            />
            {i < 2 && (
              <div
                className={`flex-1 h-0.5 ${
                  step > s ? "bg-[#C66AF7]" : "bg-[#5A6370]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
  