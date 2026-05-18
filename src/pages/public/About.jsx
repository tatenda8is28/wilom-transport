import React from 'react';
import { ShieldCheck, Award, Globe2, Video, Anchor } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#0f172a] py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/hero-truck.jpg" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-left uppercase italic">
          <span className="text-[#dc2626] font-black tracking-[0.4em] text-[10px] block mb-4">Wilom Transport Masvanhise Solutions  PTY(LTD)</span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">Registered. <br /> Reliable. <span className="text-[#dc2626]">Affordable.</span></h1>
        </div>
      </section>

      {/* CORE MISSION - FIXED FOR MOBILE VISIBILITY */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* THE PICTURE - Now visible on mobile and ordered to show first */}
          <div className="relative h-[350px] md:h-[550px] w-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white order-1 md:order-2">
             <img 
               src="/wilom.jpg" 
               className="w-full h-full object-cover" 
               alt="Wilom Founder" 
               onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1591768793355-74d7ca7fb954?auto=format&fit=crop&q=80' }}
             />
             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl">
                <p className="text-[10px] font-black text-[#0f172a] uppercase tracking-widest">Willy Dube — Founder</p>
             </div>
          </div>

          {/* THE TEXT */}
          <div className="text-left order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-8 leading-tight italic uppercase tracking-tighter">Supplying <br /> Southern Africa.</h2>
            <div className="space-y-6 text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              <p><span className="text-[#0f172a] font-black italic"></span> We are a registered company that aims to supply Southern Africa with reliable and affordable trucks.</p>
              <p>We specialize in <span className="text-[#dc2626] font-black uppercase">MAN tractor units</span> and trailers from the UK, documenting every journey on social media to build absolute trust with our community.</p>
            </div>
            <div className="mt-12">
               <a href="https://www.tiktok.com/@willy.dube" target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 rounded-2xl font-black italic transition hover:scale-105 shadow-xl w-full md:w-auto justify-center">
                 <Video size={24} /> WATCH OUR JOURNEY
               </a>
            </div>
          </div>

        </div>
      </section>

      {/* GLOBAL LOGISTICS SECTION */}
     <section className="max-w-7xl mx-auto px-4 py-32 pb-40">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div className="text-left">
                <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] italic uppercase tracking-tighter mb-8 leading-none">Our client base <br /> is worldwide..!</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">Shipping to majority of right-hand drive countries around the World.</p>
                <div className="flex gap-6"><img src="https://flagcdn.com/mw.svg" className="h-10 w-auto rounded shadow-sm" alt="Malawi" /><img src="https://flagcdn.com/zm.svg" className="h-10 w-auto rounded shadow-sm" alt="Zambia" /><img src="https://flagcdn.com/zw.svg" className="h-10 w-auto rounded shadow-sm" alt="Zimbabwe" /><img src="https://flagcdn.com/tz.svg" className="h-10 w-auto rounded shadow-sm" alt="Tanzania" /></div>
             </div>
             <div className="bg-[#0f172a] p-10 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 text-left">
                   <h4 className="text-[#dc2626] font-black uppercase tracking-widest text-xs mb-8">African Port Destinations</h4>
                   <ul className="space-y-6">
                      <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/> <div><p className="font-black text-lg">Walvis Bay</p><p className="text-slate-500 text-[10px] uppercase">Namibia</p></div></li>
                      <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/> <div><p className="font-black text-lg">Durban</p><p className="text-slate-500 text-[10px] uppercase">South Africa</p></div></li>
                      <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/> <div><p className="font-black text-lg">Maputo</p><p className="text-slate-500 text-[10px] uppercase">Mozambique</p></div></li>
                      <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/> <div><p className="font-black text-lg">Dar es Salaam</p><p className="text-slate-500 text-[10px] uppercase">Tanzania</p></div></li>
                   </ul>
                </div>
             </div>
          </div>
        </section>
    </div>
  );
}