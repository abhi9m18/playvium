"use client";

import { createContext, useContext, useState } from "react";

interface ContextType {
  activeMenu: string;
  profileOpen: boolean;
  setActiveMenu: (value: string) => void;
  setProfile: (value: boolean) => void;
}

const ProfileMenuContext = createContext<ContextType | undefined>(undefined);

export const ProfileMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeMenu, setActiveMenu] = useState("wallet");
  const [profileOpen, setProfile] = useState(false);

  return (
    <ProfileMenuContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        profileOpen,
        setProfile,
      }}
    >
      {children}
    </ProfileMenuContext.Provider>
  );
};

export function useProfileMenu() {
  const context = useContext(ProfileMenuContext);

  if (!context) {
    throw new Error(
      "useProfileMenu must be used within a ProfileMenuProvider"
    );
  }

  return context;
}