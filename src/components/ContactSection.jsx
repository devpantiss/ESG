import { NatureRibbon } from "./ESGVisuals";

export default function ContactSection() {
  return (
    <section id="contact" className="esg-section esg-pattern-light bg-[linear-gradient(180deg,#eef7f0_0%,#ffffff_100%)] px-6 py-28">
      <div className="esg-section-band" />
      <div className="esg-orb esg-orb--emerald left-[-2rem] top-16 h-40 w-40" />
      <div className="esg-orb esg-orb--cyan right-[-2rem] bottom-10 h-44 w-44" />

      <div className="esg-shell">
        <div className="mx-auto max-w-4xl text-center">
          <div className="esg-badge bg-emerald-100/80 text-emerald-800">Contact Us</div>
          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            Reach the organizing secretariat
          </h2>

          <div className="esg-card-light mx-auto mt-12 max-w-xl rounded-[2rem] p-10">
            <h3 className="text-2xl font-semibold text-stone-900">
              Organizing Secretariat
            </h3>

            <p className="mt-2 font-semibold text-emerald-700">
              India ESG Alliance
            </p>

            <div className="esg-divider mt-8" />

            <div className="mt-8 space-y-5 text-stone-700">
              <div className="flex items-center justify-center gap-2">
                <span>👤</span>
                <span className="font-medium">Dr. Sanjaya Pradhan</span>
              </div>

              <p className="text-sm text-stone-500">
                Director, India ESG Alliance
              </p>

              <div className="flex items-center justify-center gap-2">
                <span>✉️</span>
                <span>indiaesgalliance@gmail.com</span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span>📞</span>
                <span>+91 8976020243</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NatureRibbon theme="light" className="opacity-70" />
    </section>
  );
}
