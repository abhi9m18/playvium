import FavoriteGamesList from "./components/SidehustleGamesList";
import FavoritesBanner from "./components/SidehustleBanner";
import FavoritesTable from "./components/SidehustleTable";
import RecentsTable from "../recent/components/recentTable";

export default function FavoritesPage() {
  return (
    <div className="w-full m-4 space-y-5 mt-[60px] md:mt-[66px] ">
      <FavoritesBanner />
      <FavoriteGamesList />
      {/* <FavoritesTable /> */}
        <RecentsTable />
      
    </div>
  );
}
