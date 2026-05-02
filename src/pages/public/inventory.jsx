import React, { useState } from 'react';
import { Truck, Search, Ship, Globe, MapPin, ChevronDown, Filter } from 'lucide-react';

// Reusing the same data for now
const MOCK_DATA = [
    { id: 1, name: 'MAN TGX 26.460 6x2', brand: 'MAN', year: 2018, mileage: '185k km', location: 'UK', ukPrice: 7500, zimPrice: 25000, image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80', badge: 'Fresh Arrival', type: 'Truck' },
    { id: 2, name: 'Scania R450 Highline', brand: 'Scania', year: 2017, mileage: '210k km', location: 'UK', ukPrice: 8200, zimPrice: 27000, image: 'https://images.unsplash.com/photo-1591768793355-74d7ca7fb954?auto=format&fit=crop&q=80', badge: 'Best Seller', type: 'Tractor' },
    { id: 3, name: 'Volvo FH 460 Globetrotter', brand: 'Volvo', year: 2019, mileage: '175k km', location: 'UK', ukPrice: 9000, zimPrice: 28500, image: 'https://images.unsplash.com/photo-1586191582151-f7097475df1b?auto=format&fit=crop&q=80', badge: 'Limited', type: 'Tractor' },
    { id: 4, name: 'DAF CF 440 8x4 Tipper', brand: 'DAF', year: 2016, mileage: '220k km', location: 'UK', ukPrice: 6800, zimPrice: 24000, image: 'https://images.unsplash.com/photo-1591768793355-74d7ca7fb954?auto=format&fit=crop&q=80', badge: 'Price Drop', type: 'Tipper' },
];

function FilterDropdown({ label, options }) {
  return (
    <div className="text-left">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">{label}</label>
      <div className="relative">
        <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl font-bold text-slate-700 appearance-none outline-none focus:border-[#dc2626]">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function LocationTab({ label, icon, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${active ? 'bg-[#0f172a] text-white' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
    >
      {icon} {label}
    </button>
  );
}

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* PAGE HEADER */}
        <div className="mb-12 text-left">
          <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] flex items-center gap-4 tracking-tighter leading-none">
            <Truck className="text-[#dc2626]" size={40} /> Browse Vehicles
          </h1>
          <p className="text-slate-500 mt-4 font-bold text-lg">{MOCK_DATA.length} vehicles available</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SIDEBAR FILTERS - Exact match to mockup */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-fit">
            <div className="flex items-center gap-2 text-[#0f172a] font-black uppercase text-xs tracking-[0.2em] mb-6">
              <Filter size={16} /> Filters
            </div>

            <FilterDropdown label="Brand" options={['All Brands', 'Scania', 'MAN', 'Volvo', 'DAF', 'Mercedes-Benz']} />
            <FilterDropdown label="Vehicle Type" options={['All Types', 'Truck', 'Tractor', 'Tipper']} />
            <FilterDropdown label="Location" options={['All Locations', 'UK', 'In Transit', 'Zimbabwe']} />
            <FilterDropdown label="Condition" options={['Any Condition', 'New', 'Used']} />
            <FilterDropdown label="Sort By" options={['Newest First', 'Price: Low to High', 'Price: High to Low']} />
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1">
            {/* LOCATION TABS */}
            <div className="flex flex-wrap gap-3 mb-10">
              <LocationTab label="All Locations" icon={<Globe size={16}/>} active={activeTab === 'All'} onClick={() => setActiveTab('All')} />
              <LocationTab label="In UK" icon={<Ship size={16}/>} active={activeTab === 'UK'} onClick={() => setActiveTab('UK')} />
              <LocationTab label="In Transit" icon={<Ship size={16}/>} active={activeTab === 'Transit'} onClick={() => setActiveTab('Transit')} />
              <LocationTab label="In Zimbabwe" icon={<MapPin size={16}/>} active={activeTab === 'Zim'} onClick={() => setActiveTab('Zim')} />
            </div>

            {/* RESULTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_DATA.map(vehicle => (
                <div key={vehicle.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={vehicle.image} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#22c55e] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">{vehicle.badge}</span>
                    </div>
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="font-black text-xl mb-4">{vehicle.name}</h3>
                    <div className="flex gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-tighter mb-6">
                       <span>{vehicle.mileage}</span> <span>{vehicle.year}</span> <span>{vehicle.location}</span>
                    </div>
                    <div className="flex justify-between items-end pt-5 border-t border-slate-50">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase block">UK Price</span>
                        <span className="text-xl font-black">${vehicle.ukPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-black text-[#dc2626] uppercase block">Delivered ZIM</span>
                        <span className="text-xl font-black text-[#dc2626]">${vehicle.zimPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}