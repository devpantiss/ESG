import React from "react";

export default function RegisterSection() {
  return (
    <section id="register" className="bg-[#ebf7eb] py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-green-900">
            Register as{" "}
            <span className="text-green-700">Industry Participant</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Join corporate leaders, MSMEs, exporters, financial institutions,
            ESG professionals, and government officials.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <RegisterCard
            icon="🏢"
            title="Corporate"
            price="₹10,000"
            desc="Full access + networking"
          />

          <RegisterCard
            icon="🛡"
            title="MSME"
            price="₹5,000"
            desc="Subsidized participation"
          />

          <RegisterCard
            icon="🚀"
            title="Startup"
            price="₹3,000"
            desc="Exposure & learning"
          />

          <RegisterCard
            icon="👥"
            title="Government"
            price="Complimentary"
            desc="Official participation"
          />

          <RegisterCard
            icon="🎓"
            title="Student / Researcher"
            price="₹2,000"
            desc="Knowledge access"
          />
        </div>

        {/* Registration Includes */}
        <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
            Registration Includes
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-gray-600 text-left mb-10">
            <Benefit>Access to all sessions</Benefit>
            <Benefit>Networking opportunities</Benefit>
            <Benefit>ESG Handbook</Benefit>
            <Benefit>Delegate kit</Benefit>
            <Benefit>Lunch & refreshments</Benefit>
            <Benefit>Certificate of participation</Benefit>
          </div>

          <a
            href="https://forms.gle/ixsurKeVzWQ1gdYbA"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-5 py-2 rounded-md text-sm font-medium bg-green-700 text-white hover:bg-green-800 transition"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}

function RegisterCard({ icon, title, price, desc }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
      <div className="text-3xl mb-4">{icon}</div>

      <h4 className="text-lg font-serif font-semibold text-gray-900">
        {title}
      </h4>

      <p className="text-2xl font-semibold text-green-700 mt-2">{price}</p>

      <p className="text-gray-500 text-sm mt-2">{desc}</p>
    </div>
  );
}

function Benefit({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>

      <span>{children}</span>
    </div>
  );
}
