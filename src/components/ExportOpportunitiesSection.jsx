const exportThemes = [
  {
    title: "Export readiness through compliance",
    text: "ESG-aligned operations make it easier for MSMEs to satisfy buyer due diligence, supplier onboarding, and international reporting expectations.",
  },
  {
    title: "Lower-risk market entry",
    text: "Governance discipline, traceability, and labor practices improve credibility with importers, lenders, and distribution partners.",
  },
  {
    title: "Stronger price and margin story",
    text: "Efficiency upgrades, cleaner production, and responsible sourcing help enterprises protect margins while improving market positioning.",
  },
];

export default function ExportOpportunitiesSection() {
  return (
    <section id="export" className="esg-section esg-pattern-dark relative isolate min-h-[135vh] overflow-hidden px-6 py-24 text-white lg:min-h-[145vh]">
      <div className="absolute inset-0">
        <div className="sticky top-0 h-full overflow-hidden">
          <video
            className="h-full w-full scale-110 object-cover"
            src="/world.mov"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* <div className="absolute inset-0 bg-black/45" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/55 to-stone-950/85" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-transparent to-stone-950/85" /> */}
        </div>
      </div>

      <div className="esg-shell relative flex min-h-[calc(135vh-12rem)] flex-col justify-center lg:min-h-[calc(145vh-12rem)]">
        <div className="max-w-3xl">
          <div className="esg-badge bg-amber-400/10 text-amber-300">
            Export Opportunities
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            How ESG can unlock stronger export opportunities.
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-200">
            Global buyers increasingly evaluate suppliers not only on cost and quality, but also on energy use,
            emissions, labor standards, traceability, and governance controls. For Indian MSMEs, ESG is becoming a
            route to better export access rather than a separate compliance burden.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="esg-card-dark rounded-[1.75rem] p-8 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Why it matters
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-100">
              <li>Buyers in Europe and North America increasingly prefer ESG-ready suppliers.</li>
              <li>Transparent governance improves lender confidence and institutional partnerships.</li>
              <li>Cleaner production and better workforce practices create stronger, more resilient operations.</li>
              <li>ESG positioning can help Uttar Pradesh clusters compete on trust, not only price.</li>
            </ul>
          </div>

          <div className="grid gap-4">
            {exportThemes.map((theme) => (
              <article
                key={theme.title}
                className="esg-card-dark rounded-[1.5rem] p-6 backdrop-blur transition duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-white">{theme.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-200">{theme.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
