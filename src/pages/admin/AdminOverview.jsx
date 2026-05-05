import React, { useEffect, useState } from 'react';
import { Package, MessageSquare, Truck, Loader2, Zap } from 'lucide-react';
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
      setLoading(true);
      
      // 1. Get Total Stock Count
      const { count: stockCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true });

      // 2. Get In Transit Count
      const { count: transitCount } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true })
        .eq('location', 'In Transit');

      // 3. Get Total Leads Count (WhatsApp clicks) - NOW DYNAMIC
      const { count: leadCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });
      
      setStats({
        stock: stockCount || 0,
        transit: transitCount || 0,
        leads: leadCount || 0 // Corrected from hardcoded "4"
      });

      setLoading(false);
    }

    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-[#dc2626]" size={48} />
        <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Syncing Command Center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      
      {/* HEADER SECTION */}
      <header className="text-left mb-10">
        <h1 className="text-4xl font-black text-[#0f172a] tracking-tight uppercase italic">Dashboard <span className="text-[#dc2626]">Overview</span></h1>
        <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
          <Zap size={14} className="text-[#dc2626]" /> Real-time database metrics
        </p>
      </header>

      {/* PILL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PillCard 
          icon={<Package size={32}/>} 
          label="Total Products" 
          value={stats.stock} 
          sub="Live units in system" 
        />
        <PillCard 
          icon={<MessageSquare size={32}/>} 
          label="WhatsApp Leads" 
          value={stats.leads} 
          sub="Total customer inquiries" 
        />
        <PillCard 
          icon={<Truck size={32}/>} 
          label="On The Road" 
          value={stats.transit} 
          sub="In Transit to Zimbabwe" 
        />
      </div>

      {/* PRIORITY PIPELINE SECTION */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm text-left">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-[#0f172a] italic uppercase tracking-tighter">Priority Pipeline</h2>
          <span className="bg-red-50 text-[#dc2626] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Active Monitoring</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lead Conversion</p>
            <p className="text-slate-600 font-medium">Your current inventory has generated <span className="text-[#0f172a] font-black">{stats.leads} leads</span>. Most inquiries are coming from the <span className="text-[#dc2626] font-black">Latest Arrivals</span> section.</p>
          </div>
          <div className="p-8 bg-[#0f172a] rounded-[2rem] text-white">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Logistics Alert</p>
            <p className="text-slate-300 font-medium">There are currently <span className="text-white font-black">{stats.transit} units</span> on the water. Update their location to "Zimbabwe" in the Stock Manager once they arrive at the port.</p>
          </div>
        </div>
      </div>

    </div>
  );
}