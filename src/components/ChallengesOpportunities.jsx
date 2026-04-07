import { NatureRibbon } from "./ESGVisuals";

const opportunities = [
  "New export access in ESG-sensitive markets such as the EU and North America",
  "Improved competitiveness for Uttar Pradesh MSMEs through lower waste and better resource efficiency",
  "Easier alignment with investor, buyer, and lender diligence requirements",
  "More credible positioning in global supply chains through transparent governance practices",
  "Stronger access to green and transition finance products",
  "Better resilience, reputation, and long-term operating margins",
];

export default function ChallengesOpportunities({ language = "en" }) {
  const isHindi = language === "hi";
  const localizedOpportunities = isHindi
    ? [
        "EU और North America जैसे ESG-संवेदनशील बाजारों में नए निर्यात अवसर",
        "बेहतर संसाधन दक्षता से यूपी MSMEs की प्रतिस्पर्धात्मकता में वृद्धि",
        "निवेशक, खरीदार और ऋणदाताओं की आवश्यकताओं के साथ आसान सामंजस्य",
        "पारदर्शी गवर्नेंस के जरिए वैश्विक सप्लाई-चेन में अधिक विश्वसनीय स्थिति",
        "ग्रीन और ट्रांजिशन फाइनेंस तक बेहतर पहुंच",
        "बेहतर लचीलापन, प्रतिष्ठा और दीर्घकालिक मार्जिन",
      ]
    : opportunities;
  return (
    <section id="challenges" className="esg-section esg-pattern-light bg-[linear-gradient(180deg,#eef7f0_0%,#ffffff_100%)] px-6 py-24">
      <div className="esg-section-band" />
      <div className="esg-orb esg-orb--amber -right-8 top-20 h-44 w-44" />
      <div className="esg-orb esg-orb--emerald -left-12 bottom-12 h-52 w-52" />

      <div className="esg-shell">
        <div className="mb-14 max-w-3xl">
          <div className="esg-badge bg-cyan-100/80 text-cyan-800">
            {isHindi ? "उत्तर प्रदेश के लिए अवसर" : "Opportunity for Uttar Pradesh"}
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            {isHindi
              ? "ESG केवल अनुपालन नहीं, विकास का साधन बन सकता है।"
              : "ESG can become a growth lever, not just a compliance task."}
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-600">
            {isHindi
              ? "यह समिट व्यावहारिक लाभों पर केंद्रित है: मजबूत निर्यात, बेहतर वित्त पहुंच, अधिक विश्वसनीय सप्लाई-चेन और MSMEs के लिए बेहतर प्रदर्शन।"
              : "The summit is positioned around practical upside: stronger exports, better financing access, more trusted supply chains, and better operating performance for MSMEs and industrial clusters."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="esg-card-light rounded-4xl p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              {isHindi ? "अभी क्यों" : "Why now"}
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
              {isHindi
                ? "उत्तर प्रदेश भारत की अगली ESG-तैयार विनिर्माण कहानी का नेतृत्व कर सकता है।"
                : "Uttar Pradesh can lead India’s next ESG-ready manufacturing story."}
            </h3>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              {isHindi
                ? "MSME घनत्व, निर्यात-उन्मुख जिलों और बढ़ते निवेश के साथ राज्य ESG को वास्तविक औद्योगिक लाभ में बदल सकता है।"
                : "With strong MSME density, export-oriented districts, and a growing investment pipeline, the state has the scale to turn ESG from a reporting theme into a real industrial advantage."}
            </p>

            <div className="esg-divider mt-8" />

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Metric value="75" label={isHindi ? "औद्योगिक महत्व वाले जिले" : "districts with industrial relevance"} />
              <Metric value="1K" label={isHindi ? "सब्सिडी वाले यूपी MSME टिकट लक्ष्य" : "subsidised UP MSME ticket target"} />
              <Metric value="3X" label={isHindi ? "बेहतर निवेशक भरोसा" : "better investor confidence narrative"} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {localizedOpportunities.map((item, index) => (
              <article
                key={item}
                className="esg-card-light rounded-3xl p-6 transition duration-300 hover:-translate-y-1"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                  {(isHindi ? "अवसर" : "Opportunity")} {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-sm leading-7 text-stone-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <NatureRibbon theme="light" />
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
