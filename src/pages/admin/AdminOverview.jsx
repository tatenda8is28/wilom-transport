import React, { useEffect, useState } from 'react';
import { Package, MessageSquare, Truck, Loader2 } from 'lucide-react';
import { supabase } from '../../api/supabase';

function PillCard({ icon, label, value, sub }) {
  return (
    <div className="bg-white px-6 py-12 rounded-[4rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-6">
      <div className="text-slate-200">{icon}</div>
      <div className="space-y-1">
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">{label}</p>
        <p className="text-5xl font-black text-[#0f172a] italic tracking-tighter">{value}</p>
        <p className="text-slate-300 font-bold text-[9px] uppercase tracking-widest">{sub}</p>
      </div>
    </div>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState({ stock: 0, leads: 0, transit: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardData() {
      // Get Total Stock
      const { count: stockCount } = await supabase.from('vehicles').select('*', { count: 'exact', head: true });
      // Get In Transit Count
      const { count: transitCount } = await supabase.from('vehicles').select('*', { count: 'exact', head: true }).eq('location', 'In Transit');
      
      setStats({
        stock: stockCount || 0,
        transit: transitCount || 0,
        leads: 4 // This will be dynamic once we wire the click tracker
      });
      setLoading(false);
    }
    getDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#dc2626]" /></div>;

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PillCard icon={<Package size={32}/>} label="Total Products" value={stats.stock} sub="Live in Inventory" />
        <PillCard icon={<MessageSquare size={32}/>} label="WhatsApp leads" value={stats.leads} sub="Inbound Inquiries" />
        <PillCard icon={<Truck size={32}/>} label="On The Road" value={stats.transit} sub="Units in Shipping" />
      </div>

      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
        <h2 className="text-3xl font-black text-[#0f172a] italic uppercase tracking-tighter mb-10 text-left text-left">Priority Pipeline</h2>
        <p className="text-slate-400 font-bold uppercase text-xs text-left">Monitoring active stock movement from UK to ZW</p>
      </div>
    </div>
  );
}