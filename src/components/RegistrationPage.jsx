import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import { getLocalizedText, registrationConfig } from "../data/registrationSchema";

export default function RegistrationPage({ onBackToSite }) {
  const [language, setLanguage] = useState(registrationConfig.defaultLang);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050807] px-6 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.18]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_62%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-32 h-72 w-72 rounded-full bg-emerald-500/8 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-20 h-80 w-80 rounded-full bg-lime-300/6 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">
              Registration
            </p>
            <h1 className="mt-2 text-4xl font-serif font-semibold text-white">
              {getLocalizedText(registrationConfig.title, language)}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-300">
              Complete the registration in steps. Once submitted, your response
              will be available to administrators in the dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-1 backdrop-blur-sm">
              {registrationConfig.supportedLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    language === lang
                      ? "bg-emerald-400 text-stone-950"
                      : "text-stone-200 hover:bg-white/8"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onBackToSite}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur-sm transition hover:border-emerald-300/30 hover:bg-white/[0.06]"
            >
              Back to homepage
            </button>
          </div>
        </div>

        <RegistrationForm language={language} />
      </div>
    </main>
  );
}
