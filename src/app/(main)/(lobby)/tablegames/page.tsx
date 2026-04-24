import { blurhomebanner4 } from "@/assets/images/home";
import PageWrapper from "../components/PageWrapper";
import { slotsgames } from "../data/slotsgames";

export default function SlotsPage() {
  return (
    <PageWrapper
      banners={[blurhomebanner4]}
      title="Table Games"
      data={slotsgames}
    />
  );
}
