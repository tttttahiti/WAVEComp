"use client";

import Link from "next/link";
import Image from "next/image";
import { useMenu } from "./MenuContext";
import { useSound } from "./SoundContext";

export function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const { isSoundOn, toggleSound } = useSound();

  return (
    <>
      {/* Menu Overlay - Full screen on mobile, fixed width on desktop */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full md:w-[233px] z-40 transition-transform duration-500 ease-out menu-overlay bg-white ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-[45px] right-[45px] z-50 p-2 -m-2"
          aria-label="メニューを閉じる"
        >
          <Image
            src="/svg/icon-close.svg"
            alt="閉じる"
            width={21}
            height={23}
            className="h-[18px] md:h-[23px] w-auto"
          />
        </button>

        {/* Menu Content - APPLE MUSIC centered vertically */}
        <div className="h-full flex flex-col justify-center w-[110px] md:w-auto mx-auto md:mx-0 md:px-[45px] whitespace-nowrap">
          {/* Main Navigation */}
          <nav className="space-y-3 md:space-y-4">
            <Link
              href="/about"
              onClick={closeMenu}
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="/hal-ca"
              onClick={closeMenu}
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              HAL ca
            </Link>
            <Link
              href="/releases"
              onClick={closeMenu}
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              RELEASES
            </Link>
            <Link
              href="/works"
              onClick={closeMenu}
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              WORKS
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              CONTACT
            </Link>
          </nav>

          {/* Separator */}
          <div className="my-6 md:my-8 border-t border-black" />

          {/* Social Links - Same font size as nav, left-aligned */}
          <div className="space-y-3 md:space-y-4">
            <a
              href="https://www.instagram.com/wa_ve.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.facebook.com/wave.halca"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              FACEBOOK
            </a>
            <a
              href="https://music.apple.com/jp/artist/hal-ca/1702034837"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              APPLE MUSIC
            </a>
            <a
              href="https://open.spotify.com/intl-ja/artist/4PtZB4ONshF7mdbYQgVWtm"
              target="_blank"
              rel="noopener noreferrer"
              className="block max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              SPOTIFY
            </a>
          </div>

          {/* Separator */}
          <div className="my-6 md:my-8 border-t border-black" />

          <div className="space-y-3 md:space-y-4">
            <button
              onClick={toggleSound}
              className="max-[400px]:text-[4.5pt] text-[12pt] md:text-[12pt] font-en font-bold transition-colors duration-300 text-left text-black"
              aria-label={isSoundOn ? '音声をオフ' : '音声をオン'}
            >
              SOUND {isSoundOn ? '/' : '\\'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
