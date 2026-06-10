"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMenu } from "./MenuContext";
import { useSound } from "./SoundContext";

const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/hal-ca", label: "HAL ca" },
  { href: "/releases", label: "RELEASES" },
  { href: "/works", label: "WORKS" },
  { href: "/contact", label: "CONTACT" },
];

export function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const { isSoundOn, toggleSound } = useSound();
  const pathname = usePathname();

  // 下層ページ（/works/xxx など）でも親メニューを選択中扱いにする
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Menu Overlay - Full screen on mobile, fixed width on desktop */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full md:w-[233px] z-40 transition-transform duration-500 ease-out menu-overlay bg-white ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Menu Content - APPLE MUSIC centered vertically */}
        <div className="h-full flex flex-col justify-center w-max md:w-auto mx-auto md:mx-0 md:px-[45px] whitespace-nowrap">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute md:static md:mb-[56px] top-8 right-8 z-50 w-10 h-10 md:w-6 md:h-6"
            aria-label="メニューを閉じる"
          >
            <Image
              src="/svg/icon-close.svg"
              alt="閉じる"
              width={40}
              height={40}
              className="w-full h-full"
            />
          </button>

          {/* Main Navigation */}
          <nav className="font-en font-bold text-[24pt] md:text-[12pt] leading-tight md:leading-[2.2] tracking-wider">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className={`block hover:text-[#c2de6d] transition-colors ${
                  isActive(href) ? "text-[#c2de6d]" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Separator */}
          <div className="my-8 md:mt-[72px] md:mb-[56px] border-t border-black" />

          {/* Social Links - Same font size as nav, left-aligned */}
          <div className="font-en font-bold text-[24pt] md:text-[12pt] leading-tight md:leading-[2.2] tracking-wider">
            <a
              href="https://www.instagram.com/wa_ve.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.facebook.com/wave.halca"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              FACEBOOK
            </a>
            <a
              href="https://music.apple.com/jp/artist/hal-ca/1702034837"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              APPLE MUSIC
            </a>
            <a
              href="https://open.spotify.com/intl-ja/artist/4PtZB4ONshF7mdbYQgVWtm"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-wave-blue hover:text-[#c2de6d] transition-colors"
            >
              SPOTIFY
            </a>
          </div>

          {/* Separator */}
          <div className="my-8 md:mt-[54px] md:mb-[59px] border-t border-black" />

          <div className="font-en font-bold text-[24pt] md:text-[12pt] leading-tight md:leading-[2.2] tracking-wider">
            <button
              onClick={toggleSound}
              className="transition-colors duration-300 text-left text-black"
              aria-label={isSoundOn ? '音声をオフ' : '音声をオン'}
            >
              SOUND {isSoundOn ? '/' : '\\'} {isSoundOn ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
