export default function PartnerPage({
  language = "en",
  onLanguageChange,
  onBackToSite,
}) {
  const isHindi = language === "hi";
  const partnershipTracks = [
    {
      title: isHindi ? "निवेशक और वित्तीय संस्थान" : "Investors & Financial Institutions",
      summary: isHindi
        ? "MSMEs और एक्सपोर्टर्स के लिए पूंजी पहुंच, ट्रांजिशन फाइनेंस और ESG-लिंक्ड लेंडिंग को आकार दें।"
        : "Shape capital access, transition finance, and ESG-linked lending pathways for MSMEs and exporters.",
      points: isHindi
        ? ["ग्रीन क्रेडिट उत्पाद", "ट्रांजिशन-फाइनेंस राउंडटेबल", "निवेशक शोकेस दृश्यता"]
        : ["Green credit products", "Transition-finance roundtables", "Investor showcase visibility"],
    },
    {
      title: isHindi ? "कॉरपोरेट्स और उद्योग संघ" : "Corporates & Industry Associations",
      summary: isHindi
        ? "क्लस्टर्स के लिए सप्लाई-चेन ट्रांसफॉर्मेशन, खरीदार-विक्रेता संवाद और इम्प्लीमेंटेशन प्लेबुक का नेतृत्व करें।"
        : "Lead supply-chain transformation, buyer-seller dialogue, and implementation playbooks for clusters.",
      points: isHindi
        ? ["को-ब्रांडेड सत्र", "क्लस्टर सक्रियण", "नीति और बाजार सहभागिता"]
        : ["Co-branded sessions", "Cluster activation", "Policy and market engagement"],
    },
    {
      title: isHindi ? "नॉलेज और इम्प्लीमेंटेशन पार्टनर्स" : "Knowledge & Implementation Partners",
      summary: isHindi
        ? "फ्रेमवर्क, डायग्नोस्टिक्स, रिपोर्टिंग टूल्स और तकनीकी सहयोग समिट तक लाएं।"
        : "Bring frameworks, diagnostics, reporting tools, and technical support to the summit floor.",
      points: isHindi
        ? ["लाइव क्लिनिक्स", "टेक्निकल वर्कशॉप", "MSME सलाह डेस्क"]
        : ["Live clinics", "Technical workshops", "MSME advisory desks"],
    },
  ];

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(21,128,61,0.26),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(14,116,144,0.22),_transparent_30%),#0c0a09] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={onBackToSite}
            className="mb-8 rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:border-amber-400 hover:text-white"
          >
            {isHindi ? "होम पर वापस" : "Back to home"}
          </button>

          <button
            type="button"
            onClick={() => onLanguageChange?.(isHindi ? "en" : "hi")}
            className="mb-8 ml-3 rounded-full border border-white/15 px-4 py-2 text-sm text-stone-200 transition hover:border-amber-400 hover:text-white"
          >
            {isHindi ? "EN" : "हिंदी"}
          </button>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">
                {isHindi ? "समिट के साथ साझेदारी" : "Partner With The Summit"}
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                {isHindi
                  ? "वह ESG मार्केटप्लेस बनाएं जिसकी उत्तर प्रदेश को अब जरूरत है।"
                  : "Build the ESG marketplace that Uttar Pradesh needs next."}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
                {isHindi
                  ? "India ESG Summit 2026 MSMEs, एक्सपोर्टर्स, निवेशकों और सॉल्यूशन प्रदाताओं के लिए डील, नीति और इम्प्लीमेंटेशन प्लेटफॉर्म है।"
                  : "India ESG Summit 2026 is designed as a deal, policy, and implementation platform for MSMEs, exporters, investors, institutions, and solution providers. Partnerships are structured around real operator value, not logo placement."}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                {isHindi ? "साझेदारी परिणाम" : "Partnership outcomes"}
              </p>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-stone-200">
                <li>{isHindi ? "MSME और निर्यात-केंद्रित निर्णयकर्ताओं तक रणनीतिक पहुंच" : "Strategic access to MSME and export-focused decision makers"}</li>
                <li>{isHindi ? "नीति, वित्त और स्थिरता चर्चाओं में उच्च-विश्वास स्थिति" : "High-trust positioning in policy, finance, and sustainability conversations"}</li>
                <li>{isHindi ? "क्यूरेटेड स्पीकिंग, वर्कशॉप और मैचमेकिंग प्रारूप" : "Curated speaking, workshop, and matchmaking formats"}</li>
                <li>{isHindi ? "समिट संचार में ब्रांड एकीकरण" : "Brand integration across summit communications and operator touchpoints"}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {isHindi ? "ट्रैक्स" : "Tracks"}
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              {isHindi ? "पार्टनर्स कहां फिट होते हैं" : "Where partners fit"}
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-400">
              {isHindi
                ? "हर ट्रैक स्पष्ट मूल्य विनिमय पर बना है: प्रभाव, बाजार पहुंच, विचार नेतृत्व और विश्वसनीय कार्यान्वयन।"
                : "Each track is built around a clear value exchange: influence, market access, thought leadership, and implementation credibility."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {partnershipTracks.map((track) => (
              <article
                key={track.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <h3 className="text-2xl font-semibold text-white">{track.title}</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">{track.summary}</p>
                <ul className="mt-6 space-y-3 text-sm text-stone-400">
                  {track.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-amber-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
