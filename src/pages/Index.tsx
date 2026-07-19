import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HeroSectionVariantB from "@/components/HeroSectionVariantB";
import SidewaveHero from "@/components/SidewaveHero";
import { useLandingVariant } from "@/hooks/use-variant";
import HeroModeToggle, { type HeroMode } from "@/components/HeroModeToggle";
import TrustedBrands from "@/components/TrustedBrands";
import ProofStrip from "@/components/ProofStrip";
import ArchitectureSection from "@/components/ArchitectureSection";
import PlatformPillars from "@/components/PlatformPillars";
import OutcomesPanel from "@/components/OutcomesPanel";
import ExcellenceCards from "@/components/ExcellenceCards";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import CustomerChoice from "@/components/CustomerChoice";
import UseCases from "@/components/UseCases";
import PremiumCTA from "@/components/PremiumCTA";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import SkipToContent from "@/components/SkipToContent";

const STORAGE_KEY = "pointblank_hero_mode";

const readMode = (): HeroMode => {
  if (typeof window === "undefined") return "sidewave";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" ? "light" : "sidewave";
};

const Index = () => {
  const [heroMode, setHeroMode] = useState<HeroMode>(readMode);
  const variant = useLandingVariant();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleModeChange = (next: HeroMode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    // SideWave bootstraps a heavy stack of globals (jQuery plugins, Unity
    // instance, scroll-driven RAF, body-level CSS). Tearing it down at
    // runtime leaves orphan handlers calling dead references. A full
    // reload resets the document cleanly — localStorage carries the choice.
    window.scrollTo({ top: 0, behavior: "auto" });
    window.location.reload();
  };

  return (
    <div className="bg-[#030303] text-white selection:bg-[#d02030]/40 selection:text-white overflow-x-hidden min-h-screen">
      <Seo
        title="PointBlank | AI Security, Compliance, and Incident Response"
        description="PointBlank delivers AI-assisted penetration testing, security operations, compliance reviews, and incident response with expert verification."
        path="/"
      />
      <SkipToContent />
      <Header />
      {variant === "b" ? null : (
        <HeroModeToggle mode={heroMode} onToggle={handleModeChange} />
      )}

      <main id="main-content" className="relative pt-[108px]">
        {/* The hero is a visual/WebGL experience with no real <h1>; provide a
            screen-reader-only page heading so the document has a top-level
            heading and correct outline for assistive tech. */}
        <h1 className="sr-only">
          PointBlank — AI Security, Compliance, and Incident Response
        </h1>
        {variant === "b" ? (
          <HeroSectionVariantB />
        ) : heroMode === "sidewave" ? (
          <SidewaveHero />
        ) : (
          <HeroSection />
        )}
        <TrustedBrands />
        <ProofStrip />
        <ArchitectureSection />
        <PlatformPillars />
        <OutcomesPanel />
        <ExcellenceCards />
        <TestimonialsCarousel />
        <CustomerChoice />
        <UseCases />
        <PremiumCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
