import FavoriteGamesList from "./components/SidehustleGamesList";
import FavoritesBanner from "./components/SidehustleBanner";
import FavoritesTable from "./components/SidehustleTable";

export default function FavoritesPage() {
  return (
    <div className="w-full space-y-5 mt-[60px] md:mt-[66px] ">
      <FavoritesBanner />
      <FavoriteGamesList />
      <FavoritesTable />
    </div>
  );
}
