import { NatureRibbon } from "./ESGVisuals";

export default function PartnerSection({ language = "en", onNavigate }) {
  const isHindi = language === "hi";
  const partnershipCaps = [
    {
      icon: "🏛",
      title: isHindi ? "सरकारी और सार्वजनिक संस्थान" : "Government & Public Institutions",
      desc: isHindi
        ? "नीतिगत दिशा, राज्य समन्वय और नियामक सहयोग।"
        : "Policy direction, state facilitation, and regulatory collaboration.",
    },
    {
      icon: "🏭",
      title: isHindi ? "कॉरपोरेट और उद्योग संघ" : "Corporates & Industry Associations",
      desc: isHindi
        ? "स्पॉन्सरशिप, सप्लाई-चेन जुड़ाव और बाज़ार पहुंच।"
        : "Sponsorship, supply-chain integration, and market outreach.",
    },
    {
      icon: "📊",
      title: isHindi ? "इम्प्लीमेंटेशन और ESG पार्टनर्स" : "Implementation & ESG Partners",
      desc: isHindi
        ? "तकनीकी सहायता, टूल्स और रिपोर्टिंग समर्थन।"
        : "Technical support, diagnostics, and reporting tools.",
    },
  ];

  const partnerGroups = [
    {
      title: isHindi ? "शिक्षा सहयोगी" : "Education Partners",
      accent: "from-emerald-400/25 to-emerald-500/5 border-emerald-300/25",
      logos: [
        {
          label: isHindi ? "आईआईएम लखनऊ" : "IIM Lucknow",
          shortLabel: "IIM-L",
          logoSrc: "/LOGO/IIM_Lucknow_Logo.svg",
        },
        { label: "SSE", shortLabel: "SSE" },
        {
          label: isHindi ? "NIT लखनऊ" : "NIT Lucknow",
          shortLabel: "NIT-L",
          logoSrc: "/LOGO/Motilal_Nehru_National_Institute_of_Technology_Allahabad_logo.png",
        },
      ],
    },
    {
      title: isHindi ? "उद्योग सहयोगी" : "Industry Partners",
      accent: "from-amber-400/25 to-amber-500/5 border-amber-300/25",
      logos: [
        { label: "DICCI", shortLabel: "DICCI", logoSrc: "/LOGO/DICCI.jpeg" },
        {
          label: isHindi ? "इंडियन इंडस्ट्री एसोसिएशन" : "Indian Industry Association",
          shortLabel: "IIA",
          logoSrc: "/LOGO/IIA.jpeg",
        },
        {
          label: isHindi ? "लघु उद्योग भारती" : "Laghu Udyog Bharti",
          shortLabel: "LUB",
          logoSrc: "/LOGO/LUBE.png",
        },
      ],
    },
    {
      title: isHindi ? "सरकारी सहयोगी" : "Government Partner",
      accent: "from-cyan-400/25 to-cyan-500/5 border-cyan-300/25",
      logos: [
        {
          label: isHindi ? "उत्तर प्रदेश सरकार" : "Uttar Pradesh Government",
          shortLabel: "UP",
          logoSrc: "/LOGO/UPGOV.png",
        },
      ],
    },
  ];

  return (
    <section id="partner" className="esg-section esg-pattern-dark bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_20%)]" />
      <div className="esg-orb esg-orb--cyan right-[-2rem] top-16 h-44 w-44" />
      <div className="esg-orb esg-orb--amber left-[-2rem] bottom-10 h-40 w-40" />

      <div className="esg-shell">
        <div className="mb-14 text-center">
          <div className="esg-badge bg-cyan-400/10 text-cyan-300">
            {isHindi ? "समिट के साथ साझेदारी" : "Partner With Summit"}
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            {isHindi
              ? "पूंजी, कार्यान्वयन और पहुंच के साथ समिट से जुड़ें।"
              : "Bring capital, implementation, and reach to the summit."}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            {isHindi
              ? "स्पॉन्सर, नॉलेज पार्टनर, मीडिया पार्टनर या संस्थागत सहयोगी के रूप में जुड़ें।"
              : "Collaborate as a sponsor, knowledge partner, media partner, ecosystem enabler, or institutional ally."}
          </p>
        </div>

        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {partnershipCaps.map((item) => (
            <PartnerCard key={item.title} icon={item.icon} title={item.title} desc={item.desc} />
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-8 shadow-[0_20px_55px_rgba(15,23,42,0.55)] backdrop-blur">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-2xl font-semibold text-white">
              {isHindi ? "समिट पार्टनर" : "Summit Partners"}
            </h3>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
              {isHindi ? "लोगो प्लेसमेंट" : "Logo placement"}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {partnerGroups.map((group) => (
              <PartnerLogoGroup key={group.title} title={group.title} accent={group.accent} logos={group.logos} />
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-300">
            {isHindi
              ? "जहां लोगो फ़ाइल उपलब्ध नहीं है, वहां अस्थायी टेक्स्ट बैज दिखेगा।"
              : "Where a logo file is not available yet, a temporary text badge is shown."}
          </p>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => onNavigate?.("/partners")}
            className="rounded-xl bg-amber-400 px-8 py-4 font-semibold text-stone-950 transition hover:bg-amber-300"
          >
            {isHindi ? "साझेदारी विकल्प देखें" : "Explore Partnership"}
          </button>
        </div>
      </div>

      <NatureRibbon theme="dark" className="opacity-75" />
    </section>
  );
}

function PartnerCard({ icon, title, desc }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm leading-7 text-slate-300">{desc}</p>
    </div>
  );
}

function PartnerLogoBadge({ label, shortLabel, logoSrc }) {
  return (
    <div className="rounded-xl border border-white/15 bg-black/30 p-4 transition hover:border-white/25">
      {logoSrc ? (
        <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-lg bg-white p-2">
          <img src={logoSrc} alt={label} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div className="flex h-24 w-full items-center justify-center rounded-lg bg-white text-base font-semibold text-stone-900">
          {shortLabel}
        </div>
      )}
      <p className="mt-3 text-center text-sm text-slate-100">{label}</p>
    </div>
  );
}

function PartnerLogoGroup({ title, accent, logos }) {
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-5 ${accent}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
        {title}
      </p>
      <div className="mt-4 grid gap-3">
        {logos.map((logo) => (
          <PartnerLogoBadge
            key={logo.label}
            label={logo.label}
            shortLabel={logo.shortLabel}
            logoSrc={logo.logoSrc}
          />
        ))}
      </div>
    </div>
  );
}
