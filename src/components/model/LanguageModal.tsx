import React, { useState } from "react";
import Image from "next/image";
import { notificationcross } from "@/assets/icons";

export default function LanguageModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  if (!isOpen) return null;

  const languages = [
    { id: 1, code: "en", name: "English", link: "/?lang=en" },
    { id: 2, code: "es", name: "Español", link: "/?lang=es" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[1000]"
        onClick={onClose}
      />

      {/* Centered Modal Wrapper */}
      <div className="fixed inset-0 z-[1001] flex items-center justify-center px-4">
        {/* Modal */}
        <div className="w-full max-w-[350px] bg-[#1D232B] rounded-lg shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#1D232B] border-b border-[#2A313A]">
            <h2 className="text-white text-base font-normal">Language</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-black rounded-lg hover:opacity-80"
            >
              <Image
                src={notificationcross}
                alt="Close"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Language List */}
          <div className="px-6 py-4">
            {languages.map((language) => (
              <div
                key={language.id}
                onClick={() => setSelectedLanguage(language.name)}
                className="flex items-center justify-between py-4 cursor-pointer group"
              >
                <span className="text-white text-base group-hover:text-purple-400 transition-colors">
                  {language.name}
                </span>

                {/* Radio */}
                <div className="relative w-6 h-6">
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedLanguage === language.name
                        ? "border-purple-500"
                        : "border-gray-500"
                    }`}
                  >
                    {selectedLanguage === language.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-purple-500" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
