import { ContactSection } from "@/components/ContactSection";
import { InfoSection } from "@/components/InfoSection";
import { HeroSection } from "@/components/HeroSection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection title="CONTACT" />

      {/* Info Section */}
      <section className="py-16 md:pb-24 px-5 md:px-[45px]">
        <InfoSection />
      </section>

      {/* Contact Section */}
      <section className="pt-0 pb-24 px-5 md:px-[45px]">
        <ContactSection />
      </section>
    </>
  );
}
