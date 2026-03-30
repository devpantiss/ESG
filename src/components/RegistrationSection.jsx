import { NatureRibbon } from "./ESGVisuals";

export default function RegisterSection({ onNavigate }) {
  return (
    <section id="register" className="esg-section esg-pattern-light bg-[linear-gradient(180deg,#ffffff_0%,#f3faf6_100%)] px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_26%)]" />
      <div className="esg-orb esg-orb--emerald right-[-2rem] top-20 h-40 w-40" />
      <div className="esg-orb esg-orb--cyan left-[-2rem] bottom-8 h-48 w-48" />

      <div className="esg-shell">
        <div className="mb-16 text-center">
          <div className="esg-badge bg-emerald-100/80 text-emerald-800">Registration</div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            Register as <span className="text-emerald-700">Industry Participant</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-stone-600">
            Built for corporates, MSMEs, startups, exporters, ESG professionals, investors, and institutions.
          </p>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <RegisterCard
            icon="🏢"
            title="Corporate"
            price="₹10,000"
            desc="Leadership access, networking, and summit floor participation."
          />

          <RegisterCard
            icon="🚀"
            title="MSME + Startup"
            price="₹5,000"
            desc="Practical sessions, finance access, and growth-focused networking."
            subline="Subsidised Price For UP MSME's ₹1,000"
            featured
          />

          <RegisterCard
            icon="🤝"
            title="Institutional Delegate"
            price="₹7,500"
            desc="For consultants, investors, banks, ecosystem enablers, and sector experts."
          />
        </div>

        <div className="esg-card-light mx-auto max-w-4xl rounded-[2rem] p-10 text-center">
          <h3 className="text-2xl font-semibold text-stone-900">
            Registration includes
          </h3>

          <div className="mt-8 grid gap-4 text-left text-stone-600 md:grid-cols-2">
            <Benefit>Access to all summit sessions</Benefit>
            <Benefit>Networking and matchmaking opportunities</Benefit>
            <Benefit>ESG handbook and delegate kit</Benefit>
            <Benefit>Certificate of participation</Benefit>
          </div>

          <div className="esg-divider mt-8" />

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-stone-600">
            Registration runs on the app’s dedicated step flow and stores submissions directly in the working system,
            not an external form.
          </p>

          <button
            type="button"
            onClick={() => onNavigate?.("/register")}
            className="mt-8 rounded-xl bg-emerald-700 px-6 py-3 font-medium text-white transition hover:bg-emerald-800"
          >
            Start Registration
          </button>
        </div>
      </div>

      <NatureRibbon theme="light" />
    </section>
  );
}

function RegisterCard({ icon, title, price, desc, subline, featured = false }) {
  return (
    <div
      className={`rounded-[1.5rem] p-8 text-center transition duration-300 hover:-translate-y-1 ${
        featured
          ? "esg-card-light border-emerald-300"
          : "esg-card-light"
      }`}
    >
      <div className="mb-4 text-3xl">{icon}</div>
      <h4 className="text-xl font-semibold text-stone-900">{title}</h4>
      <p className="mt-3 text-3xl font-semibold text-emerald-700">{price}</p>
      <p className="mt-3 text-sm leading-7 text-stone-600">{desc}</p>
      {subline ? (
        <p className="mt-4 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
          {subline}
        </p>
      ) : null}
    </div>
  );
}

function Benefit({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-amber-500" />
      <span>{children}</span>
    </div>
  );
}
