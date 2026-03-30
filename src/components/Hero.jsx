import { useEffect, useRef, useState } from "react";

const TARGET_DATE = new Date("April 10, 2026 09:00:00").getTime();

export default function ESGHero({ onNavigate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef(null);
  const videoLayerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = Math.max(TARGET_DATE - now, 0);

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateParallax = () => {
      frameId = 0;

      if (!sectionRef.current || !videoLayerRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const offset = Math.max(Math.min(-rect.top * 0.18, 90), -30);

      videoLayerRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.14)`;
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden bg-stone-950 px-6 pt-32 pb-24 text-white"
    >
      <div className="absolute inset-0">
        <div className="sticky top-0 h-full overflow-hidden">
          <video
            ref={videoLayerRef}
            className="h-full w-full object-cover will-change-transform"
            src="/esg.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">
            10 April 2026 · Lucknow, Uttar Pradesh
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
            India ESG Summit <span className="text-amber-300">2026</span>
          </h1>

          <p className="mt-4 text-lg font-medium text-emerald-200">
            भारत ESG सम्मेलन 2026
          </p>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-200">
            A summit focused on MSME competitiveness, export readiness, sustainable finance, and accountable
            governance, built around the full environment, social, and governance agenda.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onNavigate?.("/register")}
              className="rounded-xl bg-amber-400 px-7 py-3.5 font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              Register as Industry Participant
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.("/partners")}
              className="rounded-xl border border-white/25 px-7 py-3.5 font-semibold text-white transition hover:border-amber-300 hover:bg-white/5"
            >
              Partner with the Summit
            </button>
          </div>
        </div>

        <div className="mt-14 max-w-4xl rounded-[1.75rem] border border-white/10 bg-black/28 px-6 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="min-w-[180px]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Countdown</p>
              <p className="mt-1 text-sm leading-6 text-stone-300">
                Event clock, kept secondary to the main narrative.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <TimeBox value={timeLeft.days} label="Days" />
              <TimeBox value={timeLeft.hours} label="Hours" />
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="min-w-[86px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-stone-400">{label}</div>
    </div>
  );
}
