"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMenu } from "./MenuContext";
import { useSound } from "./SoundContext";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const { isMenuOpen, toggleMenu } = useMenu();
  const { isSoundOn, toggleSound } = useSound();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight - 48;
      setIsScrolled(window.scrollY >= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期状態をチェック

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Header - stays at full width */}
      <header
        className={`fixed top-0 left-0 z-50 px-6 pt-12 md:px-16 transition-[width] duration-500 ease-out ${
          isMenuOpen ? "md:w-[calc(100vw-233px)]" : "w-full"
        }`}
      >
        <div className="grid-6 items-start">
          <button
            onClick={toggleSound}
            className={`col-1 font-en font-bold transition-colors duration-300 text-left ${isScrolled ? 'text-black' : 'text-white'}`}
            style={{ fontSize: '10pt' }}
            aria-label={isSoundOn ? '音声をオフ' : '音声をオン'}
          >
            SOUND {isSoundOn ? '/' : '\\'}
          </button>
          <div className="col-start-6 col-1 flex justify-end">
            <button
              onClick={toggleMenu}
              className="p-2 -m-2"
              aria-label="メニューを開く"
            >
              {isScrolled ? (
                <Image
                  src="/svg/icon-menu-black.svg"
                  alt="メニュー"
                  width={23}
                  height={21}
                  className="h-[21px] w-auto"
                />
              ) : (
                <Image
                  src="/svg/icon-menu.svg"
                  alt="メニュー"
                  width={23}
                  height={21}
                  className="h-[21px] w-auto"
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Page Content - width shrinks when menu opens */}
      <div
        className={`min-h-screen bg-white transition-[width] duration-500 ease-out overflow-hidden ${
          isMenuOpen ? "md:w-[calc(100vw-233px)]" : "w-full"
        }`}
      >
        {children}
      </div>
    </>
  );
}
