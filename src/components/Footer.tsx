import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#E5E5E5] py-[45px] px-[20px] md:px-[45px] h-[322px]">
      <div className="">
        <div className="grid-6 text-[12pt] leading-[1.7]">
          {/* Logo */}
          <div className="col-span-3 md:col-span-1">
            <Link href="/">
              <Image
                src="/svg/logo-wave.svg"
                alt="WA/VE"
                width={120}
                height={34}
                className="w-auto h-[28px] md:h-[34px]"
              />
            </Link>
          </div>

          {/* Navigation - hidden on mobile */}
          <div className="hidden md:block col-1">
            <Link href="/about" className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              ABOUT
            </Link>
            <Link href="/hal-ca" className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              HAL ca
            </Link>
            <Link href="/releases" className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              RELEASE
            </Link>
            <Link href="/works" className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              WORKS
            </Link>
            <Link href="/contact" className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              CONTACT
            </Link>
          </div>

          {/* Social Links - hidden on mobile */}
          <div className="hidden md:block col-1">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              FACEBOOK
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              APPLE MUSIC
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              SPOTIFY
            </a>
          </div>

          {/* Contact - hidden on mobile */}
          <div className="hidden md:block col-1">
            <p className="text-black font-en font-bold">CONTACT:</p>
            <a
              href="mailto:info@wa-ve.jp"
              className="text-wave-blue font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              info@wa-ve.jp
            </a>
          </div>

          {/* Grid Blank - hidden on mobile */}
          <div className="hidden md:block col-1"></div>

          {/* Copyright */}
          <div className="col-span-2 md:col-span-1 col-start-5 md:col-start-auto flex flex-col items-end md:items-start">
            <div className="flex flex-row justify-between gap-2 md:gap-0 w-full">
              <p className="text-[6pt] md:text-[7pt] text-black font-en">©</p>
              <p className="text-[6pt] md:text-[7pt] text-black font-en">WA/VE</p>
              <p className="text-[6pt] md:text-[7pt] text-black font-en">{(new Date()).getFullYear().toString()}.</p>
            </div>
            <div className="flex flex-row justify-between gap-2 md:gap-0 w-full md:w-full">
              <p className="text-[6pt] md:text-[7pt] text-black font-en">ALL</p>
              <p className="text-[6pt] md:text-[7pt] text-black font-en">RIGHT</p>
              <p className="text-[6pt] md:text-[7pt] text-black font-en">RESERVED.</p>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
