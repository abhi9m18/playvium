import RecentsTable from "../recent/components/recentTable";
import FavoriteGamesList from "./components/FavoriteGamesList";
import FavoritesBanner from "./components/FavoritesBanner";
import FavoritesTable from "./components/FavoritesTable";

export default function FavoritesPage() {
  return (
    <div className="w-full space-y-5 mt-[60px] md:m-4 ">
      <FavoritesBanner />
      <FavoriteGamesList />
      {/* <FavoritesTable /> */}
            <RecentsTable />
      
    </div>
  );
}
