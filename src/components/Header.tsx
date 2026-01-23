"use client";

import Link from "next/link";
import Image from "next/image";
import { useMenu } from "./MenuContext";

export function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();

  return (
    <>
      {/* Menu Overlay - Right side, fixed pixel width */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full md:w-[400px] z-40 transition-transform duration-500 ease-out menu-overlay ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-12 left-6 p-2 -m-2"
          aria-label="メニューを閉じる"
        >
          <Image
            src="/svg/icon-close.svg"
            alt="閉じる"
            width={21}
            height={23}
            className="h-[23px] w-auto"
          />
        </button>

        {/* Menu Content - APPLE MUSIC centered vertically */}
        <div className="h-full flex flex-col justify-center px-6 md:px-16">
          {/* Main Navigation */}
          <nav className="space-y-4">
            <Link
              href="/about"
              onClick={closeMenu}
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              ABOUT
            </Link>
            <Link
              href="/hal-ca"
              onClick={closeMenu}
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              HAL CA
            </Link>
            <Link
              href="/releases"
              onClick={closeMenu}
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              RELEASE
            </Link>
            <Link
              href="/works"
              onClick={closeMenu}
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              WORKS
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              CONTACT
            </Link>
          </nav>

          {/* Separator */}
          <div className="my-8 border-t border-black/10" />

          {/* Social Links - Same font size as nav, left-aligned */}
          <div className="space-y-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              FACEBOOK
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              APPLE MUSIC
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg md:text-xl font-medium hover:text-[#c2de6d] transition-colors"
            >
              SPOTIFY
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
