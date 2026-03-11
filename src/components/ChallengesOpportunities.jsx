import React from "react";

export default function ChallengesOpportunities() {
  return (
    <section id="challenges" className="bg-[#ebf7eb] py-28 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-green-900">
            Challenges & <span className="text-green-700">Opportunities</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Indian industries — especially in Uttar Pradesh — face critical ESG
            hurdles, but the opportunities for global export growth are immense.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          <ChallengeCard />

          <OpportunityCard />

        </div>

      </div>

    </section>
  );
}



function ChallengeCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-red-100 text-red-500 w-10 h-10 flex items-center justify-center rounded-lg">
          ⚠
        </div>

        <h3 className="text-xl font-serif font-semibold text-gray-900">
          Key Challenges
        </h3>

      </div>

      <ul className="space-y-3 text-gray-600">

        <li>• Limited ESG awareness among MSMEs</li>
        <li>• High cost of compliance implementation</li>
        <li>• Lack of technical expertise and reporting capacity</li>
        <li>• Difficulty accessing green finance</li>
        <li>• Supply chain transparency requirements</li>
        <li>• Increasing global trade regulations</li>
        <li>• Carbon border taxes and sustainability standards</li>

      </ul>

      <div className="border-t mt-6 pt-4 text-sm text-gray-500 italic">
        Many MSMEs risk losing export opportunities without ESG alignment.
      </div>

    </div>
  );
}



function OpportunityCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

      <div className="flex items-center gap-3 mb-6">

        <div className="bg-green-100 text-green-600 w-10 h-10 flex items-center justify-center rounded-lg">
          📈
        </div>

        <h3 className="text-xl font-serif font-semibold text-gray-900">
          Opportunities for UP
        </h3>

      </div>

      <ul className="space-y-3 text-gray-600">

        <li>✔ Access to EU & US markets</li>
        <li>✔ Increased foreign investment</li>
        <li>✔ Green finance opportunities</li>
        <li>✔ Sustainable industrial growth</li>
        <li>✔ Global supply chain participation</li>
        <li>✔ Enhanced brand credibility</li>
        <li>✔ Risk reduction & resilience</li>

      </ul>

      <div className="border-t mt-6 pt-4 text-sm text-gray-500 italic">
        The summit positions Uttar Pradesh as a forward-looking ESG-ready ecosystem.
      </div>

    </div>
  );
}