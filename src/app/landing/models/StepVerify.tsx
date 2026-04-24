import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { WaitlistFormState } from "./WaitlistModal";


type StepVerifyProps = {
    form: WaitlistFormState;
    setForm: Dispatch<SetStateAction<WaitlistFormState>>;
    next: () => void;
  };

export default function StepVerify({ form, setForm, next }: StepVerifyProps) {
  const verify = async (): Promise<void> => {
    // await axios.post("/otp/verify", {
    //   entity: form.phone,
    //   code: form.otp,
    // });
    next();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 0 }}
      className="space-y-4"
    >
      <input
        type="text"
        className="flex-1 w-full rounded-sm text-[14px] bg-[#1C222C] px-4 py-2 tracking-wide text-white border border-white/10 outline-none focus:border-[#C66AF7]"
        placeholder="Enter OTP"
        value={form.otp}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, otp: e.target.value })
        }
      />

      <button
        type="button"
        className="w-full rounded-sm text-[14px] bg-[#C66AF7] py-2 text-lg font-semibold text-white hover:opacity-90 transition"
        onClick={verify}
      >
        Verify
      </button>
    </motion.div>
  );
}
