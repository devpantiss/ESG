import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80; // approximate navbar height
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const navigateTo = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-4">
        {/* Logo */}
        <div className="text-lg font-semibold">
          <span className={scrolled ? "text-green-800" : "text-white"}>
            India ESG Summit
          </span>
          <span className="ml-2 text-yellow-500">2026</span>
        </div>

        {/* Desktop Navigation */}
        <ul
          className={`hidden md:flex gap-8 text-sm font-medium 
          ${scrolled ? "text-gray-700" : "text-white"}`}
        >
          <li
            className="cursor-pointer hover:text-yellow-500 transition"
            onClick={() => scrollToSection("home")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-yellow-500 transition"
            onClick={() => scrollToSection("about")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-yellow-500 transition"
            onClick={() => scrollToSection("challenges")}
          >
            Challenges
          </li>
          <li
            className="cursor-pointer hover:text-yellow-500 transition"
            onClick={() => scrollToSection("objectives")}
          >
            Objectives
          </li>
          <li
            className="cursor-pointer hover:text-yellow-500 transition"
            onClick={() => navigateTo("/register")}
          >
            Register
          </li>
          <li
            className="cursor-pointer hover:text-yellow-500 transition"
            onClick={() => scrollToSection("partner")}
          >
            Partner
          </li>
          <li
            className="cursor-pointer hover:text-yellow-500 transition"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </li>
        </ul>

        {/* Desktop Button */}
        <button
          type="button"
          onClick={() => navigateTo("/register")}
          className="hidden md:block px-5 py-2 rounded-md text-sm font-medium bg-green-700 text-white hover:bg-green-800 transition"
        >
          Register Now
        </button>

        <button
          type="button"
          onClick={() => navigateTo("/admin")}
          className={`hidden md:block rounded-md border px-4 py-2 text-sm font-medium transition ${
            scrolled
              ? "border-green-800 text-green-900 hover:bg-green-50"
              : "border-white/50 text-white hover:bg-white/10"
          }`}
        >
          Admin
        </button>

        {/* Hamburger */}
        <button
          className={`md:hidden ${scrolled ? "text-black" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden
        ${mobileOpen ? "max-h-[500px]" : "max-h-0"}`}
      >
        <div className="bg-white shadow-lg px-6 py-6 space-y-5 text-gray-700 font-medium">
          <p
            className="cursor-pointer"
            onClick={() => {
              scrollToSection("home");
              setMobileOpen(false);
            }}
          >
            Home
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              scrollToSection("about");
              setMobileOpen(false);
            }}
          >
            About
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              scrollToSection("challenges");
              setMobileOpen(false);
            }}
          >
            Challenges
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              scrollToSection("objectives");
              setMobileOpen(false);
            }}
          >
            Objectives
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              navigateTo("/register");
              setMobileOpen(false);
            }}
          >
            Register
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              scrollToSection("partner");
              setMobileOpen(false);
            }}
          >
            Partner
          </p>
          <p
            className="cursor-pointer"
            onClick={() => {
              scrollToSection("contact");
              setMobileOpen(false);
            }}
          >
            Contact
          </p>

          <button
            type="button"
            onClick={() => {
              navigateTo("/register");
              setMobileOpen(false);
            }}
            className="block w-full text-center bg-green-700 text-white py-3 rounded-md mt-3"
          >
            Register Now
          </button>

          <button
            type="button"
            onClick={() => {
              navigateTo("/admin");
              setMobileOpen(false);
            }}
            className="block w-full rounded-md border border-green-700 py-3 text-center text-green-800"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
}
