import Hero from "../components/landing/hero";
import Features from "../components/landing/features";
import Footer from "../components/landing/footer";
import LandingNavbar from "@/components/landing/navbar";
import AboutUs from "@/components/landing/aboutUs";
import ContactUs from "@/components/landing/conatctus";

export default function LandingPage() {
  return (
    <div className="font-sans">
      <LandingNavbar/>
      <Hero />
      <Features />
      <AboutUs/>
      <ContactUs/>
      <Footer />
    </div>
  );
}
