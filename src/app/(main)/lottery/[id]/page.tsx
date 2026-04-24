import LotteryHeader from "./components/LotteryHeader";
import LotteryTabs from "./components/LotteryTabs";

export default async function LotteryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 

  return (
    <div className="w-full min-h-screen mt-[60px] md:mt-[66px] bg-[#0F131A] px-4 md:px-10 py-6">
      <LotteryHeader id={id} />

      <div className="mt-4 md:mt-0">
        <LotteryTabs />
      </div>
    </div>
  );
}
