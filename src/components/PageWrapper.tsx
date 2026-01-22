"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMenu } from "./MenuContext";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const { isMenuOpen, toggleMenu } = useMenu();

  return (
    <>
      {/* Fixed Header - stays at full width */}
      <header
        className={`fixed top-0 left-0 z-50 p-6 flex justify-between items-start transition-[width] duration-500 ease-out ${
          isMenuOpen ? "md:w-[80vw] w-full" : "w-full"
        }`}
      >
        <Link href="/">
          <Image
            src="/svg/logo-sound.svg"
            alt="SOUND \"
            width={44}
            height={9}
            className="h-[9px] w-auto"
            priority
          />
        </Link>
        <button
          onClick={toggleMenu}
          className="p-2 -m-2"
          aria-label="メニューを開く"
        >
          <Image
            src="/svg/icon-menu.svg"
            alt="メニュー"
            width={23}
            height={21}
            className="h-[21px] w-auto"
          />
        </button>
      </header>

      {/* Page Content - width shrinks when menu opens */}
      <div
        className={`min-h-screen bg-white transition-[width] duration-500 ease-out overflow-hidden ${
          isMenuOpen ? "md:w-[80vw]" : "w-full"
        }`}
      >
        {children}
      </div>
    </>
  );
}
