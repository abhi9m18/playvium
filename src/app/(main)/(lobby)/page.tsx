import PageWrapper from "./components/PageWrapper";
import { LIVE_DEALERS  } from "./data/liveDealers";

export default function LobbyPage() {
  return <>
  <PageWrapper title="Lobby" data={LIVE_DEALERS} banners={[]} />;
  </>
}
