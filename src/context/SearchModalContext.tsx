"use client";
import { createContext, useContext, useState } from "react";

interface SearchModalContextType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const SearchModalContext = createContext<SearchModalContextType | null>(null);

export const SearchModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SearchModalContext.Provider>
  );
};

export const useSearchModal = () => {
  const ctx = useContext(SearchModalContext);
  if (!ctx) throw new Error("useSearchModal must be used inside provider");
  return ctx;
};
