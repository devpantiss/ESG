import { Leaf, Scale, UsersRound } from "lucide-react";

export function NatureRibbon() {
  return null;
}

export function ESGPriorityCards() {
  const cards = [
    {
      title: "Environmental",
      text: "Promote cleaner production, resource efficiency, and climate-ready industrial growth across sectors.",
      icon: Leaf,
      shell: "bg-[#d9f3e8] text-emerald-900",
      line: "text-emerald-600",
      illustration: "environment",
    },
    {
      title: "Social",
      text: "Expand inclusion, workforce readiness, and equitable value creation across supply chains and communities.",
      icon: UsersRound,
      shell: "bg-[#d9eefc] text-cyan-950",
      line: "text-cyan-600",
      illustration: "social",
    },
    {
      title: "Governance",
      text: "Strengthen reporting, accountability, and institutional trust for long-term business competitiveness.",
      icon: Scale,
      shell: "bg-[#eadff8] text-violet-950",
      line: "text-violet-600",
      illustration: "governance",
    },
  ];

  return (
    <div className="mt-16">
      <div className="mb-8 flex items-center justify-center gap-4">
        <div className="h-px w-10 bg-stone-300" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500">
          Our ESG Priorities
        </p>
        <div className="h-px w-10 bg-stone-300" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.title}
              className={`relative overflow-hidden rounded-[1.9rem] border border-white/50 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)] ${card.shell}`}
            >
              <div className={`mb-5 inline-flex rounded-full border border-current/20 bg-white/40 p-3 ${card.line}`}>
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-7 text-current/85">{card.text}</p>
              <div className="mt-8">
                <PriorityArt type={card.illustration} tone={card.line} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PriorityArt({ type, tone }) {
  const artMap = {
    environment: (
      <svg viewBox="0 0 260 90" className={`h-24 w-full ${tone}`} fill="none">
        <path d="M0 80C38 64 55 64 93 74C131 84 152 90 196 82C222 77 241 76 260 80V90H0V80Z" fill="currentColor" opacity="0.25" />
        <path d="M34 78V44" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="34" cy="34" r="10" fill="currentColor" opacity="0.9" />
        <circle cx="22" cy="40" r="8" fill="currentColor" opacity="0.55" />
        <circle cx="46" cy="40" r="8" fill="currentColor" opacity="0.7" />
        <path d="M88 78L106 58H142L156 78" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M114 58L122 38H148L140 58" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" opacity="0.85" />
      </svg>
    ),
    social: (
      <svg viewBox="0 0 260 90" className={`h-24 w-full ${tone}`} fill="none">
        <path d="M0 80C36 72 55 68 92 70C129 72 158 84 196 84C226 84 244 81 260 78V90H0V80Z" fill="currentColor" opacity="0.2" />
        <circle cx="78" cy="34" r="12" fill="currentColor" opacity="0.75" />
        <circle cx="110" cy="38" r="11" fill="currentColor" opacity="0.95" />
        <path d="M66 78V56C66 49 71 44 78 44C85 44 90 49 90 56V78" fill="currentColor" opacity="0.4" />
        <path d="M98 78V57C98 50 103 45 110 45C117 45 122 50 122 57V78" fill="currentColor" opacity="0.6" />
        <rect x="150" y="48" width="38" height="24" rx="4" fill="currentColor" opacity="0.38" />
        <path d="M188 56L210 50V76H188" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    governance: (
      <svg viewBox="0 0 260 90" className={`h-24 w-full ${tone}`} fill="none">
        <path d="M0 80C36 72 67 70 104 74C141 78 164 88 206 84C228 82 244 80 260 78V90H0V80Z" fill="currentColor" opacity="0.2" />
        <path d="M76 78V36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M56 42H96" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M60 42L52 56H68L60 42Z" fill="currentColor" opacity="0.38" />
        <path d="M92 42L84 56H100L92 42Z" fill="currentColor" opacity="0.38" />
        <rect x="144" y="42" width="28" height="36" rx="4" fill="currentColor" opacity="0.38" />
        <rect x="182" y="52" width="24" height="26" rx="4" fill="currentColor" opacity="0.62" />
      </svg>
    ),
  };

  return artMap[type];
}
