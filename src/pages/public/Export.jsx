import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Anchor, CheckCircle } from 'lucide-react';

const PORTS = [
  { port: 'Walvis Bay',     country: 'Namibia',       flag: 'https://flagcdn.com/na.svg' },
  { port: 'Durban',         country: 'South Africa',  flag: 'https://flagcdn.com/za.svg' },
  { port: 'Beira',          country: 'Mozambique',    flag: 'https://flagcdn.com/mz.svg' },
  { port: 'Maputo',         country: 'Mozambique',    flag: 'https://flagcdn.com/mz.svg' },
  { port: 'Dar es Salaam',  country: 'Tanzania',      flag: 'https://flagcdn.com/tz.svg' },
  { port: 'Mombasa',        country: 'Kenya',         flag: 'https://flagcdn.com/ke.svg' },
];

const REGIONS = [
  {
    name: 'Africa',
    desc: 'Our primary market. We ship regularly to ports across Southern, Eastern and Central Africa — the heart of right-hand drive territory.',
    flags: [
      { country: 'Zimbabwe',    src: 'https://flagcdn.com/zw.svg' },
      { country: 'Zambia',      src: 'https://flagcdn.com/zm.svg' },
      { country: 'Malawi',      src: 'https://flagcdn.com/mw.svg' },
      { country: 'Tanzania',    src: 'https://flagcdn.com/tz.svg' },
      { country: 'Mozambique',  src: 'https://flagcdn.com/mz.svg' },
      { country: 'Namibia',     src: 'https://flagcdn.com/na.svg' },
      { country: 'Kenya',       src: 'https://flagcdn.com/ke.svg' },
      { country: 'South Africa',src: 'https://flagcdn.com/za.svg' },
    ],
  },
];

const HOW_TO_ORDER = [
  {
    num: '01',
    title: 'Find Your Truck',
    desc: 'Browse our inventory and find a vehicle you like. Use the enquiry button on any listing to contact our sales team directly.',
  },
  {
    num: '02',
    title: 'State Your Destination',
    desc: 'Clearly state the country and port you want the truck delivered to. The more specific you are, the faster we can quote you.',
  },
  {
    num: '03',
    title: 'Receive Your Shipping Quote',
    desc: 'We contact the relevant shipping line directly — we do not use freight forwarders — and send you an exact landed cost with all UK charges paid.',
  },
  {
    num: '04',
    title: 'Pro Forma Invoice & Payment',
    desc: 'We issue a pro forma invoice with full banking details. We hold the truck for three working days while your funds are transferred.',
  },
  {
    num: '05',
    title: 'Shipped & Delivered',
    desc: 'Once payment clears, your truck is booked, loaded, and shipped. We provide all documentation for customs clearance at your port.',
  },
];

const PAYMENT_METHODS = [
  'Cash', 'Cheque', 'Bankers Draft', 'Telegraphic Transfer', 'International SWIFT Order',
];

export default function Export() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <section className="relative bg-[#0f172a] py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-truck.jpg" className="w-full h-full object-cover opacity-10" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 px-5 py-2 rounded-full text-[#dc2626] text-[11px] font-black inline-flex items-center gap-3 mb-10 tracking-widest">
            <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse" />
            Southern Africa Export & Shipping
          </div>
          <h1 className="text-6xl md:text-[96px] font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-8">
            We Ship<br /><span className="text-[#dc2626]">Anywhere.</span>
          </h1>
          <p className="text-slate-400 font-medium text-xl max-w-2xl leading-relaxed">
            Wilom Transport Solutions specialises in supplying right-hand drive used trucks and trailers to buyers across Southern and Eastern Africa.
          </p>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="bg-white py-20 px-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-left">
            <span className="text-[#dc2626] font-black uppercase tracking-[0.3em] text-[9px] block mb-3">Our Stock</span>
            <h3 className="text-2xl font-black italic uppercase text-[#0f172a] tracking-tight mb-3">Daily Updates</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Our sales stock changes daily. We can source any individual brand or model on request — contact us with your requirements.</p>
          </div>
          <div className="text-left">
            <span className="text-[#dc2626] font-black uppercase tracking-[0.3em] text-[9px] block mb-3">UK Contacts</span>
            <h3 className="text-2xl font-black italic uppercase text-[#0f172a] tracking-tight mb-3">Extensive Network</h3>
            <p className="text-slate-500 font-medium leading-relaxed">We have extensive contacts within the UK Motor Trade and can source any truck you need at competitive export prices.</p>
          </div>
          <div className="text-left">
            <span className="text-[#dc2626] font-black uppercase tracking-[0.3em] text-[9px] block mb-3">Shipping</span>
            <h3 className="text-2xl font-black italic uppercase text-[#0f172a] tracking-tight mb-3">All Charges Paid</h3>
            <p className="text-slate-500 font-medium leading-relaxed">We provide competitive rates for delivery to all UK ports with onward shipping, including full documentation, to any Southern African destination.</p>
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-left mb-20">
          <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Our Market</span>
          <h2 className="text-5xl md:text-[72px] font-black italic uppercase tracking-tighter text-[#0f172a] leading-none">
            Proudly Serving<br /><span className="text-[#dc2626]">Southern Africa.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-1 gap-8">
          {REGIONS.map((region) => (
            <div key={region.name} className="bg-white rounded-[3rem] border border-slate-100 p-10 hover:shadow-xl transition-all duration-500">
              <h3 className="font-black text-2xl italic uppercase text-[#0f172a] tracking-tight mb-3">{region.name}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">{region.desc}</p>
              <div className="flex flex-wrap gap-3">
                {region.flags.map((f) => (
                  <div key={f.country} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
                    <img src={f.src} alt={f.country} className="h-4 w-6 object-cover rounded-sm shadow-sm" />
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">{f.country}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORT DESTINATIONS */}
      <section className="bg-[#0f172a] py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-20">
            <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Where We Deliver</span>
            <h2 className="text-5xl md:text-[72px] font-black italic uppercase tracking-tighter text-white leading-none">
              Port<br /><span className="text-[#dc2626]">Destinations.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PORTS.map((p) => (
              <div key={p.port + p.country} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Anchor size={14} className="text-[#dc2626]" />
                  <img src={p.flag} alt={p.country} className="h-4 w-6 object-cover rounded-sm" />
                </div>
                <p className="font-black text-white text-lg uppercase italic tracking-tight leading-tight">{p.port}</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">{p.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* PAYMENT TERMS */}
      <section className="bg-white py-32 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Financials</span>
            <h2 className="text-5xl md:text-[64px] font-black italic uppercase tracking-tighter text-[#0f172a] leading-none mb-8">
              Payment<br /><span className="text-[#dc2626]">Terms.</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-6">
              Payment must be made in full prior to vehicles being collected or delivered to customer premises or docks. Acceptable methods of payment are:
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {PAYMENT_METHODS.map((m) => (
                <span key={m} className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full text-[11px] font-black uppercase text-slate-600 tracking-wider">
                  <CheckCircle size={12} className="text-[#dc2626]" /> {m}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-[#0f172a] rounded-[3rem] p-10 md:p-14 text-white">
            <h4 className="text-[#dc2626] font-black uppercase tracking-widest text-[10px] mb-8">Important Notes</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <span className="w-2 h-2 bg-[#dc2626] rounded-full mt-2 flex-shrink-0" />
                <p className="text-slate-400 font-medium leading-relaxed">All goods are sold as seen and approved. No guarantee is implied or given unless stated in writing.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-2 h-2 bg-[#dc2626] rounded-full mt-2 flex-shrink-0" />
                <p className="text-slate-400 font-medium leading-relaxed">Vehicle descriptions are indicative only and do not imply any fitness for purpose.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-2 h-2 bg-[#dc2626] rounded-full mt-2 flex-shrink-0" />
                <p className="text-slate-400 font-medium leading-relaxed">No title shall pass to the purchaser until payment has been received in full.</p>
              </li>
              <li className="flex gap-4 items-start">
                <span className="w-2 h-2 bg-[#dc2626] rounded-full mt-2 flex-shrink-0" />
                <p className="text-slate-400 font-medium leading-relaxed">Our prices do not include insurance. We can arrange this for you at an additional cost.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#dc2626] py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-left">
            <p className="text-white/60 font-black uppercase tracking-widest text-[10px] mb-3">Ready to import?</p>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
              Browse Our Stock<br />& Get A Quote Today.
            </h2>
          </div>
          <button
            onClick={() => navigate('/inventory')}
            className="bg-white text-[#dc2626] px-12 py-6 rounded-[2rem] font-black text-xl flex items-center gap-4 hover:bg-slate-100 transition-all shadow-2xl whitespace-nowrap"
          >
            View Inventory <ArrowRight size={24} />
          </button>
        </div>
      </section>

    </div>
  );
}