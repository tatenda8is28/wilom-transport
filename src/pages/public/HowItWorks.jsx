import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* MAIN CONTAINER - MATCHING SCREENSHOT */}
        <div className="bg-[#0f172a] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
          
          {/* GHOST TRUCK ICON BACKGROUND */}
          <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
            <Truck size={600} />
          </div>

          <div className="relative z-10 text-left max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-16">
              HOW WE <span className="text-white/20">WORK</span>
            </h1>

            <div className="space-y-16">
              {/* STEP 01 */}
              <div className="flex gap-8 md:gap-12 items-start group">
                <span className="text-6xl md:text-8xl font-black text-[#dc2626] italic leading-none opacity-80 group-hover:opacity-100 transition-opacity">01</span>
                <div className="pt-2 md:pt-4">
                  <h4 className="text-2xl md:text-3xl font-black mb-3 uppercase tracking-tight">UK SOURCING</h4>
                  <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                    We hand-pick units from the UK's most reputable fleet owners and dealers, ensuring high maintenance standards.
                  </p>
                </div>
              </div>

              {/* STEP 02 */}
              <div className="flex gap-8 md:gap-12 items-start group">
                <span className="text-6xl md:text-8xl font-black text-[#dc2626] italic leading-none opacity-80 group-hover:opacity-100 transition-opacity">02</span>
                <div className="pt-2 md:pt-4">
                  <h4 className="text-2xl md:text-3xl font-black mb-3 uppercase tracking-tight">SHIPPING & PORT LOGISTICS</h4>
                  <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                    Safe transit through major routes like Beira or Durban with real-time updates and professional clearing agents.
                  </p>
                </div>
              </div>

              {/* STEP 03 */}
              <div className="flex gap-8 md:gap-12 items-start group">
                <span className="text-6xl md:text-8xl font-black text-[#dc2626] italic leading-none opacity-80 group-hover:opacity-100 transition-opacity">03</span>
                <div className="pt-2 md:pt-4">
                  <h4 className="text-2xl md:text-3xl font-black mb-3 uppercase tracking-tight">HARARE ARRIVAL</h4>
                  <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                    Final delivery and inspection hand-over at our Granary Phase 3 location in Harare, Zimbabwe.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-20">
              <button 
                onClick={() => navigate('/inventory')}
                className="bg-[#dc2626] text-white px-12 py-6 rounded-[2rem] font-black text-xl flex items-center gap-4 hover:bg-red-700 transition shadow-2xl shadow-red-900/40 active:scale-95"
              >
                Check Our Stock <ArrowRight size={24} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}