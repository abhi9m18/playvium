import FavoriteGamesList from "./components/FavoriteGamesList";
import FavoritesBanner from "./components/FavoritesBanner";
import FavoritesTable from "./components/FavoritesTable";

export default function FavoritesPage() {
  return (
    <div className="w-full space-y-5 mt-[60px] ">
      <FavoritesBanner />
      <FavoriteGamesList />
      <FavoritesTable />
    </div>
  );
}
