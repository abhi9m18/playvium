import { blurhomebanner6 } from "@/assets/images/home";
import PageWrapper from "../components/PageWrapper";
import { LIVE_DEALERS } from "../data/liveDealers";

export default function LiveDealersPage() {
  return (
    <PageWrapper
      title="Live Dealers"
      data={LIVE_DEALERS}
      banners={[
        blurhomebanner6,
      ]}
    />
  );
}
