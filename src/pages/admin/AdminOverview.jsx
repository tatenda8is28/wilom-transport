import React from 'react';
import { Package, MessageSquare, TrendingUp } from 'lucide-react';

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 text-left">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{label}</p>
        <p className="text-3xl font-black text-[#0f172a] my-1 tracking-tighter">{value}</p>
        <p className="text-slate-400 font-bold text-xs">{sub}</p>
      </div>
    </div>
  );
}

function ActivityRow({ label, time, text }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 pb-6 text-left last:border-0 last:pb-0">
       <div>
          <p className="text-[#0f172a] font-black">{label}</p>
          <p className="text-slate-400 text-sm font-bold">{text}</p>
       </div>
       <span className="text-[10px] font-black text-slate-400 uppercase">{time}</span>
    </div>
  );
}

export default function AdminOverview() {
  return (
    <div className="space-y-12">
      <header className="text-left">
        <h1 className="text-4xl font-black text-[#0f172a] tracking-tight">Overview</h1>
        <p className="text-slate-400 font-bold mt-2">Welcome back. Here is what's happening today.</p>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard icon={<Package className="text-blue-600"/>} label="Total Stock" value="12" sub="4 in transit from UK" />
        <StatCard icon={<MessageSquare className="text-green-600"/>} label="WhatsApp Leads" value="48" sub="+12 this week" />
        <StatCard icon={<TrendingUp className="text-[#dc2626]"/>} label="Interest Heatmap" value="Scania R450" sub="Most viewed item" />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black mb-8 text-left text-[#0f172a]">Recent Activity</h3>
        <div className="space-y-6">
          <ActivityRow label="New WhatsApp Lead" time="2 mins ago" text="Customer inquiring about MAN TGX 26.460" />
          <ActivityRow label="Price Updated" time="1 hour ago" text="Scania R450 updated from $26,500 to $27,000" />
          <ActivityRow label="Stock Added" time="5 hours ago" text="Volvo FH 460 successfully published to inventory" />
          <ActivityRow label="Status Changed" time="Yesterday" text="DAF CF Tipper moved to 'In Transit'" />
        </div>
      </div>
    </div>
  );
}