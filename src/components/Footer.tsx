import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#E5E5E5] py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/svg/logo-wave.svg"
                alt="WA/VE"
                width={100}
                height={28}
                className="w-[100px] h-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <Link href="/about" className="block text-sm text-black hover:text-wave-blue transition-colors">
              ABOUT
            </Link>
            <Link href="/hal-ca" className="block text-sm text-black hover:text-wave-blue transition-colors">
              HAL CA
            </Link>
            <Link href="/releases" className="block text-sm text-black hover:text-wave-blue transition-colors">
              RELEASE
            </Link>
            <Link href="/works" className="block text-sm text-black hover:text-wave-blue transition-colors">
              WORKS
            </Link>
            <Link href="/contact" className="block text-sm text-black hover:text-wave-blue transition-colors">
              CONTACT
            </Link>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-black hover:text-wave-blue transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-black hover:text-wave-blue transition-colors"
            >
              FACEBOOK
            </a>
            <a
              href="https://music.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-black hover:text-wave-blue transition-colors"
            >
              APPLE MUSIC
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-black hover:text-wave-blue transition-colors"
            >
              SPOTIFY
            </a>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm text-black font-medium mb-2">CONTACT:</p>
            <a
              href="mailto:info@wa-ve.jp"
              className="text-sm text-wave-blue hover:underline"
            >
              info@wa-ve.jp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-black/20 text-center md:text-right">
          <p className="text-xs text-black">
            © WA/VE 2025, ALL RIGHT RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
