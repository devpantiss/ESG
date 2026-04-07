import { NatureRibbon } from "./ESGVisuals";

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

export default function ExportOpportunitiesSection({ language = "en" }) {
  const isHindi = language === "hi";
  const themes = isHindi
    ? [
        {
          title: "अनुपालन के जरिए निर्यात तैयारी",
          text: "ESG-अनुरूप संचालन MSMEs को वैश्विक खरीदारों की अपेक्षाएं पूरी करने में मदद करता है।",
        },
        {
          title: "कम जोखिम वाला बाजार प्रवेश",
          text: "गवर्नेंस और ट्रेसबिलिटी आयातकों, ऋणदाताओं और पार्टनर्स के साथ विश्वसनीयता बढ़ाती है।",
        },
        {
          title: "मजबूत मूल्य और मार्जिन कहानी",
          text: "दक्षता और जिम्मेदार सोर्सिंग बाजार में स्थिति मजबूत करते हुए मार्जिन सुरक्षित रखती है।",
        },
      ]
    : exportThemes;
  return (
    <section id="export" className="esg-section esg-pattern-dark relative isolate min-h-[135vh] overflow-hidden px-6 py-24 text-white lg:min-h-[145vh]">
      <div className="absolute inset-0">
        <div className="sticky top-0 h-full overflow-hidden">
          <video
            className="h-full w-full scale-110 object-cover"
            src="/ESG_Video/Combined_ESG.mp4"
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
            {isHindi ? "निर्यात अवसर" : "Export Opportunities"}
          </div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            {isHindi
              ? "कैसे ESG बेहतर निर्यात अवसर खोल सकता है।"
              : "How ESG can unlock stronger export opportunities."}
          </h2>
          <p className="mt-5 text-base leading-8 text-stone-200">
            {isHindi
              ? "वैश्विक खरीदार अब सप्लायर्स का मूल्यांकन केवल लागत और गुणवत्ता से नहीं, बल्कि ऊर्जा उपयोग, उत्सर्जन, श्रम मानकों और गवर्नेंस नियंत्रण से भी करते हैं। भारतीय MSMEs के लिए ESG बेहतर निर्यात पहुंच का रास्ता बन रहा है।"
              : "Global buyers increasingly evaluate suppliers not only on cost and quality, but also on energy use, emissions, labor standards, traceability, and governance controls. For Indian MSMEs, ESG is becoming a route to better export access rather than a separate compliance burden."}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="esg-card-dark rounded-[1.75rem] p-8 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {isHindi ? "यह क्यों महत्वपूर्ण है" : "Why it matters"}
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-100">
              <li>{isHindi ? "यूरोप और उत्तर अमेरिका के खरीदार ESG-तैयार सप्लायर्स को प्राथमिकता दे रहे हैं।" : "Buyers in Europe and North America increasingly prefer ESG-ready suppliers."}</li>
              <li>{isHindi ? "पारदर्शी गवर्नेंस से ऋणदाताओं और संस्थागत साझेदारों का भरोसा बढ़ता है।" : "Transparent governance improves lender confidence and institutional partnerships."}</li>
              <li>{isHindi ? "स्वच्छ उत्पादन और बेहतर कार्यबल अभ्यास से संचालन मजबूत बनता है।" : "Cleaner production and better workforce practices create stronger, more resilient operations."}</li>
              <li>{isHindi ? "ESG की स्थिति यूपी क्लस्टर्स को केवल कीमत नहीं, भरोसे पर प्रतिस्पर्धा करने में मदद करती है।" : "ESG positioning can help Uttar Pradesh clusters compete on trust, not only price."}</li>
            </ul>
          </div>

          <div className="grid gap-4">
            {themes.map((theme) => (
              <article
                key={theme.title}
                className="esg-card-dark rounded-3xl p-6 backdrop-blur transition duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-white">{theme.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-200">{theme.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <NatureRibbon theme="dark" className="opacity-80" />
    </section>
  );
}
