import { ESGPriorityCards, NatureRibbon } from "./ESGVisuals";

export default function AboutSummit() {
  return (
    <section id="about" className="esg-section esg-pattern-light bg-[linear-gradient(180deg,#f7fbf8_0%,#ffffff_100%)] px-6 py-28">
      <div className="esg-section-glow" />
      <div className="esg-section-band" />
      <div className="esg-orb esg-orb--emerald left-[-4rem] top-16 h-48 w-48" />
      <div className="esg-orb esg-orb--cyan right-[-3rem] top-20 h-40 w-40" />

      <div className="esg-shell">
        <div className="mx-auto max-w-4xl text-center">
          <div className="esg-badge bg-emerald-100/80 text-emerald-800">
            <span>About the Summit</span>
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            Preparing India for a <span className="text-emerald-700">more credible ESG future</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-stone-600">
            India's ESG landscape is moving from voluntary signaling to operational necessity. Regulations,
            investor expectations, and global supply-chain pressure now require businesses to demonstrate stronger
            environmental discipline, social responsibility, and governance clarity.
          </p>

          <p className="mt-5 text-base leading-8 text-stone-600">
            <span className="font-semibold text-stone-800">India ESG Summit 2026</span> is built to help Indian
            industries, especially MSMEs, convert those demands into export competitiveness, institutional trust,
            and long-term industrial growth.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <StatCard value="30%" label="of India's GDP linked to MSMEs" accent="emerald" />
          <StatCard value="45%" label="of exports influenced by MSME strength" accent="cyan" />
          <StatCard value="110M+" label="jobs tied to industrial resilience" accent="amber" />
        </div>

        <ESGPriorityCards />
      </div>

      <NatureRibbon theme="light" />
    </section>
  );
}

function StatCard({ value, label, accent }) {
  const accentMap = {
    emerald: "bg-emerald-500/10 text-emerald-700",
    cyan: "bg-cyan-500/10 text-cyan-700",
    amber: "bg-amber-500/10 text-amber-700",
  };

  return (
    <article className="esg-card-light rounded-[1.75rem] p-8 text-center transition duration-300 hover:-translate-y-1">
      <div className={`mx-auto inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${accentMap[accent]}`}>
        Summit signal
      </div>
      <h3 className="mt-5 text-4xl font-semibold tracking-tight text-stone-900">{value}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-600">{label}</p>
    </article>
  );
}
