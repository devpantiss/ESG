import { useEffect, useState } from "react";
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
import AdminDashboard from "./components/AdminDashboard";
import RegistrationPage from "./components/RegistrationPage";

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    if (pathname === "/admin" || pathname === "/register") {
      return undefined;
    }

    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath) => {
    if (nextPath === pathname) return;

    window.history.pushState({}, "", nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  if (pathname === "/admin") {
    return <AdminDashboard onBackToSite={() => navigate("/")} />;
  }

  if (pathname === "/register") {
    return <RegistrationPage onBackToSite={() => navigate("/")} />;
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar onNavigate={navigate} />
      <Hero onNavigate={navigate} />
      <AboutSummit />
      <ChallengesOpportunities />
      <SuccessfulModels />
      <RegisterSection onNavigate={navigate} />
      <PartnerSection />
      <ContactSection />
      <ESGFooter />
    </div>
  );
}
