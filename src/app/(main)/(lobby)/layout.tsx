
export default function LobbyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full mt-[60px] md:mt-[66px] bg-[#0F131A] py-2 text-white">
      <div className="max-w-full">
        {children}
      </div>
    </div>
  );
}
