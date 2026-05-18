import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Browse & Select',
    desc: 'Search our hand-picked inventory of UK trucks. Filter by brand, category, and budget to find your perfect vehicle.',
  },
  {
    number: '02',
    title: 'Reserve with Deposit',
    desc: 'Secure your chosen truck with a refundable deposit. We hold it exclusively for you while paperwork is prepared.',
  },
  {
    number: '03',
    title: 'Inspection Report Sent',
    desc: 'Receive a full independent inspection report with photos and condition notes before you commit to the full payment.',
  },
  {
    number: '04',
    title: 'Shipped to Your Port',
    desc: 'We handle all export documentation and shipping. Your truck is loaded and tracked all the way to your nearest port.',
  },
  {
    number: '05',
    title: 'Collect & Drive',
    desc: 'Clear customs, collect your truck from the port, and drive it home. We provide full documentation support throughout.',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="bg-[#0f172a] rounded-[2rem] md:rounded-[4rem] p-6 sm:p-10 md:p-24 text-white relative overflow-hidden shadow-2xl">

          {/* Ghost truck background */}
          <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
            <Truck size={600} />
          </div>

          <div className="relative z-10 text-left max-w-4xl">

            {/* Header */}
            <div className="mb-10 md:mb-16">
              <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Simple Process</span>
              <h1 className="text-3xl sm:text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none break-words">
                HOW IT <span className="text-white/20">WORKS</span>
              </h1>
            </div>

            {/* Steps */}
            <div className="space-y-3 md:space-y-4">
              {STEPS.map((step, i) => {
                const isOpen = active === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActive(isOpen ? null : i)}
                    className={`rounded-[1.5rem] md:rounded-[2rem] border cursor-pointer transition-all duration-300 overflow-hidden
                      ${isOpen ? 'bg-white border-white' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                    <div className="flex items-center gap-4 md:gap-8 p-4 md:p-8">
                      <span className={`text-4xl md:text-7xl font-black italic leading-none flex-shrink-0 w-12 md:w-20 transition-colors duration-300
                        ${isOpen ? 'text-[#dc2626]' : 'text-[#dc2626]/60'}`}>
                        {step.number}
                      </span>
                      <h4 className={`text-base sm:text-xl md:text-3xl font-black uppercase tracking-tight flex-1 transition-colors duration-300
                        ${isOpen ? 'text-[#0f172a]' : 'text-white'}`}>
                        {step.title}
                      </h4>
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                        ${isOpen ? 'bg-[#dc2626] border-[#dc2626] rotate-180' : 'border-white/20'}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#fff' : '#94a3b8'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </div>
                    </div>
                    <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed px-4 md:px-8 pb-6 md:pb-8 pl-[calc(1rem+48px+1rem)] md:pl-[calc(2rem+80px+2rem)]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 md:mt-20">
              <button
                onClick={() => navigate('/inventory')}
                className="bg-[#dc2626] text-white px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl flex items-center gap-4 hover:bg-red-700 transition shadow-2xl shadow-red-900/40 active:scale-95"
              >
                Check Our Stock <ArrowRight size={22} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}