import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-screen squish-on-menu transition-transform duration-500 origin-left">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 pb-12">
          <div className="max-w-7xl mx-auto grid-6">
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight col-6">
              CONTACT
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid-6">
          <div className="col-start-2 col-4">
            <p className="text-sm leading-[2] mb-12 text-center">
              お仕事のご依頼やご質問など、<br />
              お気軽にお問い合わせください。
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
