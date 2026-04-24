import { blurhomebanner8 } from "@/assets/images/home";
import PageWrapper from "../components/PageWrapper";
import { slotsgames } from "../data/slotsgames";

export default function SlotsPage() {
  return (
    <PageWrapper banners={[blurhomebanner8]} title="Poker" data={slotsgames} />
  );
}
