import React from "react";

export default function PartnerSection() {
  return (
    <section id="partner" className="bg-white py-28 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-green-900">
            Partner with the <span className="text-green-700">Summit</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Collaborate as a sponsor, knowledge partner, media partner,
            or institutional ally.
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <PartnerCard
            icon="🏛"
            title="Government Bodies & Public Institutions"
            desc="Policy support, regulatory guidance, state facilitation"
          />

          <PartnerCard
            icon="🏭"
            title="Corporates & Industry Associations"
            desc="Sponsorship, supply-chain integration, outreach"
          />

          <PartnerCard
            icon="🎓"
            title="Academic & Research Institutions"
            desc="Knowledge partnership, research, training"
          />

          <PartnerCard
            icon="📊"
            title="ESG Consultants & Solution Providers"
            desc="Implementation tools, diagnostics, reporting support"
          />

          <PartnerCard
            icon="❤️"
            title="CSR Foundations & Investors"
            desc="Program funding and sustainability initiatives"
          />

        </div>

        {/* Button */}
        <div className="text-center">

          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition shadow-md">
            Explore Partnership
          </button>

        </div>

      </div>

    </section>
  );
}



function PartnerCard({ icon, title, desc }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition">

      <div className="text-2xl mb-4">{icon}</div>

      <h4 className="text-lg font-serif font-semibold text-gray-900 mb-2">
        {title}
      </h4>

      <p className="text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>

    </div>
  );
}