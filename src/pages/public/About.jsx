import React from 'react';
import { ShieldCheck, Award, Globe2, Video, Anchor } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <section className="relative bg-[#0f172a] py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><img src="/hero-truck.jpg" className="w-full h-full object-cover" alt="" /></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-left uppercase italic">
          <span className="text-[#dc2626] font-black tracking-[0.4em] text-[10px] block mb-4">Wilom Trans Solutions</span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">Registered. <br /> Reliable. <span className="text-[#dc2626]">Affordable.</span></h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl border border-slate-100 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h2 className="text-4xl font-black text-[#0f172a] mb-8 leading-tight italic uppercase tracking-tighter">Supplying <br /> Southern Africa.</h2>
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
              <p><span className="text-[#0f172a] font-black italic">WILOM TRANS</span> is a registered company that aims to supply Southern Africa with reliable and affordable trucks.</p>
              <p>We specialize in <span className="text-[#dc2626] font-black uppercase">MAN tractor units</span> and trailers from the UK, documenting every journey on social media to build absolute trust.</p>
            </div>
            <div className="mt-12">
               <a href="https://www.tiktok.com/@willy.dube" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl font-black italic transition hover:scale-105 shadow-xl">
                 <Video size={24} /> WATCH OUR JOURNEY
               </a>
            </div>
          </div>
          <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white hidden md:block">
             <img src="wilom.jpg" className="w-full h-full object-cover" alt="Truck" />
          </div>
        </div>
      </section>

      {/* GLOBAL SECTION REPEATED ON ABOUT PAGE */}
      <section className="max-w-7xl mx-auto px-4 py-32 grid md:grid-cols-2 gap-16 items-center">
         <div className="text-left">
            <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Global Logistics</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] italic uppercase tracking-tighter mb-8 leading-none">Our client base <br /> is worldwide..!</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">Shipping to right-hand drive nations across Africa, Asia, and The Caribbean with full documentation and port logistics support.</p>
            <div className="flex gap-6">
              <img src="https://flagcdn.com/mw.svg" className="h-10 w-auto rounded" alt="Malawi" />
              <img src="https://flagcdn.com/zm.svg" className="h-10 w-auto rounded" alt="Zambia" />
              <img src="https://flagcdn.com/zw.svg" className="h-10 w-auto rounded" alt="Zimbabwe" />
              <img src="https://flagcdn.com/tz.svg" className="h-10 w-auto rounded" alt="Tanzania" />
            </div>
         </div>
         <div className="bg-[#0f172a] p-10 rounded-[3rem] text-white text-left">
            <h4 className="text-[#dc2626] font-black uppercase tracking-widest text-[10px] mb-8">Service Destinations</h4>
            <ul className="space-y-6">
               <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/><span className="font-black text-lg italic">Walvis Bay, Namibia</span></li>
               <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/><span className="font-black text-lg italic">Durban, South Africa</span></li>
               <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/><span className="font-black text-lg italic">Dar es Salaam, Tanzania</span></li>
            </ul>
         </div>
      </section>
    </div>
  );
}