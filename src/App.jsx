import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSummit from "./components/AboutSummit";
import ChallengesOpportunities from "./components/ChallengesOpportunities";
import SuccessfulModels from "./components/SuccessfulModels";
import RegisterSection from "./components/RegistrationSection";
import ContactSection from "./components/ContactSection";
import PartnerSection from "./components/PartnerSection";
import ESGFooter from "./components/Footer";

export default function App() {

  useEffect(() => {

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutSummit />
      <ChallengesOpportunities />
      <SuccessfulModels />
      <RegisterSection />
      <PartnerSection />
      <ContactSection />
      <ESGFooter />
    </div>
  );
}