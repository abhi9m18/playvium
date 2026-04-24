import RecentGamesList from "./components/recentGamesList";
import RecentsBanner from "./components/recentBanner";
import RecentsTable from "./components/recentTable";

export default function RecentsPage() {
  return (
    <div className="w-full space-y-5 mt-[60px] md:mt-[66px] ">
      <RecentsBanner />
      <RecentGamesList />
      <RecentsTable />
    </div>
  );
}
