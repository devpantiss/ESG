const featuredVoices = [
  {
    role: "Speaker Spotlight",
    name: "Policy & Export Leaders",
    intro: "Policy voices shaping export-ready ESG pathways.",
    accent: "from-emerald-500/30 to-emerald-300/10",
  },
  {
    role: "Industry Speaker",
    name: "MSME Transformation Builders",
    intro: "Operators proving ESG can improve margins.",
    accent: "from-cyan-500/30 to-cyan-300/10",
  },
  {
    role: "Jury Circle",
    name: "Finance & Governance Jury",
    intro: "Experts evaluating scalable, accountable ESG models.",
    accent: "from-amber-500/30 to-amber-300/10",
  },
  {
    role: "Jury Circle",
    name: "Social Impact Reviewers",
    intro: "Leaders assessing inclusion, jobs, and resilience.",
    accent: "from-rose-500/25 to-orange-300/10",
  },
];

export default function SpeakerJuryShowcase() {
  return (
    <section className="esg-section esg-pattern-light bg-[linear-gradient(180deg,#f6fbf8_0%,#ffffff_100%)] px-6 py-24">
      <div className="esg-section-band" />
      <div className="esg-orb esg-orb--cyan right-[-2rem] top-12 h-40 w-40" />
      <div className="esg-orb esg-orb--amber left-[-2rem] bottom-14 h-44 w-44" />

      <div className="esg-shell">
        <div className="mb-14 max-w-3xl">
          <div className="esg-badge bg-cyan-100/80 text-cyan-800">
            Featured Voices
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            Speakers and juries who bring the full ESG lens.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            The summit experience will blend environmental transition, social inclusion, and governance rigor
            across speaker sessions, jury-led reviews, and implementation dialogues.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredVoices.map((voice) => (
            <article
              key={voice.name}
              className="esg-card-light overflow-hidden rounded-[1.75rem] transition duration-300 hover:-translate-y-1"
            >
              <div className={`relative h-64 bg-gradient-to-br ${voice.accent}`}>
                <div className="absolute inset-x-6 bottom-0 h-48 rounded-t-[999px] bg-stone-900/80" />
                <div className="absolute inset-x-10 bottom-6 rounded-[1.25rem] border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                    {voice.role}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-900">{voice.name}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-600">{voice.intro}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
