"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// md ブレークポイント（globals.css / tailwind と合わせて 800px）。
const MOBILE_MAX_WIDTH = 800;

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (newState) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
  };

  // スクロールロックはモバイル（md 未満）のときだけ。
  // デスクトップはサイドメニューでコンテンツが縮むだけなのでロックしない。
  // リサイズで境界をまたいでも追従させる。
  useEffect(() => {
    const apply = () => {
      const isMobile = window.innerWidth < MOBILE_MAX_WIDTH;
      document.body.style.overflow = isMenuOpen && isMobile ? "hidden" : "";
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
