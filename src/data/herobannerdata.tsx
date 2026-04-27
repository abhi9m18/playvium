import {
  blurhomebanner,
  blurhomebanner2,
  blurhomebanner3,
} from "@/assets/images/home";

/**
 * Banner Action Types
 */
export type BannerActionType =
  | "NAVIGATE"
  | "OPEN_AUTH_MODAL"
  | "OPEN_REFERRAL"
  | "DOWNLOAD_APP"
  | "CLAIM_BONUS";

export const banners = [
  {
    id: 1,
    title: "Stay Untamed",
    oneline: "Sign Up & Get Up to",
    amount: "20,000.00",
    amountSuffix: "in Casino",
    buttonText: "Claim Now",
    backgroundImage: blurhomebanner,

    link: "/register",

    // ⚡ Action
    action: {
      type: "OPEN_AUTH_MODAL" as BannerActionType,
      payload: {
        mode: "signup",
        source: "home_banner_signup",
      },
    },
  },

  {
    id: 3,
    title: "Invite Friends",
    subtitle: "Withdraw Cash",
    amount: "",
    amountSuffix: "Get Cash Instantly",
    buttonText: "Invite Friend",
    backgroundImage: blurhomebanner2,

    link: "/referral",

    action: {
      type: "OPEN_REFERRAL" as BannerActionType,
      payload: {
        source: "home_banner_referral_secondary",
      },
    },
  },

  {
    id: 4,
    title: "Download & Get",
    subtitle: "Cash Instantly",
    amount: "50,000.00",
    amountSuffix: "Wulf Cash",
    buttonText: "Download",
    backgroundImage: blurhomebanner3,

    link: "/download",

    action: {
      type: "DOWNLOAD_APP" as BannerActionType,
      payload: {
        platform: "android",
      },
    },
  },

  // {
  //   id: 5,
  //   title: "Invite Friends",
  //   subtitle: "Withdraw Cash",
  //   amount: "",
  //   amountSuffix: "Get Cash Instantly",
  //   buttonText: "Invite Friend",
  //   backgroundImage: blurhomebanner4,

  //   link: "/referral",

  //   action: {
  //     type: "OPEN_REFERRAL" as BannerActionType,
  //     payload: {
  //       source: "home_banner_referral_secondary",
  //     },
  //   },
  // },
];
