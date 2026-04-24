import React from "react";
import Image from "next/image";
import { notificationcross, notificationperson } from "@/assets/icons";

export default function NotificationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "Title 1",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      time: "1 min ago",
    },
    {
      id: 2,
      title: "Title 1",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      time: "1 min ago",
    },
    {
      id: 3,
      title: "Title 1",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      time: "1 min ago",
    },
    {
      id: 4,
      title: "Title 1",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      time: "1 min ago",
    },
    {
      id: 5,
      title: "Title 1",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      time: "1 min ago",
    },
  ];

  return (
    <>
      {/* Backdrop - Desktop only */}
      <div
        className="hidden md:block fixed inset-0 bg-black/50 z-1000"
        onClick={onClose}
      />

      {/* Desktop Modal */}
      <div className="hidden md:block fixed right-10 top-[66px] z-1001 w-[400px] bg-[#1a1d24] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-[#1d232b]">
          <h2 className="text-white text-[18px] font-semibold">Notification</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center bg-black rounded-lg justify-center text-white hover:opacity-80 transition-opacity"
          >
            <Image
              src={notificationcross}
              alt="Close Notification"
              width={24}
              height={24}
              className="w-5 h-5 object-contain cursor-pointer"
            />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[calc(100vh-155px)] bg-[#1d232b]">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="px-4 py-3.5 bg-[#15181d] mx-3 my-2.5 rounded-lg hover:bg-[#0d0e11] transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <Image
                      src={notificationperson}
                      alt="User"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white font-semibold text-[14px]">
                      {notification.title}
                    </h3>
                    <span className="text-gray-400 text-[11px] whitespace-nowrap ml-3">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-gray-300 text-[12px] leading-[1.5]">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Fullscreen Modal */}
      <div className="md:hidden fixed inset-0 z-[1001] bg-[#0F131A] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-[#0F131A] border-b border-gray-800">
          <h2 className="text-white text-xl font-semibold">Notification</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center  bg-black rounded-xl justify-center text-white hover:opacity-80 transition-opacity"
          >
            <Image src={notificationcross} alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Notifications List - Mobile */}
        <div className="overflow-y-auto h-[calc(100vh-64px)] bg-[#0F131A] px-3 py-5">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="px-4 py-3.5 bg-[#1A1F2E] mb-2.5 rounded-lg hover:bg-[#232937] transition-colors cursor-pointer"
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={notificationperson}
                      alt="User"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-white font-semibold text-[15px]">
                      {notification.title}
                    </h3>
                    <span className="text-gray-400 text-xs whitespace-nowrap ml-3">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-gray-300 text-[13px] leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Custom scrollbar for desktop */
        @media (min-width: 768px) {
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #4b5563;
            border-radius: 3px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        }
      `}</style>
    </>
  );
}
