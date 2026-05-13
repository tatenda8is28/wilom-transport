import React from 'react';

export default function Terms() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32 text-left">
      <section className="bg-[#0f172a] py-24">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Wilom Masvanhise Transport Solutions PVT. LTD</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-none">Terms <span className="text-white/20">Of Service</span></h1>
          <p className="text-slate-400 mt-6 font-bold uppercase text-[10px] tracking-widest">Version 1.1 — May 2025</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-100">
          <div className="prose prose-slate max-w-none space-y-10">
            
            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">1. Scope of Service</h2>
              <p className="text-slate-600 leading-relaxed">
                Wilom Masvanhise Transport Solutions ("Wilom") provides specialized vehicle sourcing and logistics services from the United Kingdom to Southern Africa. By using this website, you acknowledge that Wilom acts as a facilitator and logistics coordinator for international vehicle imports.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">2. Pricing & Estimates</h2>
              <p className="text-slate-600">
                All prices listed as "Delivered ZIM" are comprehensive estimates. These include the UK purchase price, international shipping, and estimated port fees. Final costs may vary based on ZIMRA duty calculations at the time of arrival and current currency exchange rates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">3. Vehicle Condition</h2>
              <p className="text-slate-600">
                While Wilom sources from reputable UK fleets and conducts inspections, all used vehicles are sold based on their UK maintenance history. Clients are encouraged to review full technical specs and photos provided in the "Full Specs" section before committing to a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">4. Shipping & Liability</h2>
              <p className="text-slate-600">
                Wilom manages the logistics chain including UK port delivery, maritime shipping, and arrival at Beira/Durban. Liability for the vehicle during maritime transit is governed by the carrier's bill of lading and international maritime law.
              </p>
            </section>

            <section className="pt-10 border-t border-slate-100">
               <p className="text-slate-400 font-bold italic text-sm">
                 For full contractual agreements regarding a specific vehicle import, please contact our Harare HQ directly.
               </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}