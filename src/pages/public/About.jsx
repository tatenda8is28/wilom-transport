import React from 'react';
import { Truck, ShieldCheck, Globe2, Anchor, Award, ArrowRight } from 'lucide-react';

function ValueCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-left">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#dc2626] mb-6">
        {icon}
      </div>
      <h3 className="font-black text-xl text-[#0f172a] mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      
      {/* HERO SECTION */}
      <section className="relative bg-[#0f172a] py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/hero-truck.jpg" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-left">
          <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Established & Registered</span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter italic leading-none">
            DRIVING <span className="text-[#dc2626]">SOUTHERN AFRICA</span> <br /> FORWARD.
          </h1>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-black text-[#0f172a] mb-8 leading-tight">Your Trusted UK-to-Zim <br /> Import Partner.</h2>
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                <span className="text-[#0f172a] font-black">WILOM TRANS</span> is a registered company dedicated to supplying Southern Africa with premium, reliable, and affordable heavy vehicles.
              </p>
              <p>
                We specialize in sourcing the world’s best engineering—specifically <span className="text-[#dc2626] font-black">MAN tractor units</span>, rigids, and trailers—directly from the United Kingdom and delivering them to your doorstep in Zimbabwe.
              </p>
              <p>
                Our mission is simple: to remove the stress and high costs of vehicle importation, giving local businesses access to the same quality of machinery found on European roads.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full h-[400px] rounded-[3rem] overflow-hidden shadow-xl">
             <img src="/wilom.jpg" className="w-full h-full object-cover" alt="MAN Truck" />
          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-left mb-16">
          <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Our Core Pillars</span>
          <h2 className="text-5xl font-black text-[#0f172a] tracking-tight">The Wilom Standard</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<ShieldCheck size={32} />}
            title="Registered & Regulated"
            desc="We operate as a fully registered entity, ensuring every transaction and import is handled legally and transparently."
          />
          <ValueCard 
            icon={<Award size={32} />}
            title="Specialized Sourcing"
            desc="Expert knowledge in MAN, Scania, and Mercedes-Benz units. We don't just buy trucks; we inspect for long-term reliability."
          />
          <ValueCard 
            icon={<Globe2 size={32} />}
            title="Cross-Border Delivery"
            desc="From UK port logistics to ZIMRA clearance, we handle the entire pipeline so you can focus on your business."
          />
        </div>
      </section>

      {/* THE PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-[#0f172a] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5">
            <Truck size={400} />
          </div>
          
          <div className="relative z-10 text-left max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-10">How we work</h2>
            <div className="space-y-12">
              <div className="flex gap-8 items-start">
                <span className="text-5xl font-black text-[#dc2626] italic">01</span>
                <div>
                  <h4 className="text-xl font-black mb-2 uppercase">UK Sourcing</h4>
                  <p className="text-slate-400 font-medium">We hand-pick units from the UK's most reputable fleet owners and dealers.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="text-5xl font-black text-[#dc2626] italic">02</span>
                <div>
                  <h4 className="text-xl font-black mb-2 uppercase">Shipping & Port Logistics</h4>
                  <p className="text-slate-400 font-medium">Safe transit through major routes (Beira/Durban) with real-time tracking.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="text-5xl font-black text-[#dc2626] italic">03</span>
                <div>
                  <h4 className="text-xl font-black mb-2 uppercase">Harare Arrival</h4>
                  <p className="text-slate-400 font-medium">Final delivery and hand-over at our Granary Phase 3 location in Harare.</p>
                </div>
              </div>
            </div>

            <button className="mt-16 bg-[#dc2626] text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-red-700 transition shadow-2xl shadow-red-900/40">
              Check Our Stock <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}