import React, { useState } from 'react';

const COUNTRY_RATES = {
  ZW: { name: 'Zimbabwe',   port: 'Durban / Beira',  shipping: 2800, dutyPct: 0.40, clearingFlat: 850 },
  ZM: { name: 'Zambia',     port: 'Dar es Salaam',   shipping: 3200, dutyPct: 0.25, clearingFlat: 780 },
  MW: { name: 'Malawi',     port: 'Dar es Salaam',   shipping: 3000, dutyPct: 0.25, clearingFlat: 700 },
  TZ: { name: 'Tanzania',   port: 'Dar es Salaam',   shipping: 2500, dutyPct: 0.25, clearingFlat: 650 },
  MZ: { name: 'Mozambique', port: 'Maputo',          shipping: 2600, dutyPct: 0.20, clearingFlat: 600 },
  NA: { name: 'Namibia',    port: 'Walvis Bay',      shipping: 2200, dutyPct: 0.20, clearingFlat: 550 },
};

const GBP_TO_USD = 1.27;

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function LandedCostCalculator() {
  const [country, setCountry] = useState('');
  const [ukPrice, setUkPrice] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    if (!country) { setError('Please select a destination country.'); return; }
    const price = parseFloat(ukPrice);
    if (!price || price <= 0) { setError('Please enter a valid UK price.'); return; }

    const r = COUNTRY_RATES[country];
    const ukUsd = Math.round(price * GBP_TO_USD);
    const shipping = r.shipping;
    const duty = Math.round((ukUsd + shipping) * r.dutyPct);
    const clearing = r.clearingFlat;
    const total = ukUsd + shipping + duty + clearing;

    setResult({ ukUsd, shipping, duty, clearing, total, dutyPct: r.dutyPct, port: r.port, name: r.name });
  };

  return (
    <section className="bg-slate-50 py-32 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-left mb-14">
          <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">
            Free Estimator Tool
          </span>
          <h2 className="text-5xl md:text-[72px] font-black italic uppercase tracking-tighter text-[#0f172a] leading-none mb-4">
            What will it cost<br />
            <span className="text-[#dc2626]">delivered to you?</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Estimate your full landed cost — shipping, duties &amp; clearing — before you enquire.
          </p>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 md:p-14">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2 text-left">
              <label className="text-[9px] font-black uppercase text-slate-400 px-4 block tracking-widest">
                Destination Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 cursor-pointer text-[#0f172a]"
              >
                <option value="">— Select country —</option>
                <option value="ZW">Zimbabwe</option>
                <option value="ZM">Zambia</option>
                <option value="MW">Malawi</option>
                <option value="TZ">Tanzania</option>
                <option value="MZ">Mozambique</option>
                <option value="NA">Namibia</option>
              </select>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[9px] font-black uppercase text-slate-400 px-4 block tracking-widest">
                UK Price (GBP £)
              </label>
              <input
                type="number"
                value={ukPrice}
                onChange={(e) => setUkPrice(e.target.value)}
                placeholder="e.g. 25000"
                min="0"
                className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 focus:border-[#dc2626] text-[#0f172a] placeholder-slate-300"
              />
            </div>
          </div>

          {error && (
            <p className="text-[#dc2626] text-sm font-bold mb-4 px-4">{error}</p>
          )}

          <button
            onClick={calculate}
            className="w-full bg-[#dc2626] text-white py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-xl mb-10 uppercase tracking-widest"
          >
            Calculate Landed Cost
          </button>

          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 md:p-12">
            {!result ? (
              <div className="text-center py-10">
                <p className="text-slate-500 font-black uppercase text-xs tracking-widest">
                  Enter a price &amp; country above to see your estimate
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center py-5 border-b border-slate-800">
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">UK Purchase Price</span>
                  <span className="text-white font-black text-xl">{fmt(result.ukUsd)}</span>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-slate-800">
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Shipping to {result.port}</span>
                  <span className="text-white font-black text-xl">{fmt(result.shipping)}</span>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-slate-800">
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Import Duty ({Math.round(result.dutyPct * 100)}%)</span>
                  <span className="text-white font-black text-xl">{fmt(result.duty)}</span>
                </div>

                <div className="flex justify-between items-center py-5 border-b border-slate-800">
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Clearing &amp; Admin Fees</span>
                  <span className="text-white font-black text-xl">{fmt(result.clearing)}</span>
                </div>

                <div className="flex justify-between items-end pt-8">
                  <span className="text-[#dc2626] font-black uppercase text-[10px] tracking-widest">
                    Total Landed — {result.name}
                  </span>
                  <span className="text-[#dc2626] font-black text-4xl italic">{fmt(result.total)}</span>
                </div>

                <div className="mt-8 flex justify-center">
                  <span className="flex items-center gap-2 bg-slate-800 text-slate-500 font-black uppercase text-[9px] tracking-widest px-5 py-3 rounded-full">
                    <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse inline-block" />
                    Nearest Port: {result.port}
                  </span>
                </div>
              </>
            )}
          </div>

          <p className="text-center text-slate-400 text-[11px] font-bold mt-6 uppercase tracking-wider">
            * Estimates only — actual costs may vary. Contact us for a precise quote.
          </p>
        </div>
      </div>
    </section>
  );
}