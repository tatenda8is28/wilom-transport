import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, Phone, Gauge, Calendar, 
  MapPin, Search, ChevronDown, Loader2, 
  MessageCircle, Settings2, Truck, Anchor, Eye 
} from 'lucide-react';
import { supabase } from '../../api/supabase';

// NEW BRAND DATA USING YOUR LOCAL FILES
const BRAND_LOGOS = [
  { name: 'MAN', src: '/brand-man.png' },
  { name: 'SCANIA', src: '/brand-scania.png' },
  { name: 'VOLVO', src: '/brand-volvo.png' },
  { name: 'MERCEDES', src: '/brand-mercedes.png' },
  { name: 'DAF', src: '/brand-daf.png' },
  { name: 'IVECO', src: '/brand-iveco.png' },
  { name: 'RENAULT', src: '/brand-renault.png' },
  { name: 'TOYOTA', src: '/brand-toyota.png' },
  { name: 'KUBOTA', src: '/brand-kubota.png' },
];

function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col h-full text-left">
      <div className="relative aspect-[16/11] overflow-hidden">
        <img src={vehicle.main_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
        <div className="absolute top-6 left-6"><span className="bg-[#22c55e] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">{vehicle.badge}</span></div>
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#0f172a] text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-xl"><MapPin size={12} className="text-[#dc2626]" /> {vehicle.location}</div>
      </div>
      <div className="p-10 flex-grow flex flex-col">
        <h3 className="font-black text-3xl text-[#0f172a] leading-none mb-2 uppercase italic">{vehicle.make}</h3>
        <p className="text-slate-400 font-bold text-lg mb-6 uppercase">{vehicle.model}</p>
        <div className="grid grid-cols-2 gap-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-10 pt-6 border-t border-slate-50">
           <div className="flex items-center gap-2 text-left"><Calendar size={14} className="text-slate-200"/> {vehicle.year} Model</div>
           <div className="flex items-center gap-2 text-left"><Settings2 size={14} className="text-slate-200"/> {vehicle.gearbox}</div>
           <div className="flex items-center gap-2 text-left"><Truck size={14} className="text-slate-200"/> {vehicle.axle_config}</div>
           <div className="flex items-center gap-2 text-left"><Gauge size={14} className="text-slate-200"/> {vehicle.mileage_miles?.toLocaleString()} Mi</div>
        </div>
        <div className="flex justify-between items-end bg-slate-50 p-7 rounded-[2rem] mb-8">
          <div className="text-left">
            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">UK Price</span>
            <span className="text-xl font-black text-[#0f172a]">£{Number(vehicle.uk_price_gbp).toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-black text-[#dc2626] uppercase block mb-1">Delivered ZIM</span>
            <span className="text-2xl font-black text-[#dc2626]">${Number(vehicle.delivered_price_usd).toLocaleString()}</span>
          </div>
        </div>
        <Link to={`/vehicle/${vehicle.id}`} className="w-full bg-[#0f172a] text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl">
          <Eye size={22} /> View Full Specs
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMake, setSearchMake] = useState('All Brands');
  const [searchType, setSearchType] = useState('All Types');

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase.from('vehicles').select('*').limit(3).order('created_at', { ascending: false });
      if (data) setFeatured(data);
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
           <img src="/hero-truck.jpg" className="w-full h-full object-cover opacity-25" alt="Hero" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/70 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-left uppercase italic">
           <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 px-5 py-2 rounded-full text-[#dc2626] text-[11px] font-black inline-flex items-center gap-3 mb-10 tracking-widest not-italic">
              <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse"></span>
              UK to Zimbabwe — Direct Import
           </div>
           <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] mb-10 tracking-tighter">Heavy Duty Deals. <br /><span className="text-[#dc2626]">Delivered Across <br /> Borders.</span></h1>
           <div className="flex flex-wrap gap-5 not-italic">
              <button onClick={() => navigate('/inventory')} className="bg-[#dc2626] text-white px-12 py-5 rounded-xl font-black text-lg flex items-center gap-3 group shadow-2xl">Browse Vehicles <ArrowRight size={22} /></button>
              <button onClick={() => window.open('https://wa.me/263710500296')} className="bg-white/5 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-xl font-black text-lg hover:bg-white/10 transition flex items-center gap-3"><Phone size={22} className="text-[#dc2626]"/> Contact Us</button>
           </div>
        </div>
      </section>

      {/* SEARCH OVERLAY */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 md:-mt-16 relative z-30">
        <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <select value={searchMake} onChange={(e) => setSearchMake(e.target.value)} className="bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 cursor-pointer"><option>All Brands</option><option>Mercedes-Benz</option><option>Scania</option><option>Volvo</option></select>
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 cursor-pointer"><option>All Types</option><option>Tractor Units</option><option>Tipper</option></select>
          <button onClick={handleHomeSearch} className="bg-[#dc2626] text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-700 transition shadow-lg"><Search size={22} /> Search Now</button>
        </div>
      </div>

      {/* BRANDS SECTION - UPDATED WITH YOUR NEW IMAGES */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-left">
        <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Trusted Manufacturers</span>
        <h2 className="text-5xl font-black tracking-tighter text-[#0f172a] mb-12 italic uppercase">Premium Brands We Stock</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
           {BRAND_LOGOS.map(brand => (
             <div key={brand.name} className="bg-white h-44 rounded-[3rem] border border-slate-100 flex flex-col items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group p-8">
                <img 
                  src={brand.src} 
                  alt={brand.name} 
                  className="h-20 w-auto object-contain mb-4 transition-all duration-500 grayscale group-hover:grayscale-0" 
                  onError={(e) => { e.target.style.opacity = '0.3' }}
                />
                <span className="text-[11px] font-black text-slate-400 group-hover:text-[#dc2626] tracking-[0.2em] uppercase transition-colors">{brand.name}</span>
             </div>
           ))}
        </div>
      </section>

      {/* LATEST ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 text-left">
           <div><span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Hand-Picked</span><h2 className="text-6xl font-black tracking-tighter text-[#0f172a] leading-none uppercase italic">Latest Arrivals</h2></div>
           <button onClick={() => navigate('/inventory')} className="bg-white border-2 border-slate-200 px-10 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all shadow-sm">View All Inventory <ArrowRight size={18} className="inline ml-2" /></button>
        </div>
        {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#dc2626]" size={48} /></div> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
            {featured.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        )}
      </section>

      {/* GLOBAL REACH */}
      <section className="max-w-7xl mx-auto px-4 py-32 pb-40">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="text-left">
              <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Global Logistics</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] italic uppercase tracking-tighter mb-8 leading-none text-left">Our client base <br /> is worldwide..!</h2>
              <div className="space-y-6 text-slate-500 font-medium text-lg leading-relaxed text-left">
                <p>Whilst meeting the needs of our UK customers, we ship our trucks to the majority of right-hand drive countries around the World.</p>
                <div className="flex gap-6 mt-8">
                  <img src="https://flagcdn.com/mw.svg" className="h-10 w-auto rounded shadow-sm" alt="Malawi" /><img src="https://flagcdn.com/zm.svg" className="h-10 w-auto rounded shadow-sm" alt="Zambia" /><img src="https://flagcdn.com/zw.svg" className="h-10 w-auto rounded shadow-sm" alt="Zimbabwe" /><img src="https://flagcdn.com/tz.svg" className="h-10 w-auto rounded shadow-sm" alt="Tanzania" />
                </div>
              </div>
           </div>
           <div className="bg-[#0f172a] p-10 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 text-left">
                 <h4 className="text-[#dc2626] font-black uppercase tracking-widest text-xs mb-8">Popular African Port Destinations</h4>
                 <ul className="space-y-6">
                    <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/> <div><p className="font-black text-lg">Walvis Bay</p><p className="text-slate-500 text-[10px] uppercase tracking-widest">Namibia</p></div></li>
                    <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/> <div><p className="font-black text-lg">Durban</p><p className="text-slate-500 text-[10px] uppercase tracking-widest">South Africa</p></div></li>
                    <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]"/> <div><p className="font-black text-lg">Maputo</p><p className="text-slate-500 text-[10px] uppercase tracking-widest">Mozambique</p></div></li>
                 </ul>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}