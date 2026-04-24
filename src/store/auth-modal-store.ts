"use client";
import { create } from "zustand";

export type AuthView =
  | "login"
  | "register"
  | "forgot"
  | "verify"
  | "reset";

type Payload = {
  email?: string;
  entity?: string; 
  otp?: string; 
  from?: "register" | "forgot";
};

type State = {
  open: boolean;
  view: AuthView;
  payload?: Payload;

  openModal: (view?: AuthView, payload?: Payload) => void;
  closeModal: () => void;
  setView: (view: AuthView, payload?: Payload) => void;
};

export const useAuthModal = create<State>((set) => ({
  open: false,
  view: "login",
  payload: undefined,

  openModal: (view = "login", payload) =>
    set({ open: true, view, payload }),

  closeModal: () =>
    set({ open: false, view: "login", payload: undefined }),

  setView: (view, payload) =>
    set({ view, payload }),
}));
