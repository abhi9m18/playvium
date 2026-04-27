"use client";

import React from "react";
import { Camera, Check } from "lucide-react"
import { useState } from "react"

const avatars = [
  { id: 1, src: "/profiles/cyberpunk-demon-mask-red-purple.jpg" },
  { id: 2, src: "/profiles/cyberpunk-robot-samurai-blue-cyan.jpg" },
  { id: 3, src: "/profiles/neon-skull-mask-pink-purple.jpg" },
  { id: 4, src: "/profiles/dark-mech-warrior-purple-black.jpg" },
  { id: 5, src: "/profiles/colorful-robot-head-rainbow.jpg" },
  { id: 6, src: "/profiles/fire-demon-mask-red-orange.jpg" },
  { id: 7, src: "/profiles/samurai-oni-mask-white-black.jpg" },
]

type EditProfileProps = {
  header?: React.ReactNode;
};

export default function EditProfile({ header }: EditProfileProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(2)
  const [chatName, setChatName] = useState("Abhinav")

  const handleSave = () => {
    console.log("Saving profile:", { selectedAvatar, chatName })
  }

  const handleCancel = () => {
    console.log("Cancelled")
  }

  const currentAvatar = avatars.find((a) => a.id === selectedAvatar)

  return (
    <div className="w-full bg-[#242B35] px-4 py-6">
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* MOBILE BACK + TITLE */}
      {header}

      {/* DESKTOP TITLE */}

      {/* Main Avatar Display */}
      <div className="flex justify-center mb-8">
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full ring-1 ring-accent overflow-hidden bg-muted">
          <img
            src={currentAvatar?.src || avatars[0].src}
            alt="Current avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mb-4 py-4 px-6  ">
        <label className="block bg-transparent text-muted-foreground text-sm mb-2 tracking-wide">Username</label>
        <input
          type="text"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          className="w-full bg-[#191D24] text-white px-4 py-2 rounded-lg outline-none  transition-all text-lg font-normal"
          placeholder="Enter your name"
        />
        <p className="text-[#8E96A1] text-xs py-2 px-1">Do not use special symbols, otherwise your account may not be supported.</p>
      </div>

      {/* Avatar Selection Card */}
      <div className="rounded-xl px-6 py-2 mb-6">
        <p className="text-muted-foreground text-sm tracking-wide">Choose your profile icon</p>

        <div className="flex gap-3 py-4 items-center overflow-x-auto whitespace-nowrap pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">

          {/* Camera Upload Option */}
          <button className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md flex items-center justify-center hover:bg-black/80 transition-colors border-1 hover:border-muted-foreground/30">
            <Camera className="w-6 h-6 text-white" />
          </button>

          {/* Avatar Options */}
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`flex-shrink-0 relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden transition-all duration-200 ${selectedAvatar === avatar.id
                ? "ring-1 ring-accent ring-offset-1 ring-offset-card"
                : "hover:ring-1 hover:ring-muted-foreground/50"
                }`}
            >
              <img
                src={avatar.src || "/placeholder.svg"}
                alt={`Avatar option ${avatar.id}`}
                className="w-full h-full object-cover"
              />

              {selectedAvatar === avatar.id && (
                <div className="absolute bottom-0.5 z-50 right-0.5 w-5 h-5 bg-[#187BF0] border rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>


      {/* Chat Name Input */}


      {/* Action Buttons */}
      <div className="flex justify-center gap-4 px-6">
        <button
          onClick={handleSave}
          className={`px-8 py-3 w-full bg-[#187BF0] text-white font-bold rounded-lg 
           hover:bg-[#187BF0] 
           transition-colors tracking-wider text-sm`}
        >
          Save
        </button>

      </div>
    </div>
  );
}