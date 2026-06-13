import { ContactSection } from "@/components/ContactSection";
import { InfoSection } from "@/components/InfoSection";
import { HeroSection } from "@/components/HeroSection";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection title="CONTACT" />

      {/* Info Section */}
      <section className="py-16 md:pb-24 px-[20px] md:px-[45px]">
        <InfoSection />
      </section>

      {/* Contact Section */}
      <section className="pt-0 pb-24 px-[20px] md:px-[45px]">
        <ContactSection />
      </section>
    </>
  );
}
