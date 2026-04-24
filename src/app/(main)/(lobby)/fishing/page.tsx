import { blurhomebanner7 } from "@/assets/images/home";
import PageWrapper from "../components/PageWrapper";
import { slotsgames } from "../data/slotsgames";

export default function SlotsPage() {
  return (
    <PageWrapper
      banners={[blurhomebanner7]}
      title="Fishing"
      data={slotsgames}
    />
  );
}
