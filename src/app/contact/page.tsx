import { ContactForm } from "@/components/ContactForm";
import { InfoSection } from "@/components/InfoSection";
import { HeroSection } from "@/components/HeroSection";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection title="CONTACT" />

      {/* Info Section */}
      <section className="py-12 md:py-32 px-[20px] md:px-[45px]">
        <InfoSection />
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
