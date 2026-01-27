import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#E5E5E5] py-8 md:py-12 px-6 md:px-[45px] h-auto md:h-[322px]">
      <div className="">
        <div className="grid-6 gap-y-6 md:gap-y-0">
          {/* Logo */}
          <div className="col-6 md:col-1">
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

          {/* Navigation */}
          <div className="col-3 md:col-1 space-y-2 md:space-y-3">
            <Link href="/about" className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              ABOUT
            </Link>
            <Link href="/hal-ca" className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              HAL ca
            </Link>
            <Link href="/releases" className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              RELEASE
            </Link>
            <Link href="/works" className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              WORKS
            </Link>
            <Link href="/contact" className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors">
              CONTACT
            </Link>
          </div>

          {/* Social Links */}
          <div className="col-3 md:col-1 space-y-2 md:space-y-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              FACEBOOK
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              APPLE MUSIC
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[10pt] md:text-[12pt] text-black font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              SPOTIFY
            </a>
          </div>

          {/* Contact */}
          <div className="col-6 md:col-1 mt-2 md:mt-0">
            <p className="text-[10pt] md:text-[12pt] text-black font-en font-bold mb-1 md:mb-2">CONTACT:</p>
            <a
              href="mailto:info@wa-ve.jp"
              className="text-[10pt] md:text-[12pt] text-wave-blue font-en font-bold hover:text-[#c2de6d] transition-colors"
            >
              info@wa-ve.jp
            </a>
          </div>

          {/* Grid Blank - hidden on mobile */}
          <div className="hidden md:block col-1"></div>

          {/* Copyright */}
          <div className="col-6 md:col-1 mt-4 md:mt-0">
            <div className="flex flex-row justify-start md:justify-between gap-2 md:gap-0">
              <p className="text-[6pt] md:text-[7pt] text-black font-en">©</p>
              <p className="text-[6pt] md:text-[7pt] text-black font-en">WA/VE</p>
              <p className="text-[6pt] md:text-[7pt] text-black font-en">2025.</p>
            </div>
            <div className="flex flex-row justify-start md:justify-between gap-2 md:gap-0">
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
