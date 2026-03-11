import React from "react";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#ebf7eb] py-28 px-6">

      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-green-900 mb-12">
          Contact <span className="text-green-700">Us</span>
        </h2>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm max-w-xl mx-auto">

          <h3 className="text-xl font-serif font-semibold text-gray-900">
            Organizing Secretariat
          </h3>

          <p className="text-green-700 font-semibold mt-2">
            India ESG Alliance
          </p>

          {/* Person */}
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-800">

            <span>👤</span>
            <span className="font-medium">Dr. Sanjaya Pradhan</span>

          </div>

          <p className="text-gray-500 text-sm mt-1">
            Director, India ESG Alliance
          </p>

          {/* Email */}
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-700">

            <span>✉️</span>
            <span>indiaesgalliance@gmail.com</span>

          </div>

          {/* Phone */}
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">

            <span>📞</span>
            <span>+91 8976020243</span>

          </div>

        </div>

      </div>

    </section>
  );
}