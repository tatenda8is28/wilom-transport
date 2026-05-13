import React from 'react';

export default function Privacy() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32 text-left">
      {/* HERO */}
      <section className="bg-[#0f172a] py-24">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Wilom Masvanhise Transport Solutions PVT. LTD</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none">Privacy <span className="text-white/20">Policy</span></h1>
          <p className="text-slate-400 mt-6 font-bold uppercase text-[10px] tracking-widest">Effective Date: 11 May 2025</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
          <div className="prose prose-slate max-w-none space-y-10">
            
            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Wilom Masvanhise Transport Solutions PVT. LTD ("we", "us", or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard the personal data of individuals who use our website, request our transport and logistics services, or otherwise interact with us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">2. Personal Data We Collect</h2>
              <p className="text-slate-600 mb-4">We collect personal data only to the extent necessary to provide our transport and logistics solutions. This includes:</p>
              <ul className="list-disc ml-6 space-y-2 text-slate-600 font-medium">
                <li>Identification and contact details: full name, email, physical address, and phone.</li>
                <li>Service-related information: shipment details, delivery instructions, and transaction history.</li>
                <li>Communication records: messages submitted via website forms or customer support.</li>
                <li>Website usage & Technical data: IP addresses, browser types, and cookies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">3. Legal Basis for Processing</h2>
              <p className="text-slate-600">We process data for the performance of contracts, legitimate business interests (security and fraud prevention), legal obligations, and where you have provided explicit consent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">4. How We Share Your Data</h2>
              <p className="text-slate-600">We do not sell or trade your data. Sharing is limited to regulatory authorities, fraud prevention organisations, debt recovery agents, and trusted third-party service providers (IT/Payments) who are contractually bound to security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">5. Your Rights</h2>
              <p className="text-slate-600">You have the right to access, rectify, or erase your data. You may also object to processing or withdraw consent for marketing at any time.</p>
            </section>

            <section className="pt-10 border-t border-slate-100">
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">11. Contact Us</h2>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 font-bold text-slate-700 space-y-2">
                <p>Wilom Masvanhise Transport Solutions PVT. LTD</p>
                <p>Email: info@wilomtransport.co.za</p>
                <p>Telephone: +263 78 828 6326</p>
                <p>Postal Address: 5790 Granary Phase 3, Harare, Zimbabwe</p>
              </div>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}