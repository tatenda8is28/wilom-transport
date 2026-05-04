import React, { useState, useEffect } from 'react';
import { 
  Truck, Ship, Globe, MapPin, ChevronDown, 
  Filter, Loader2, Calendar, Settings2, 
  Gauge, MessageCircle, RefreshCcw 
} from 'lucide-react';
import { supabase } from '../../api/supabase';

// Static Filter Options
const MAKES = ["All Brands", "Mercedes-Benz", "Scania", "MAN", "Volvo", "DAF", "Iveco", "Renault"];
const TYPES = ["All Types", "Rigids", "Tractor Units", "Box van", "Tipper", "Curtain sided", "Flatbeds", "Trailers"];
const GEARBOXES = ["All Transmissions", "Automatic", "Manual", "Semi-Automatic"];
const YEARS = ["All Years", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];

// Reusable Dropdown Component
function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="text-left">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{label}</label>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-slate-700 appearance-none outline-none focus:border-[#dc2626] transition-all cursor-pointer"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
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

  // Trigger fetch when any filter changes
  useEffect(() => {
    fetchFilteredVehicles();
  }, [activeLocation, selectedMake, selectedType, selectedGearbox, selectedYear]);

  async function fetchFilteredVehicles() {
    setLoading(true);
    let query = supabase.from('vehicles').select('*');

    // Filter Logic
    if (activeLocation !== 'All') query = query.eq('location', activeLocation);
    if (selectedMake !== 'All Brands') query = query.eq('make', selectedMake);
    if (selectedType !== 'All Types') query = query.eq('body_type', selectedType);
    if (selectedGearbox !== 'All Transmissions') query = query.eq('gearbox', selectedGearbox);
    if (selectedYear !== 'All Years') query = query.eq('year', parseInt(selectedYear));

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) console.error("Data Error:", error);
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

  const handleWhatsAppInquiry = (v) => {
    const message = encodeURIComponent(
      `Hi Wilom Transport, I'm interested in the ${v.make} ${v.model} (${v.year}) listed at $${v.delivered_price_usd.toLocaleString()}. Is this unit still available?`
    );
    window.open(`https://wa.me/263710500296?text=${message}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* PAGE HEADER */}
        <header className="mb-16 text-left">
          <h1 className="text-5xl md:text-8xl font-black text-[#0f172a] tracking-tighter italic leading-none">
            STOCK <span className="text-[#dc2626]">LIST</span>
          </h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.3em] flex items-center gap-3">
             <span className="w-12 h-[2px] bg-[#dc2626]"></span>
             {vehicles.length} Units Currently Available
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR FILTERS */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm sticky top-28">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-2xl text-[#0f172a] tracking-tight">Filters</h3>
                <Filter size={20} className="text-[#dc2626]" />
              </div>

              <div className="space-y-6">
                <FilterDropdown label="Manufacturer" options={MAKES} value={selectedMake} onChange={setSelectedMake} />
                <FilterDropdown label="Vehicle Category" options={TYPES} value={selectedType} onChange={setSelectedType} />
                <FilterDropdown label="Gearbox" options={GEARBOXES} value={selectedGearbox} onChange={setSelectedGearbox} />
                <FilterDropdown label="Model Year" options={YEARS} value={selectedYear} onChange={setSelectedYear} />
              </div>
              
              <button 
                onClick={resetFilters}
                className="w-full mt-10 py-4 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#dc2626] transition-colors border-t border-slate-50 pt-8"
              >
                <RefreshCcw size={14} /> Clear All Filters
              </button>
            </div>
          </aside>

          {/* RESULTS AREA */}
          <div className="flex-1">
            
            {/* LOCATION QUICK FILTERS */}
            <div className="flex flex-wrap gap-3 mb-12">
               {['All', 'UK', 'In Transit', 'Zimbabwe'].map((loc) => (
                 <button 
                   key={loc}
                   onClick={() => setActiveLocation(loc)}
                   className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-sm border ${
                     activeLocation === loc 
                     ? 'bg-[#0f172a] text-white border-[#0f172a] scale-105 shadow-xl' 
                     : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
                   }`}
                 >
                   {loc === 'All' ? <Globe size={14}/> : loc === 'Zimbabwe' ? <MapPin size={14}/> : <Ship size={14}/>}
                   {loc}
                 </button>
               ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-4">
                <Loader2 className="animate-spin text-[#dc2626]" size={60} />
                <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Accessing Database...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {vehicles.length === 0 ? (
                    <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border border-dashed border-slate-200">
                        <Truck size={48} className="mx-auto text-slate-200 mb-6" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No vehicles match your current filters.</p>
                    </div>
                ) : (
                  vehicles.map(v => (
                    <div key={v.id} className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 group flex flex-col">
                      
                      {/* IMAGE AREA */}
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <img src={v.main_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={v.model} />
                        
                        {/* BADGES */}
                        <div className="absolute top-6 left-6">
                          <span className="bg-[#22c55e] text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">
                            {v.badge || 'Available'}
                          </span>
                        </div>

                        {/* LOCATION TAG - HIGH VISIBILITY */}
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#0f172a] text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase shadow-2xl border border-white/10">
                           <MapPin size={14} className="text-[#dc2626]" />
                           {v.location}
                        </div>
                      </div>

                      {/* CONTENT AREA */}
                      <div className="p-10 text-left flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="font-black text-4xl text-[#0f172a] tracking-tighter leading-none mb-2">{v.make}</h3>
                            <p className="text-slate-400 font-bold text-xl">{v.model}</p>
                          </div>
                          <span className={`text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] ${v.status === 'Sold' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            {v.status}
                          </span>
                        </div>

                        {/* TECHNICAL SPECS BAR */}
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[11px] font-black text-slate-400 uppercase tracking-tighter mb-10 pt-8 border-t border-slate-50">
                           <div className="flex items-center gap-3"><Calendar size={16} className="text-slate-200"/> {v.year} Model</div>
                           <div className="flex items-center gap-3"><Settings2 size={16} className="text-slate-200"/> {v.gearbox}</div>
                           <div className="flex items-center gap-3"><Truck size={16} className="text-slate-200"/> {v.axle_config} Axle</div>
                           <div className="flex items-center gap-3"><Gauge size={16} className="text-slate-200"/> {v.mileage_miles?.toLocaleString()} Miles</div>
                        </div>

                        {/* PRICING TABLE */}
                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-8 rounded-[2.5rem] mb-8">
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">UK Price</span>
                            <span className="text-2xl font-black text-[#0f172a]">£{Number(v.uk_price_gbp).toLocaleString()}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-black text-[#dc2626] uppercase tracking-widest block mb-2">Delivered ZIM</span>
                            <span className="text-3xl font-black text-[#dc2626] tracking-tighter">${Number(v.delivered_price_usd).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* WHATSAPP ACTION */}
                        <button 
                          onClick={() => handleWhatsAppInquiry(v)}
                          className="w-full bg-[#25d366] text-white py-6 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-[#1fb356] transition-all shadow-xl shadow-green-100 active:scale-95"
                        >
                          <MessageCircle size={24} />
                          Enquire on WhatsApp
                        </button>
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