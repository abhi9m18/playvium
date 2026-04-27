"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useChatModal } from "@/store/chat-modal-store";
import { Send, Paperclip, Loader2, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ChatBotModal() {
  const { open, closeModal } = useChatModal();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text?: string; image?: string; time?: string }[]
  >([]);

  const bodyRef = useRef<HTMLDivElement>(null);

  /* AUTO SCROLL */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const timeNow = () =>
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const text = message.trim();
    setMessage("");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text, time: timeNow() },
    ]);

    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Hello! " + text, time: timeNow() },
      ]);
      setLoading(false);
    }, 800);
  };

  const handleFileSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = URL.createObjectURL(file);

    setMessages((prev) => [
      ...prev,
      { sender: "user", image: url, time: timeNow() },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Nice image! (Dummy response)",
          time: timeNow(),
        },
      ]);
      setUploading(false);
    }, 700);
  };

  return (
    <Sheet open={open} onOpenChange={closeModal}>
      <SheetContent
        side="right"
        className="
          p-0 w-[95vw] sm:w-[400px]
          bg-[#1F242B] text-white
          border-l border-gray-700
          mt-16
          h-[calc(100vh-4rem)]
          flex flex-col
          overflow-hidden
          z-[9999]
        "
      >
        {/* HEADER */}
        <div className="p-4 border-b border-gray-700">
          <p className="text-lg font-semibold">Chat</p>
        </div>

        {/* BODY */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-hide"
        >
          {messages.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Start the conversation…
            </p>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === "user"
                    ? "bg-[#384252]"
                    : "bg-[#187BF0]"
                }`}
              >
                <User className="w-4 h-4 text-white" />
              </div>

              <div
                className={`max-w-[75%] flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                  <span className="font-semibold">
                    {msg.sender === "user" ? "You" : "John Mathew"}
                  </span>
                  <span>{msg.time}</span>
                </div>

                <div
                  className={`px-3 py-2 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-[#187BF0] text-white rounded-br-none"
                      : "bg-[#2A2F36] text-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  {msg.image && (
                    <img src={msg.image} className="w-40 mt-1 rounded" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-3 border-t border-gray-700">
          <div className="relative">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="
                w-full bg-[#15181E] border border-gray-700
                rounded-full px-4 py-2 pr-14 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#187BF0]
              "
            />

            <button
              onClick={() =>
                document.getElementById("file-input")?.click()
              }
              className="absolute right-12 top-1/2 -translate-y-1/2 p-2"
            >
              <Paperclip size={18} />
            </button>

            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />

            <button
              onClick={handleSendMessage}
              disabled={!message || loading || uploading}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                p-2 rounded-full bg-[#187BF0]
              "
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
