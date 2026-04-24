import {
  basic,
  basicstar,
  player,
  playerstar,
  hustler,
  hustlerstar,
} from "@/assets/images/subscription";

export const subscriptionTiers = [
  {
    id: 1,
    name: "Basic",
    image: basic,
    price: "",
    perMonth: "",
    buttonText: "FREE",
  },
  {
    id: 2,
    name: "Player",
    image: player,
    price: "20",
    perMonth: "per month",
    buttonText: "Buy",
  },
  {
    id: 3,
    name: "Hustler",
    image: hustler,
    price: "50",
    perMonth: "per month",
    buttonText: "Buy",
  },
];

export const subscriptionFeatures = [
  {
    name: "Standard Access (no premium features)",
    icons: [basicstar, playerstar, hustlerstar],
  },
  {
    name: "Weekly Free Spins",
    icons: ["", playerstar, hustlerstar],
  },
  {
    name: "Profile Customization",
    icons: ["", playerstar, hustlerstar],
  },
  {
    name: "Weekly/Monthly Free Poker Tournament Entries",
    icons: ["", playerstar, hustlerstar],
  },
  {
    name: "Emblem/Badge for Tier",
    icons: ["", playerstar, hustlerstar],
  },
  {
    name: "Increased Rewards (%-wise)",
    icons: ["", "", hustlerstar],
  },
  {
    name: "Free Entry to Raffle for Prize/Gift/Vouchers",
    icons: ["", "", hustlerstar],
  },
];
