import React from 'react';
import Image from 'next/image';

interface RedemptionProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkIcon: any;
  wulfcoinIcon: any;
  cashIcon: any;
  wulfcoinAmount?: string;
  cashAmount?: string;
}

export default function RedemptionProgressModal({
  isOpen,
  onClose,
  checkIcon,
  wulfcoinIcon,
  cashIcon,
  wulfcoinAmount = '30K',
  cashAmount = '150'
}: RedemptionProgressModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#242B35] text-center w-full max-w-[320px] sm:max-w-[360px] rounded-2xl p-6 shadow-xl">
        
        {/* Radio Button with Text */}
        <div className="flex items-center  text-center justify-center mb-5">
          {/* <div className="w-4 h-4 rounded-full border-2 border-gray-500 mr-2.5"></div> */}
          <p className="text-[10px] flex text-center text-gray-400 font-normal">
            Redeem Method as Same as Deposit - Coin and Cash
          </p>
        </div>

        {/* Purple Check Icon */}
        <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center">
          <Image
            src={checkIcon}
            alt="Success"
            width={96}
            height={96}
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-[26px] font-semibold text-white mb-6">
          Your Redemption is<br />in progress
        </h2>

        {/* Currency Icons and Amounts */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full  flex items-center justify-center mb-3 ">
              <Image
                src={wulfcoinIcon}
                alt="wulfcoin"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-xl sm:text-[30px] font-bold text-white">
              {wulfcoinAmount}
            </p>
          </div>

          {/* Cash */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full flex items-center justify-center mb-3 ">
              <Image
                src={cashIcon}
                alt="Cash"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-xl sm:text-[30px] font-bold text-white">
              {cashAmount}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full max-w-[200px] mx-auto mt-2 bg-[#384252] hover:bg-[#f514e2] py-3 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}