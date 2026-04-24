import {
  LiveIcon,
  SlotsIcon,
  TableIcon,
  FishingIcon,
  PokerIcon,
  NewRelease,
  Blog,
  BlogActive,
  LiveIconActive,
  SlotsIconActive,
  TableIconActive,
  FishingIconActive,
  PokerIconActive,
  Promotion,
  PromotionActive,
  NewReleaseActive,
  Sponsorship,
  SponsorshipActive,
} from "@/assets/icons/lobby";


export const LOBBY_CATEGORIES = [
  { id: "livedealers", name: "Live Dealers", icon: LiveIcon, activeIcon: LiveIconActive },
  { id: "slots", name: "Slots", icon: SlotsIcon, activeIcon: SlotsIconActive },
  { id: "tablegames", name: "Table Games", icon: TableIcon, activeIcon: TableIconActive },
  { id: "fishing", name: "Fishing", icon: FishingIcon, activeIcon: FishingIconActive },
  { id: "poker", name: "Poker", icon: PokerIcon, activeIcon: PokerIconActive },
  { id: "promotions", name: "Promotions", icon: Promotion, activeIcon: PromotionActive },
  { id: "sponsorships", name: "Sponsorship", icon: Sponsorship, Sponsorship: SponsorshipActive },
  // { id: "lobby", name: "New Releases", icon: NewRelease, activeIcon: NewReleaseActive },
  { id: "announcement", name: "Blog", icon: Blog, activeIcon: BlogActive },
];



