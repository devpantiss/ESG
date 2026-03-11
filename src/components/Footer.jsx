import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ESGFooter() {
  const footerRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#2f6b4f] text-white text-center py-10 px-6"
    >
      <h2 className="text-xl font-semibold mb-3">
        India ESG Summit 2026
      </h2>

      <p className="text-sm opacity-90 max-w-2xl mx-auto">
        Organised by <span className="font-medium">India ESG Alliance</span> &{" "}
        <span className="font-medium">AFC India Ltd</span> · In collaboration with
        Government of Uttar Pradesh
      </p>

      <p className="text-xs opacity-60 mt-4">
        © 2026 India ESG Alliance. All rights reserved.
      </p>
    </footer>
  );
}