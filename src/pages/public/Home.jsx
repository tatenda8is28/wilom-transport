import React from 'react';
import { ArrowRight, Phone, Gauge, Calendar, MapPin, Search, ChevronDown } from 'lucide-react';

// SEARCH BAR COMPONENT
function HomeSearch() {
  return (
    <div className="max-w-6xl mx-auto px-4 -mt-12 md:-mt-16 relative z-30">
      <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-[32px] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="relative group text-left">
          <label className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-4">Brand</label>
          <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-100 transition">
            <span className="font-bold text-slate-600">All Brands</span>
            <ChevronDown size={18} className="text-slate-400" />
          </div>
        </div>

        <div className="relative group text-left">
          <label className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-4">Vehicle Type</label>
          <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-100 transition">
            <span className="font-bold text-slate-600">All Types</span>
            <ChevronDown size={18} className="text-slate-400" />
          </div>
        </div>

        <div className="relative group text-left">
          <label className="hidden md:block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-4">Price Range</label>
          <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-100 transition">
            <span className="font-bold text-slate-600">All Prices</span>
            <ChevronDown size={18} className="text-slate-400" />
          </div>
        </div>

        <button className="bg-[#dc2626] text-white w-full md:w-auto px-10 py-4 rounded-xl md:rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-700 transition shadow-lg shadow-red-200">
          <Search size={20} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}

// VEHICLE CARD COMPONENT
function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
      <div className="relative aspect-[16/11] overflow-hidden text-left">
        <img 
          src={vehicle.image} 
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-5 left-5 text-left">
           <span className="bg-[#22c55e] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
             {vehicle.badge}
           </span>
        </div>
        <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-sm">
           {vehicle.type}
        </div>
        <div className="absolute bottom-5 right-5 bg-[#0f172a] text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase">
           {vehicle.brand}
        </div>
      </div>

      <div className="p-8 text-left">
        <h3 className="font-black text-2xl text-slate-800 leading-tight mb-5 group-hover:text-[#dc2626] transition-colors">
          {vehicle.name}
        </h3>
        
        <div className="flex items-center gap-4 text-slate-400 font-bold text-[12px] mb-8 uppercase tracking-tighter">
          <span className="flex items-center gap-2"><Gauge size={14}/> {vehicle.mileage}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span className="flex items-center gap-2"><Calendar size={14}/> {vehicle.year}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span className="flex items-center gap-2"><MapPin size={14}/> {vehicle.location}</span>
        </div>

        <div className="flex justify-between items-end border-t border-slate-100 pt-6">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">UK Price</span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">${vehicle.ukPrice.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-[#dc2626] uppercase tracking-widest block mb-1">Delivered ZIM</span>
            <span className="text-2xl font-black text-[#dc2626] tracking-tight">${vehicle.zimPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// HOME PAGE COMPONENT
export default function Home() {
  const MOCK_DATA = [
    { id: 1, name: 'MAN TGX 26.460 6x2', brand: 'MAN', year: 2018, mileage: '185k km', location: 'UK', ukPrice: 7500, zimPrice: 25000, image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80', badge: 'Fresh Arrival', type: 'Truck' },
    { id: 2, name: 'Scania R450 Highline', brand: 'Scania', year: 2017, mileage: '210k km', location: 'UK', ukPrice: 8200, zimPrice: 27000, image: 'https://images.unsplash.com/photo-1591768793355-74d7ca7fb954?auto=format&fit=crop&q=80', badge: 'Best Seller', type: 'Tractor' },
    { id: 3, name: 'Volvo FH 460 Globetrotter', brand: 'Volvo', year: 2019, mileage: '175k km', location: 'UK', ukPrice: 9000, zimPrice: 28500, image: 'https://images.unsplash.com/photo-1586191582151-f7097475df1b?auto=format&fit=crop&q=80', badge: 'Limited', type: 'Tractor' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-[#0f172a] h-[85vh] flex items-center overflow-hidden pb-32">
        <div className="absolute inset-0 z-0">
           {/* THIS IS WHERE YOUR PICTURE GOES */}
           <img 
             src="/hero-truck.jpg" 
             className="w-full h-full object-cover opacity-25" 
             alt="Wilom Transport Hero" 
             onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80' }}
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-left">
           <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 px-5 py-2 rounded-full text-[#dc2626] text-[11px] font-black inline-flex items-center gap-3 mb-10 uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse"></span>
              UK to Zimbabwe — Direct Import
           </div>

           <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] mb-10 tracking-tighter text-left">
             Heavy Duty Deals. <br />
             <span className="text-[#dc2626]">Delivered Across <br /> Borders.</span>
           </h1>

           <p className="text-slate-400 text-lg md:text-xl font-bold max-w-xl mb-12 leading-relaxed text-left">
             Premium trucks, tractors, and tippers sourced from the UK and delivered 
             to Zimbabwe at unbeatable prices.
           </p>

           <div className="flex flex-wrap gap-5">
              <button className="bg-[#dc2626] text-white px-12 py-5 rounded-xl font-black text-lg hover:bg-red-700 transition shadow-2xl shadow-red-900/40 flex items-center gap-3 group">
                Browse Vehicles <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform"/>
              </button>
             
           </div>
        </div>
      </section>

      {/* SEARCH BAR OVERLAY */}
      <HomeSearch />

      {/* LATEST ARRIVALS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 text-left">
           <div>
              <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Featured Listings</span>
              <h2 className="text-6xl font-black tracking-tighter text-[#0f172a]">Latest Arrivals</h2>
              <p className="text-slate-500 mt-4 text-xl font-bold max-w-lg">Hand-picked heavy vehicles ready for delivery.</p>
           </div>
           <button className="bg-white border-2 border-slate-200 px-10 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 group shadow-sm">
              View All Inventory <span className="group-hover:translate-x-1 transition-transform text-[#dc2626]">→</span>
           </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MOCK_DATA.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </div>
  );
}