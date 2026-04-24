import LobbyBanner from "./LobbyBanner";
import GameGrid from "./GameGrid";

type PageWrapperProps = {
  title: string;
  data: any[];
  banners: any[];
};

export default function PageWrapper({
  title,
  data,
  banners,
}: PageWrapperProps) {
  return (
    <div className="gap-4 max-w-7xl mx-auto">
      <LobbyBanner title={title} banners={banners} />

      <div className="px-2 md:px-6">
        <GameGrid games={data} title={title} />
      </div>
    </div>
  );
}
