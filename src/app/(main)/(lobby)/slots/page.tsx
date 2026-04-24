import {  blurhomebanner5 } from "@/assets/images/home";
import PageWrapper from "../components/PageWrapper";
import { slotsgames } from "../data/slotsgames";

export default function SlotsPage() {
  return (
    <PageWrapper banners={[blurhomebanner5]} title="Slots" data={slotsgames} />
  );
}
