import React from "react";

export default function SuccessfulModels() {
  return (
    <section id="objectives" className="bg-white py-28 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Top Badge */}
        <div className="text-center mb-16">

          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm mb-6">
            ⭐ Proven Success
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-green-900">
            Successful ESG Models
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Learn from India's most impactful ESG leaders and Uttar Pradesh's
            pioneering sustainability initiatives.
          </p>

        </div>

        {/* INDIA ESG CHAMPIONS */}
        <SectionTitle title="India’s ESG Champions" color="yellow" />

        <div className="grid md:grid-cols-2 gap-6 mb-20">

          <ModelCard
            icon="🌿"
            title="Tata Group"
            subtitle="Integrated ESG Leadership"
            text="Pioneer in sustainable business with carbon neutrality targets, community development across 800+ villages, and transparent governance rated among Asia's best."
          />

          <ModelCard
            icon="☀️"
            title="Adani Green Energy"
            subtitle="Renewable Energy Scale"
            text="World's largest solar power developer with 20+ GW operational capacity, driving India's clean energy transition and green job creation."
          />

          <ModelCard
            icon="♻️"
            title="ITC Limited"
            subtitle="Circular Economy"
            text="Carbon positive for 18+ years, water positive for 20+ years, and solid waste recycling positive — a global benchmark in sustainability."
          />

          <ModelCard
            icon="🏭"
            title="Mahindra & Mahindra"
            subtitle="Carbon Neutral Manufacturing"
            text="First Indian company to commit to Science Based Targets, with internal carbon pricing and 100% renewable energy across key plants."
          />

        </div>

        {/* UP HIGHLIGHTS */}
        <SectionTitle title="Uttar Pradesh Highlights" color="green" />

        <div className="grid md:grid-cols-2 gap-6">

          <ModelCard
            icon="⚡"
            title="UP Solar Energy Policy"
            subtitle="State-led Green Transition"
            text="UP's ambitious 22 GW solar target is transforming Bundelkhand and Vindhya regions into renewable energy corridors, attracting ₹1 lakh crore investment."
          />

          <ModelCard
            icon="📦"
            title="One District One Product (ODOP)"
            subtitle="Sustainable MSME Clusters"
            text="UP's flagship ODOP scheme integrates sustainable production practices across 75 districts, boosting artisan livelihoods and eco-friendly manufacturing."
          />

          <ModelCard
            icon="💧"
            title="Namami Gange in UP"
            subtitle="River Rejuvenation & ESG"
            text="Massive industrial effluent treatment in Kanpur's tannery cluster — India's largest ESG-driven industrial pollution remediation initiative."
          />

          <ModelCard
            icon="🏙"
            title="Lucknow Smart City Mission"
            subtitle="Urban Sustainability"
            text="Integrated waste management, EV adoption, and green building mandates making Lucknow a model for sustainable urban governance in India."
          />

        </div>

      </div>

    </section>
  );
}



function SectionTitle({ title, color }) {

  const lineColor =
    color === "yellow" ? "bg-yellow-500" : "bg-green-700";

  return (
    <div className="flex items-center gap-4 mb-8">

      <div className={`w-10 h-[2px] ${lineColor}`}></div>

      <h3 className="text-2xl font-serif font-semibold text-gray-900">
        {title}
      </h3>

    </div>
  );
}



function ModelCard({ icon, title, subtitle, text }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-start gap-4">

        <div className="bg-green-100 text-green-700 w-10 h-10 flex items-center justify-center rounded-lg text-lg">
          {icon}
        </div>

        <div>

          <h4 className="text-lg font-serif font-semibold text-gray-900">
            {title}
          </h4>

          <p className="text-xs text-yellow-600 uppercase tracking-wide mb-2">
            {subtitle}
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">
            {text}
          </p>

        </div>

      </div>

    </div>
  );
}