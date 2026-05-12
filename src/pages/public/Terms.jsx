import React from 'react';

export default function Terms() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32 text-left">
      <section className="bg-[#0f172a] py-24">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Wilom Masvanhise Transport Solutions PVT. LTD</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none">Terms <span className="text-white/20">Of Service</span></h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100">
          <div className="prose prose-slate max-w-none space-y-12">
            <div>
              <h2 className="text-3xl font-black text-[#0f172a] mb-4 uppercase italic">1. Agreement to Terms</h2>
              <p className="text-slate-600 text-lg">By accessing our website and utilizing our import services, you agree to be bound by these Terms of Service. If you do not agree, you must cease use of our services immediately.</p>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#0f172a] mb-4 uppercase italic">2. Sourcing & Pricing</h2>
              <p className="text-slate-600">The "UK Price" listed represents the cost of the vehicle at the source. The "Delivered ZIM" price is an all-inclusive estimate including shipping, port fees, and estimated duty. Final prices may fluctuate based on currency exchange rates and ZIMRA regulation changes.</p>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#0f172a] mb-4 uppercase italic">3. Logistics Liability</h2>
              <p className="text-slate-600">Wilom Masvanhise Transport Solutions acts as your agent for UK sourcing and logistics. We ensure all vehicles are as described and documented before leaving UK soil.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}