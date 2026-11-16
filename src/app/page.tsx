import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { CtaSection, Experience, FlightSections, Gallery, Packages, Stats, WhyUs } from "@/components/site/sections";
import { Reviews } from "@/components/site/Reviews";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <FlightSections />
        <WhyUs />
        <Experience />
        <Packages />
        <Reviews />
        <Gallery />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
      {/* Spacer so the mobile sticky bar never covers the footer bottom line */}
      <div className="h-16 bg-navy-950 md:hidden" aria-hidden="true" />
      <FloatingActions />
    </div>
  );
}
