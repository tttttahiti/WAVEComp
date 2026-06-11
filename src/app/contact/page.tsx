import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section data-hero className="relative h-[270px] md:h-[215px] min-h-[150px] md:min-h-[215px] flex items-end overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full pb-6 md:pb-12">
          <div className="grid-6 px-[20px] md:px-[45px]">
            <h2 className="text-white text-[30pt] md:text-[30pt] font-bold col-3">CONTACT</h2>
            <div className="col-3 flex justify-end items-end mt-0">
              <Link href="/">
                <Image
                  src="/svg/logo-wave.svg"
                  alt="WA/VE"
                  width={140}
                  height={40}
                  className="w-[140px] h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-32 px-[20px] md:px-[45px]">
        <div className="grid-6">
          <div className="col-6 md:col-1 md:col-start-2 mb-8 md:mb-0">
            <h2 className="text-[30pt] md:text-[30pt] font-bold">INFO</h2>
          </div>
          <div className="col-span-6 md:col-start-4 md:col-span-2">
            <div className="text-[12pt] font-medium">
              <p>WA/VE</p>
              <p>株式会社ウェーブ</p>
              <br/>
              <p>設立日：2026年4月1日</p>
              <p>CEO：菊地晴夏</p>
              <p>Co-Founder：島田舞</p>
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
      <section className="py-12 md:pt-0 md:pb-32 px-[20px] md:px-[45px]">
        <div className="grid-6">
          <div className="col-6 md:col-1 md:col-start-2 mb-4 md:mb-0">
            <h2 className="text-[30pt] md:text-[30pt] font-bold">CONTACT</h2>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
