const opportunities = [
  "New export access in ESG-sensitive markets such as the EU and North America",
  "Improved competitiveness for Uttar Pradesh MSMEs through lower waste and better resource efficiency",
  "Easier alignment with investor, buyer, and lender diligence requirements",
  "More credible positioning in global supply chains through transparent governance practices",
  "Stronger access to green and transition finance products",
  "Better resilience, reputation, and long-term operating margins",
];

export default function ChallengesOpportunities() {
  return (
    <section id="challenges" className="esg-section esg-pattern-light bg-[linear-gradient(180deg,#eef7f0_0%,#ffffff_100%)] px-6 py-24">
      <div className="esg-section-band" />
      <div className="esg-orb esg-orb--amber right-[-2rem] top-20 h-44 w-44" />
      <div className="esg-orb esg-orb--emerald left-[-3rem] bottom-12 h-52 w-52" />

      <div className="esg-shell">
        <div className="mb-14 max-w-3xl">
          <div className="esg-badge bg-cyan-100/80 text-cyan-800">Opportunity for Uttar Pradesh</div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            ESG can become a growth lever, not just a compliance task.
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-600">
            The summit is positioned around practical upside: stronger exports, better financing access, more
            trusted supply chains, and better operating performance for MSMEs and industrial clusters.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="esg-card-light rounded-[2rem] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">Why now</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              Uttar Pradesh can lead India’s next ESG-ready manufacturing story.
            </h3>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              With strong MSME density, export-oriented districts, and a growing investment pipeline, the state has
              the scale to turn ESG from a reporting theme into a real industrial advantage.
            </p>

            <div className="esg-divider mt-8" />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Metric value="75" label="districts with industrial relevance" />
              <Metric value="1K" label="subsidised UP MSME ticket target" />
              <Metric value="3X" label="better investor confidence narrative" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {opportunities.map((item, index) => (
              <article
                key={item}
                className="esg-card-light rounded-[1.5rem] p-6 transition duration-300 hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Opportunity {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-sm leading-7 text-stone-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-5 shadow-sm">
      <p className="text-2xl font-semibold text-stone-900">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone-500">{label}</p>
    </div>
  );
}
