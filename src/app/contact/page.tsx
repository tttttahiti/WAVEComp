import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[215px] min-h-[215px] flex items-end overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full pb-12">
          <div className="grid-6 px-6 md:px-16">
            <h2 className="text-white heading-section col-3">CONTACT</h2>
            <div className="col-3 flex justify-end items-end">
              <Link href="/">
                <Image
                  src="/svg/logo-wave.svg"
                  alt="WA/VE"
                  width={140}
                  height={40}
                  className="w-[100px] md:w-[140px] h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 md:py-32 px-6 md:px-16">
        <div className="grid-6">
          <div className="col-1 col-start-2">
            <h2 className="heading-section">INFO</h2>
          </div>
          <div className="col-start-4 col-span-2">
            <div className="text-[12pt] font-medium leading-[2]">
              <p>WA/VE</p>
              <p>株式会社ウェーブ</p>
              <p className="mt-4">設立日：2026年4月1日</p>
              <p>代表取締役（共同代表）：</p>
              <p>菊地晴夏 / 島田舞</p>
              <p>
                <a
                  href="mailto:info@wa-ve.jp"
                  className="text-wave-blue hover:text-[#c2de6d] transition-colors"
                >
                  info@wa-ve.jp
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 px-6 md:px-16">
        <div className="grid-6">
          <div className="col-1 col-start-2">
            <h2 className="heading-section">CONTACT</h2>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
