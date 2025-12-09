import Hero from "../components/landing/hero";
import Features from "../components/landing/features";
import Preview from "../components/landing/preview";
import Pricing from "../components/landing/pricing";
import CTA from "../components/landing/cta";
import Footer from "../components/landing/footer";

export default function LandingPage() {
  return (
    <div className="font-sans">
      <Hero />
      <Features />
      <Preview />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
