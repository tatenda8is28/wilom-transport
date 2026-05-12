import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Truck, MapPin, Calendar, Settings2, Gauge, 
  MessageCircle, ArrowLeft, Loader2, Anchor, 
  ChevronRight, ArrowRight 
} from 'lucide-react';
import { supabase } from '../../api/supabase';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [v, setVehicle] = useState(null);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    // Reset page scroll when changing vehicles
    window.scrollTo(0, 0);
    fetchData();
  }, [id]);

  async function fetchData() {
    setLoading(true);
    
    // 1. Fetch Current Vehicle
    const { data: current, error } = await supabase.from('vehicles').select('*').eq('id', id).single();
    
    if (current) {
      setVehicle(current);
      setActiveImage(current.main_image);

      // 2. Fetch Similar Units (Same make or same body type, excluding current ID)
      const { data: similar } = await supabase
        .from('vehicles')
        .select('*')
        .neq('id', id) // Don't show the same truck
        .or(`make.eq.${current.make},body_type.eq.${current.body_type}`)
        .limit(3);
      
      setOthers(similar || []);
    }
    setLoading(false);
  }

  if (loading) return <div className="flex justify-center py-40 min-h-screen bg-slate-50"><Loader2 className="animate-spin text-[#dc2626]" size={60} /></div>;
  if (!v) return <div className="p-20 text-center font-black">Vehicle not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 py-12 text-left">
        
        <button onClick={() => navigate('/inventory')} className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest mb-10 hover:text-[#0f172a] transition">
          <ArrowLeft size={16}/> Back to Inventory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          
          {/* LEFT: MEDIA & DESCRIPTION */}
          <div className="lg:col-span-7 space-y-10">
            <div className="aspect-[16/10] bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm">
              <img src={activeImage} className="w-full h-full object-cover transition-all duration-500" alt={v.model} />
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
               {[v.main_image, ...(v.image_gallery || [])].map((img, i) => (
                 <button key={i} onClick={() => setActiveImage(img)} className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImage === img ? 'border-[#dc2626] scale-95' : 'border-white hover:border-slate-200'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="" />
                 </button>
               ))}
            </div>

            <div className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm text-left">
               <h3 className="font-black text-2xl text-[#0f172a] mb-6 uppercase italic tracking-tighter">Vehicle Description</h3>
               <p className="text-slate-500 font-medium text-lg leading-relaxed whitespace-pre-wrap">
                 {v.description || "No specific description notes for this unit. Please contact our UK or ZIM agents for full technical condition details."}
               </p>
            </div>
          </div>

          {/* RIGHT: SPECS & PRICING */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm sticky top-28">
               <div className="flex justify-between items-start mb-6">
                 <div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] leading-none mb-3 italic uppercase tracking-tighter">{v.make}</h1>
                    <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">{v.model}</p>
                 </div>
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${v.status === 'Sold' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{v.status}</span>
               </div>

               <div className="grid grid-cols-2 gap-4 bg-slate-50 p-8 rounded-[2.5rem] mb-10 border border-slate-100">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">UK Price</span>
                    <span className="text-2xl font-black text-[#0f172a]">£{v.uk_price_gbp?.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-[#dc2626] uppercase tracking-widest block mb-1">Delivered ZIM</span>
                    <span className="text-3xl font-black text-[#dc2626] tracking-tighter">${v.delivered_price_usd?.toLocaleString()}</span>
                  </div>
               </div>

               <button 
                 onClick={() => window.open(`https://wa.me/263710500296?text=Interested in ${v.make} ${v.model} (${v.year})`)}
                 className="w-full bg-[#25d366] text-white py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-4 shadow-xl hover:bg-[#1fb356] transition mb-8"
               >
                 <MessageCircle size={24} /> WhatsApp Inquiry
               </button>

               <div className="space-y-4 pt-8 border-t border-slate-50">
                  <SpecRow label="Stock #" value={v.stock_number} color="text-[#dc2626]" />
                  <SpecRow label="Year" value={v.year} />
                  <SpecRow label="Mileage" value={`${v.mileage_miles?.toLocaleString()} Mi`} />
                  <SpecRow label="Gearbox" value={v.gearbox} />
                  <SpecRow label="Axle" value={v.axle_config} />
                  <SpecRow label="Location" value={v.location} />
               </div>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION: SIMILAR / OTHER STOCK --- */}
        <section className="border-t border-slate-200 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
             <div className="text-left">
                <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Recommendation</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#0f172a] uppercase italic leading-none">Other Units You May Like</h2>
             </div>
             <Link to="/inventory" className="bg-white border-2 border-slate-200 px-10 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all flex items-center gap-3">
                Full Stock List <ArrowRight size={18} />
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {others.length === 0 ? (
              <p className="col-span-3 text-slate-400 font-bold text-center py-10 uppercase text-xs tracking-widest">Searching for more inventory...</p>
            ) : (
              others.map(unit => (
                <Link to={`/vehicle/${unit.id}`} key={unit.id} className="group">
                  <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={unit.main_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      <div className="absolute bottom-4 right-4 bg-[#0f172a] text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase">{unit.location}</div>
                    </div>
                    <div className="p-8 text-left">
                      <h4 className="font-black text-xl text-[#0f172a] uppercase mb-1">{unit.make}</h4>
                      <p className="text-slate-400 font-bold text-sm mb-6 uppercase">{unit.model}</p>
                      <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                        <span className="font-black text-[#dc2626] text-lg">${unit.delivered_price_usd?.toLocaleString()}</span>
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#0f172a] group-hover:bg-[#dc2626] group-hover:text-white transition-colors">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

function SpecRow({ label, value, color = "text-[#0f172a]" }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className={`font-bold uppercase ${color}`}>{value || 'N/A'}</span>
    </div>
  );
}