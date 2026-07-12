import PublicLayout from "../layouts/PublicLayout";

import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import WorkflowSection from "../components/landing/WorkflowSection";

import PerformanceSection from "../components/landing/PerformanceSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import BackToTopButton from "../components/landing/BackToTopButton";
export default function LandingPage() {
  return (
    <PublicLayout>

      <HeroSection />

      <FeaturesSection />

      <WorkflowSection />
      <PerformanceSection />
      <CTASection />
      <Footer />
      <BackToTopButton />
    </PublicLayout>
  );
}
