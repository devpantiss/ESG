import { useEffect, useState } from "react";
import gsap from "gsap";

export default function ESGHero() {

  const targetDate = new Date("April 10, 2026 09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const animate = () => {
    gsap.fromTo(
      ".time-box",
      { scale: 0.9, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {

      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
      );

      setTimeLeft({ days, hours, minutes, seconds });

      animate();

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('/hero-bg-esg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Green overlay */}
      <div className="absolute inset-0 bg-green-900/70"></div>

      <div className="relative z-10 max-w-4xl px-6">

        <p className="text-yellow-400 tracking-widest text-sm mb-4">
          10 APRIL 2026 · LUCKNOW, UTTAR PRADESH
        </p>

        <h1 className="text-6xl font-serif font-semibold leading-tight">
          India ESG Summit
        </h1>

        <h2 className="text-5xl text-yellow-400 font-bold mt-2">
          2026
        </h2>

        <p className="mt-2 text-lg opacity-90">
          भारत ESG सम्मेलन 2026
        </p>

        <p className="mt-4 text-lg opacity-90">
          Shaping Sustainable Growth & Global Competitiveness
        </p>

        <div className="flex justify-center gap-6 mt-10">

          <TimeBox value={timeLeft.days} label="DAYS" />
          <TimeBox value={timeLeft.hours} label="HOURS" />
          <TimeBox value={timeLeft.minutes} label="MINUTES" />
          <TimeBox value={timeLeft.seconds} label="SECONDS" />

        </div>

        <div className="flex justify-center gap-6 mt-10">

          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition">
            Register as Industry Participant
          </button>

          <button className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition">
            Partner with the Summit
          </button>

        </div>

      </div>
    </section>
  );
}


function TimeBox({ value, label }) {
  return (
    <div className="time-box backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-6 py-5 w-28">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs tracking-widest opacity-80">{label}</div>
    </div>
  );
}