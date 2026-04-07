import { ESGPriorityCards, NatureRibbon } from "./ESGVisuals";

export default function AboutSummit({ language = "en" }) {
  const isHindi = language === "hi";
  return (
    <section id="about" className="esg-section esg-pattern-light bg-[linear-gradient(180deg,#f7fbf8_0%,#ffffff_100%)] px-6 py-28">
      <div className="esg-section-glow" />
      <div className="esg-section-band" />
      <div className="esg-orb esg-orb--emerald left-[-4rem] top-16 h-48 w-48" />
      <div className="esg-orb esg-orb--cyan right-[-3rem] top-20 h-40 w-40" />

      <div className="esg-shell">
        <div className="mx-auto max-w-4xl text-center">
          <div className="esg-badge bg-emerald-100/80 text-emerald-800">
            <span>{isHindi ? "समिट के बारे में" : "About the Summit"}</span>
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            {isHindi ? "भारत को " : "Preparing India for a "}
            <span className="text-emerald-700">
              {isHindi ? "अधिक विश्वसनीय ESG भविष्य" : "more credible ESG future"}
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-stone-600">
            {isHindi
              ? "भारत का ESG परिदृश्य स्वैच्छिक प्रयासों से आगे बढ़कर व्यावसायिक आवश्यकता बन चुका है। नियम, निवेशकों की अपेक्षाएं और वैश्विक सप्लाई-चेन का दबाव अब व्यवसायों से पर्यावरण, सामाजिक और गवर्नेंस पर स्पष्ट प्रदर्शन की मांग करता है।"
              : "India's ESG landscape is moving from voluntary signaling to operational necessity. Regulations, investor expectations, and global supply-chain pressure now require businesses to demonstrate stronger environmental discipline, social responsibility, and governance clarity."}
          </p>

          <p className="mt-5 text-base leading-8 text-stone-600">
            <span className="font-semibold text-stone-800">India ESG Summit 2026</span>{" "}
            {isHindi
              ? "भारतीय उद्योगों, विशेषकर MSMEs, को इन मांगों को निर्यात प्रतिस्पर्धा, संस्थागत भरोसे और दीर्घकालिक औद्योगिक विकास में बदलने में मदद करने के लिए बनाया गया है।"
              : "is built to help Indian industries, especially MSMEs, convert those demands into export competitiveness, institutional trust, and long-term industrial growth."}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <StatCard
            value="30%"
            label={isHindi ? "भारत के GDP का हिस्सा MSMEs से जुड़ा" : "of India's GDP linked to MSMEs"}
            accent="emerald"
            language={language}
          />
          <StatCard
            value="45%"
            label={isHindi ? "निर्यात पर MSME की ताकत का प्रभाव" : "of exports influenced by MSME strength"}
            accent="cyan"
            language={language}
          />
          <StatCard
            value="110M+"
            label={isHindi ? "औद्योगिक मजबूती से जुड़े रोजगार" : "jobs tied to industrial resilience"}
            accent="amber"
            language={language}
          />
        </div>

        <ESGPriorityCards language={language} />
      </div>

      <NatureRibbon theme="light" />
    </section>
  );
}

function StatCard({ value, label, accent, language }) {
  const accentMap = {
    emerald: "bg-emerald-500/10 text-emerald-700",
    cyan: "bg-cyan-500/10 text-cyan-700",
    amber: "bg-amber-500/10 text-amber-700",
  };

  return (
    <article className="esg-card-light rounded-[1.75rem] p-8 text-center transition duration-300 hover:-translate-y-1">
      <div className={`mx-auto inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${accentMap[accent]}`}>
        {language === "hi" ? "समिट संकेत" : "Summit signal"}
      </div>
      <h3 className="mt-5 text-4xl font-semibold tracking-tight text-stone-900">{value}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-600">{label}</p>
    </article>
  );
}
