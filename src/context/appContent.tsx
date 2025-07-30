"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type AppContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
