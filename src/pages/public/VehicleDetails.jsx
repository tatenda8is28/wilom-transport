import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Truck, MapPin, Calendar, Settings2, Gauge, MessageCircle, ArrowLeft, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../api/supabase';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [v, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    async function fetchVehicle() {
      const { data } = await supabase.from('vehicles').select('*').eq('id', id).single();
      if (data) {
        setVehicle(data);
        setActiveImage(data.main_image);
      }
      setLoading(false);
    }
    fetchVehicle();
  }, [id]);

  if (loading) return <div className="flex justify-center py-40"><Loader2 className="animate-spin text-[#dc2626]" size={60} /></div>;
  if (!v) return <div className="p-20 text-center font-black">Vehicle not found.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 py-12 text-left">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mb-10 hover:text-[#0f172a] transition">
          <ArrowLeft size={16}/> Back to Inventory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: MEDIA GALLERY (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[16/10] bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm">
              <img src={activeImage} className="w-full h-full object-cover" alt={v.model} />
            </div>
            
            {/* THUMBNAILS */}
            <div className="grid grid-cols-5 md:grid-cols-6 gap-4">
               {[v.main_image, ...(v.image_gallery || [])].map((img, i) => (
                 <button key={i} onClick={() => setActiveImage(img)} className={`aspect-square rounded-2xl overflow-hidden border-4 transition ${activeImage === img ? 'border-[#dc2626]' : 'border-white'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="" />
                 </button>
               ))}
            </div>
          </div>

          {/* RIGHT: SPECS & PRICING (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
               <span className="text-[#dc2626] font-black uppercase tracking-[0.3em] text-[10px] block mb-4">Stock #{v.stock_number}</span>
               <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] leading-none mb-3 italic uppercase tracking-tighter">{v.make}</h1>
               <p className="text-slate-400 font-bold text-xl uppercase mb-8">{v.model}</p>

               <div className="grid grid-cols-2 gap-4 bg-slate-50 p-8 rounded-[2rem] mb-8 border border-slate-100">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">UK Price</span>
                    <span className="text-2xl font-black text-[#0f172a]">£{v.uk_price_gbp?.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-[#dc2626] uppercase block mb-1">Delivered ZIM</span>
                    <span className="text-3xl font-black text-[#dc2626] tracking-tighter">${v.delivered_price_usd?.toLocaleString()}</span>
                  </div>
               </div>

               <button 
                 onClick={() => window.open(`https://wa.me/263710500296?text=Interested in #${v.stock_number}`)}
                 className="w-full bg-[#25d366] text-white py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-[#1fb356] transition active:scale-95"
               >
                 <MessageCircle size={24} /> Enquire on WhatsApp
               </button>
            </div>

            {/* QUICK SPECS TABLE */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm text-left">
               <h3 className="font-black text-xl text-[#0f172a] mb-8 uppercase italic tracking-tighter">Technical Data</h3>
               <div className="space-y-4">
                  <SpecRow label="Registration" value={v.registration} />
                  <SpecRow label="Year" value={v.year} />
                  <SpecRow label="Mileage" value={`${v.mileage_miles?.toLocaleString()} Mi`} />
                  <SpecRow label="Transmission" value={v.gearbox} />
                  <SpecRow label="Axle Config" value={v.axle_config} />
                  <SpecRow label="Body Type" value={v.body_type} />
                  <SpecRow label="Location" value={v.location} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
      <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
      <span className="font-bold text-[#0f172a] uppercase">{value || 'N/A'}</span>
    </div>
  );
}