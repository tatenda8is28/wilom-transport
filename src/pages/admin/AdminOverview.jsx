import React from 'react';
import { Package, MessageSquare, TrendingUp, Truck, Clock } from 'lucide-react';

function PillCard({ icon, label, value, sub, color }) {
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
  return (
    <div className="space-y-10">
      
      {/* VERTICAL PILL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PillCard icon={<TrendingUp size={32}/>} label="Total Revenue" value="£0" sub="UK Orders Delivered" />
        <PillCard icon={<Clock size={32}/>} label="Active Leads" value="4" sub="Awaiting WhatsApp" />
        <PillCard icon={<Truck size={32}/>} label="On The Water" value="2" sub="In Transit to Zim" />
      </div>

      {/* PRIORITY LIST (Matches Inspiration) */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
        <h2 className="text-3xl font-black text-[#0f172a] italic uppercase tracking-tighter mb-10 text-left">Priority Items</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                <th className="pb-6">Reference</th>
                <th className="pb-6">Location</th>
                <th className="pb-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-black text-[#0f172a]">
              <tr className="border-t border-slate-50">
                <td className="py-6 uppercase italic">Scania R450</td>
                <td className="py-6 uppercase text-slate-400">UK Stock</td>
                <td className="py-6"><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[9px]">READY</span></td>
              </tr>
              <tr className="border-t border-slate-50">
                <td className="py-6 uppercase italic">Mercedes Actros</td>
                <td className="py-6 uppercase text-slate-400">On Vessel</td>
                <td className="py-6"><span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[9px]">TRANSIT</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}