import React from "react";

export default function AboutSummit() {
  return (
    <section id="about" className="bg-white py-28 px-6">

      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm mb-6">

          <span>🍃</span>
          <span>About the Summit</span>

        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-green-900 mb-6">
          Preparing India for a <span className="text-green-700">Sustainable Future</span>
        </h2>

        {/* Paragraph 1 */}
        <p className="text-gray-600 leading-relaxed mb-6">
          India's Environmental, Social, and Governance (ESG) landscape is undergoing a
          transformative shift from voluntary initiatives to strategic business
          imperatives. Regulatory frameworks such as SEBI's BRSR and BRSR Core,
          rising investor expectations, and global supply-chain requirements now
          make ESG compliance essential for market access and competitiveness.
        </p>

        {/* Paragraph 2 */}
        <p className="text-gray-600 leading-relaxed">
          The <span className="font-semibold text-gray-800">India ESG Summit 2026</span>
          aims to prepare Indian industries — particularly MSMEs — to align with
          global ESG standards, unlock export potential, and position India as a
          trusted sustainable manufacturing hub.
        </p>

      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-3 gap-6">

        <StatCard
          value="30%"
          label="of India's GDP from MSMEs"
        />

        <StatCard
          value="45%"
          label="of total exports"
        />

        <StatCard
          value="110M+"
          label="Jobs supported"
        />

      </div>

    </section>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white border border-green-100 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">

      <h3 className="text-3xl font-serif font-semibold text-green-900 mb-2">
        {value}
      </h3>

      <p className="text-gray-500 text-sm">
        {label}
      </p>

    </div>
  );
}