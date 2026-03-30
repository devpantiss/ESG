import { NatureRibbon } from "./ESGVisuals";

export default function PartnerSection({ onNavigate }) {
  return (
    <section id="partner" className="esg-section esg-pattern-dark bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_20%)]" />
      <div className="esg-orb esg-orb--cyan right-[-2rem] top-16 h-44 w-44" />
      <div className="esg-orb esg-orb--amber left-[-2rem] bottom-10 h-40 w-40" />

      <div className="esg-shell">
        <div className="mb-16 text-center">
          <div className="esg-badge bg-cyan-400/10 text-cyan-300">Partner With Summit</div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Bring capital, implementation, and reach to the summit.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Collaborate as a sponsor, knowledge partner, media partner, ecosystem enabler, or institutional ally.
          </p>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <PartnerCard
            icon="🏛"
            title="Government Bodies & Public Institutions"
            desc="Policy support, regulatory guidance, and state facilitation."
          />

          <PartnerCard
            icon="🏭"
            title="Corporates & Industry Associations"
            desc="Sponsorship, supply-chain integration, and outreach."
          />

          <PartnerCard
            icon="🎓"
            title="Academic & Research Institutions"
            desc="Knowledge partnership, research, and training support."
          />

          <PartnerCard
            icon="📊"
            title="ESG Consultants & Solution Providers"
            desc="Implementation tools, diagnostics, and reporting support."
          />

          <PartnerCard
            icon="💼"
            title="Investors & Financial Institutions"
            desc="Program funding, green finance, and transition capital."
          />
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => onNavigate?.("/partners")}
            className="rounded-xl bg-amber-400 px-8 py-4 font-semibold text-stone-950 transition hover:bg-amber-300"
          >
            Explore Partnership
          </button>
        </div>
      </div>

      <NatureRibbon theme="dark" className="opacity-75" />
    </section>
  );
}

function PartnerCard({ icon, title, desc }) {
  return (
    <div className="esg-card-dark rounded-[1.5rem] p-8 transition duration-300 hover:-translate-y-1">
      <div className="mb-4 text-2xl">{icon}</div>
      <h4 className="text-xl font-semibold text-white">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-slate-300">{desc}</p>
    </div>
  );
}
