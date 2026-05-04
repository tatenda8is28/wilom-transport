import React, { useState, useEffect } from 'react';
import { Truck, Search, Ship, Globe, MapPin, ChevronDown, Filter, Loader2, Calendar, Settings2, Gauge } from 'lucide-react';
import { supabase } from '../../api/supabase';

// Filter Data Catalogues
const MAKES = ["All Brands", "Mercedes-Benz", "Scania", "MAN", "Volvo", "DAF", "Iveco", "Renault"];
const TYPES = ["All Types", "Rigids", "Tractor Units", "Box van", "Tipper", "Curtain sided", "Flatbeds", "Trailers"];
const GEARBOXES = ["All Transmissions", "Automatic", "Manual", "Semi-Automatic"];
const YEARS = ["All Years", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="text-left">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl font-bold text-slate-700 appearance-none outline-none focus:border-[#dc2626] transition-all cursor-pointer"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function Inventory() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [activeLocation, setActiveLocation] = useState('All');
  const [selectedMake, setSelectedMake] = useState('All Brands');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedGearbox, setSelectedGearbox] = useState('All Transmissions');
  const [selectedYear, setSelectedYear] = useState('All Years');

  useEffect(() => {
    fetchFilteredVehicles();
  }, [activeLocation, selectedMake, selectedType, selectedGearbox, selectedYear]);

  async function fetchFilteredVehicles() {
    setLoading(true);
    let query = supabase.from('vehicles').select('*');

    if (activeLocation !== 'All') query = query.eq('location', activeLocation);
    if (selectedMake !== 'All Brands') query = query.eq('make', selectedMake);
    if (selectedType !== 'All Types') query = query.eq('body_type', selectedType);
    if (selectedGearbox !== 'All Transmissions') query = query.eq('gearbox', selectedGearbox);
    if (selectedYear !== 'All Years') query = query.eq('year', parseInt(selectedYear));

    const { data, error } = await query.order('created_at', { ascending: false });
    if (data) setVehicles(data);
    setLoading(false);
  }

  const resetFilters = () => {
    setSelectedMake('All Brands');
    setSelectedType('All Types');
    setSelectedGearbox('All Transmissions');
    setSelectedYear('All Years');
    setActiveLocation('All');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* HEADER */}
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-6xl font-black text-[#0f172a] flex items-center gap-4 tracking-tighter">
            <Truck className="text-[#dc2626]" size={50} /> Browse Inventory
          </h1>
          <p className="text-slate-500 mt-4 font-bold text-lg">{vehicles.length} high-spec vehicles currently listed</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* EXPANDED SIDEBAR FILTERS */}
          <aside className="w-full lg:w-72 shrink-0 space-y-7 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-fit">
            <div className="flex items-center gap-2 text-[#0f172a] font-black uppercase text-[10px] tracking-[0.2em] mb-4">
              <Filter size={14} className="text-[#dc2626]" /> Filter Results
            </div>

            <FilterDropdown label="Brand / Make" options={MAKES} value={selectedMake} onChange={setSelectedMake} />
            <FilterDropdown label="Body Category" options={TYPES} value={selectedType} onChange={setSelectedType} />
            <FilterDropdown label="Transmission" options={GEARBOXES} value={selectedGearbox} onChange={setSelectedGearbox} />
            <FilterDropdown label="Manufacture Year" options={YEARS} value={selectedYear} onChange={setSelectedYear} />
            
            <button 
              onClick={resetFilters}
              className="w-full py-4 text-[10px] font-black uppercase text-[#dc2626] bg-red-50/50 rounded-2xl hover:bg-red-50 transition-all mt-4 border border-red-100"
            >
              Reset All Filters
            </button>
          </aside>

          {/* MAIN RESULTS CONTENT */}
          <div className="flex-1">
            {/* LOCATION QUICK-TABS */}
            <div className="flex flex-wrap gap-3 mb-10">
               {['All', 'UK', 'In Transit', 'Zimbabwe'].map((loc) => (
                 <button 
                   key={loc}
                   onClick={() => setActiveLocation(loc)}
                   className={`flex items-center gap-2 px-7 py-3 rounded-full font-black text-sm transition-all shadow-sm border ${activeLocation === loc ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'}`}
                 >
                   {loc === 'All' ? <Globe size={16}/> : loc === 'Zimbabwe' ? <MapPin size={16}/> : <Ship size={16}/>}
                   {loc}
                 </button>
               ))}
            </div>

            {loading ? (
              <div className="flex justify-center py-32"><Loader2 className="animate-spin text-[#dc2626]" size={60} /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {vehicles.length === 0 ? (
                    <div className="col-span-2 py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold">No vehicles found matching these filters.</p>
                    </div>
                ) : (
                  vehicles.map(v => (
                    <div key={v.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                      {/* IMAGE AREA WITH LOCATION TAG */}
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <img src={v.main_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={v.model} />
                        
                        {/* BADGES */}
                        <div className="absolute top-5 left-5 flex flex-col gap-2">
                          <span className="bg-[#22c55e] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">{v.badge}</span>
                        </div>

                        {/* THE LOCATION BADGE - NOW VISIBLE */}
                        <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-[#0f172a] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-xl border border-white/10">
                           <MapPin size={12} className="text-[#dc2626]" />
                           {v.location}
                        </div>
                      </div>

                      <div className="p-10 text-left">
                        <div className="flex justify-between items-start mb-5">
                          <div>
                            <h3 className="font-black text-3xl text-[#0f172a] leading-none mb-2">{v.make}</h3>
                            <p className="text-slate-400 font-bold text-lg">{v.model}</p>
                          </div>
                          <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${v.status === 'Sold' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{v.status}</span>
                        </div>

                        {/* SPECS GRID */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[11px] font-black text-slate-400 uppercase tracking-tighter mb-10 pt-6 border-t border-slate-50">
                           <div className="flex items-center gap-2"><Calendar size={14} className="text-slate-300"/> {v.year} Model</div>
                           <div className="flex items-center gap-2"><Settings2 size={14} className="text-slate-300"/> {v.gearbox}</div>
                           <div className="flex items-center gap-2"><Truck size={14} className="text-slate-300"/> {v.axle_config} Axle</div>
                           <div className="flex items-center gap-2"><Gauge size={14} className="text-slate-300"/> {v.mileage_miles?.toLocaleString()} Miles</div>
                        </div>

                        {/* PRICING SECTION */}
                        <div className="flex justify-between items-end bg-slate-50/50 p-6 rounded-[24px]">
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">UK Port Price</span>
                            <span className="text-2xl font-black text-[#0f172a]">£{Number(v.uk_price_gbp).toLocaleString()}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-black text-[#dc2626] uppercase block mb-1">Delivered ZIM</span>
                            <span className="text-3xl font-black text-[#dc2626] tracking-tighter">${Number(v.delivered_price_usd).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}