import MygameplayGamesList from "./components/MygamepalyGamesList";
import MygameplaysBanner from "./components/MygamepalyBanner";
import MygameplaysTable from "./components/MygamepalyTable";

export default function MygameplaysPage() {
  return (
    <div className="w-full space-y-5 mt-[66px] ">
      <MygameplaysBanner />
      <MygameplayGamesList />
      <MygameplaysTable />
    </div>
  );
}
