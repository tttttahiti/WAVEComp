import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/svg/bg-gradient.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 pb-12">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight">
            CONTACT
          </h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-xl mx-auto">
          <p className="text-sm leading-[2] mb-12 text-center">
            お仕事のご依頼やご質問など、<br />
            お気軽にお問い合わせください。
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
