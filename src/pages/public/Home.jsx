import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Phone, Gauge, Calendar, 
  MapPin, Search, ChevronDown, Loader2, 
  MessageCircle, Settings2, Truck 
} from 'lucide-react';
import { supabase } from '../../api/supabase';

// VEHICLE CARD COMPONENT
function VehicleCard({ vehicle }) {
  const trackWhatsAppInquiry = async (v) => {
    // Log the lead in Supabase
    await supabase.from('leads').insert([
      { 
        type: 'whatsapp_inquiry', 
        vehicle_name: `${v.make} ${v.model}`, 
        vehicle_id: v.id 
      }
    ]);
    
    // Open WhatsApp
    const msg = encodeURIComponent(
      `Hi Wilom Transport, I'm interested in the ${v.make} ${v.model} (${v.year}) listed at $${v.delivered_price_usd.toLocaleString()}. Is this unit still available?`
    );
    window.open(`https://wa.me/263710500296?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col h-full">
      {/* IMAGE AREA */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <img 
          src={vehicle.main_image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          alt={vehicle.model} 
        />
        <div className="absolute top-6 left-6 text-left">
          <span className="bg-[#22c55e] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
            {vehicle.badge || 'Available'}
          </span>
        </div>
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#0f172a] text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-xl border border-white/10">
          <MapPin size={12} className="text-[#dc2626]" /> {vehicle.location}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-10 text-left flex-grow flex flex-col">
        <h3 className="font-black text-3xl text-[#0f172a] leading-none mb-2">{vehicle.make}</h3>
        <p className="text-slate-400 font-bold text-lg mb-6">{vehicle.model}</p>
        
        {/* TECH SPECS */}
        <div className="grid grid-cols-2 gap-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-10 pt-6 border-t border-slate-50">
           <div className="flex items-center gap-2 text-left"><Calendar size={14} className="text-slate-200"/> {vehicle.year} Model</div>
           <div className="flex items-center gap-2 text-left"><Settings2 size={14} className="text-slate-200"/> {vehicle.gearbox}</div>
           <div className="flex items-center gap-2 text-left"><Truck size={14} className="text-slate-200"/> {vehicle.axle_config}</div>
           <div className="flex items-center gap-2 text-left"><Gauge size={14} className="text-slate-200"/> {vehicle.mileage_miles?.toLocaleString()} Mi</div>
        </div>

        {/* PRICING */}
        <div className="flex justify-between items-end bg-slate-50 p-7 rounded-[2rem] mb-8">
          <div className="text-left">
            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">UK Port Price</span>
            <span className="text-xl font-black text-[#0f172a]">£{Number(vehicle.uk_price_gbp).toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-black text-[#dc2626] uppercase block mb-1">Delivered ZIM</span>
            <span className="text-2xl font-black text-[#dc2626]">${Number(vehicle.delivered_price_usd).toLocaleString()}</span>
          </div>
        </div>

        {/* WHATSAPP BUTTON */}
        <button 
          onClick={() => trackWhatsAppInquiry(vehicle)} 
          className="w-full bg-[#25d366] text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-[#1fb356] transition-all shadow-xl shadow-green-100 active:scale-95"
        >
          <MessageCircle size={24} /> Enquire on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search States
  const [searchMake, setSearchMake] = useState('All Brands');
  const [searchType, setSearchType] = useState('All Types');

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (data) setFeatured(data);
      if (error) console.error("Error fetching vehicles:", error);
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  const handleHomeSearch = () => {
    const params = new URLSearchParams();
    if (searchMake !== 'All Brands') params.append('make', searchMake);
    if (searchType !== 'All Types') params.append('type', searchType);
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative bg-[#0f172a] h-[85vh] flex items-center overflow-hidden pb-32">
        <div className="absolute inset-0 z-0">
           <img 
             src="/hero-truck.jpg" 
             className="w-full h-full object-cover opacity-25" 
             alt="Hero" 
             onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80' }}
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-left">
           <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 px-5 py-2 rounded-full text-[#dc2626] text-[11px] font-black inline-flex items-center gap-3 mb-10 uppercase tracking-widest text-left">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse"></span>
              UK to Zimbabwe — Direct Import
           </div>
           <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] mb-10 tracking-tighter text-left">
             Heavy Duty Deals. <br />
             <span className="text-[#dc2626]">Delivered Across <br /> Borders.</span>
           </h1>
           <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => navigate('/inventory')} 
                className="bg-[#dc2626] text-white px-12 py-5 rounded-xl font-black text-lg flex items-center gap-3 group shadow-2xl"
              >
                Browse Vehicles <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform"/>
              </button>
              <button 
                onClick={() => window.open('https://wa.me/263710500296')} 
                className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-xl font-black text-lg hover:bg-white/10 transition flex items-center gap-3"
              >
                <Phone size={22} className="text-[#dc2626]"/> Contact Us
              </button>
           </div>
        </div>
      </section>

      {/* SEARCH BAR OVERLAY */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 md:-mt-16 relative z-30">
        <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="text-left">
            <label className="text-[10px] font-black uppercase text-slate-400 px-4 mb-2 block tracking-widest">Brand</label>
            <select 
              value={searchMake} 
              onChange={(e) => setSearchMake(e.target.value)} 
              className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 cursor-pointer"
            >
              <option>All Brands</option><option>Mercedes-Benz</option><option>Scania</option><option>Volvo</option><option>DAF</option><option>Iveco</option>
            </select>
          </div>
          <div className="text-left">
            <label className="text-[10px] font-black uppercase text-slate-400 px-4 mb-2 block tracking-widest">Vehicle Type</label>
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)} 
              className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 cursor-pointer"
            >
              <option>All Types</option><option>Tractor Units</option><option>Tipper</option><option>Rigids</option><option>Trailers</option>
            </select>
          </div>
          <div className="pt-6">
            <button 
              onClick={handleHomeSearch} 
              className="w-full bg-[#dc2626] text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-700 transition shadow-lg shadow-red-200"
            >
              <Search size={22} /> Search Now
            </button>
          </div>
        </div>
      </div>

      {/* LATEST ARRIVALS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 text-left">
           <div className="text-left">
              <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Featured Listings</span>
              <h2 className="text-6xl font-black tracking-tighter text-[#0f172a] leading-none">Latest Arrivals</h2>
              <p className="text-slate-500 mt-4 text-xl font-bold max-w-lg">Sourced from the UK, ready for delivery across Zimbabwe.</p>
           </div>
           <button 
             onClick={() => navigate('/inventory')} 
             className="bg-white border-2 border-slate-200 px-10 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3 group shadow-sm"
           >
              View All Inventory <span className="group-hover:translate-x-1 transition-transform text-[#dc2626]">→</span>
           </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#dc2626]" size={48} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featured.map(v => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}