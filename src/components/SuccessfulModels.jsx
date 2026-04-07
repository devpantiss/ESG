import { useState } from "react";
import { NatureRibbon } from "./ESGVisuals";

const objectives = [
  "Equip MSMEs, exporters, and industry leaders with practical ESG adoption roadmaps.",
  "Connect policy, finance, and implementation stakeholders in one operator-focused forum.",
  "Enable export readiness through stronger environment, social, and governance practices.",
  "Create a platform for Uttar Pradesh to showcase scalable ESG-linked industrial growth.",
];

const successStories = [
  {
    title: "Leather cluster wastewater reduction",
    subtitle: "Kanpur MSME consortium",
    text: "Shared treatment upgrades and process discipline helped smaller units cut waste-handling costs and improve buyer trust.",
  },
  {
    title: "Energy-efficient loom modernisation",
    subtitle: "Textile MSME cluster",
    text: "Replacing legacy equipment reduced energy intensity, improved margins, and strengthened access to institutional buyers.",
  },
  {
    title: "Formal governance for family-led manufacturing",
    subtitle: "Engineering MSME case",
    text: "Basic board discipline, reporting controls, and vendor audits helped the business become more bankable and scale-ready.",
  },
];

export default function SuccessfulModels({ language = "en" }) {
  const [openStory, setOpenStory] = useState(0);
  const isHindi = language === "hi";
  const localizedObjectives = isHindi
    ? [
        "MSME, एक्सपोर्टर्स और उद्योग नेताओं को व्यावहारिक ESG रोडमैप देना।",
        "नीति, वित्त और इम्प्लीमेंटेशन हितधारकों को एक मंच पर जोड़ना।",
        "मजबूत पर्यावरण, सामाजिक और गवर्नेंस प्रक्रियाओं से निर्यात तैयारी सक्षम करना।",
        "यूपी की ESG-सक्षम औद्योगिक वृद्धि को प्रदर्शित करना।",
      ]
    : objectives;
  const localizedStories = isHindi
    ? [
        {
          title: "लेदर क्लस्टर अपशिष्ट जल में कमी",
          subtitle: "कानपुर MSME कंसोर्टियम",
          text: "साझा उपचार अपग्रेड और प्रक्रिया अनुशासन से छोटे यूनिट्स ने लागत घटाई और खरीदार भरोसा बढ़ाया।",
        },
        {
          title: "ऊर्जा-दक्ष लूम आधुनिकीकरण",
          subtitle: "टेक्सटाइल MSME क्लस्टर",
          text: "पुराने उपकरण बदलने से ऊर्जा तीव्रता घटी, मार्जिन बेहतर हुए और संस्थागत खरीदार पहुंच मजबूत हुई।",
        },
        {
          title: "परिवार-नेतृत्व विनिर्माण में औपचारिक गवर्नेंस",
          subtitle: "इंजीनियरिंग MSME केस",
          text: "बोर्ड अनुशासन, रिपोर्टिंग नियंत्रण और वेंडर ऑडिट से व्यवसाय अधिक बैंक योग्य बना।",
        },
      ]
    : successStories;

  return (
    <section id="objectives" className="esg-section esg-pattern-dark bg-[linear-gradient(180deg,#0c0a09_0%,#111827_100%)] px-6 py-24 text-white">
      <div className="esg-orb esg-orb--cyan right-[-2rem] top-16 h-44 w-44" />
      <div className="esg-orb esg-orb--amber left-[-3rem] bottom-12 h-52 w-52" />

      <div className="esg-shell">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="esg-badge bg-amber-400/10 text-amber-300">
              {isHindi ? "समिट उद्देश्य" : "Summit Objectives"}
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              {isHindi
                ? "समिट किन परिणामों को देने के लिए तैयार है।"
                : "What the summit is designed to deliver."}
            </h2>
            <div className="mt-8 space-y-4">
              {localizedObjectives.map((objective, index) => (
                <div
                  key={objective}
                  className="esg-card-dark rounded-[1.5rem] px-6 py-5 transition duration-300 hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    {(isHindi ? "उद्देश्य" : "Objective")} {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-200">{objective}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="esg-badge bg-cyan-400/10 text-cyan-300">
              {isHindi ? "सफल कहानियां" : "Successful Stories"}
            </div>
            <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white">
              {isHindi
                ? "MSME ESG कहानियां और उनके प्राप्त लाभ।"
                : "MSME ESG stories and the benefits they unlocked."}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400">
              {isHindi
                ? "बड़े कॉरपोरेट केस-स्टडी की जगह यह खंड MSME के व्यावहारिक परिणामों पर केंद्रित है: लागत बचत, निर्यात भरोसा, खरीदार विश्वसनीयता और बेहतर वित्त पहुंच।"
                : "Replacing large corporate case studies, this section focuses on practical MSME outcomes: cost savings, export confidence, buyer credibility, and better access to finance."}
            </p>

            <div className="mt-8 space-y-4">
              {localizedStories.map((story, index) => {
                const isOpen = openStory === index;
                return (
                  <article
                    key={story.title}
                    className="esg-card-dark overflow-hidden rounded-[1.5rem] transition duration-300"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      onClick={() => setOpenStory(isOpen ? -1 : index)}
                    >
                      <div>
                        <p className="text-lg font-semibold text-white">{story.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-300">
                          {story.subtitle}
                        </p>
                      </div>
                      <span className="text-2xl text-stone-400">{isOpen ? "−" : "+"}</span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/10 px-6 py-5 text-sm leading-7 text-stone-300">
                        {story.text}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <NatureRibbon theme="dark" className="opacity-80" />
    </section>
  );
}
