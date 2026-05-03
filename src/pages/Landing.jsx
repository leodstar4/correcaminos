import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ValueProps from "../components/ValueProps";
import ImpactCounters from "../components/ImpactCounters";
import Testimonials from "../components/Testimonials";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ValueProps />
      <ImpactCounters />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
