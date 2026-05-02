import React from 'react';
import { MessageSquare, Calendar, User } from 'lucide-react';

function LeadRow({ customer, vehicle, time, status }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition gap-6">
      <div className="flex gap-6 items-center">
        <div className="w-14 h-14 bg-green-50 flex items-center justify-center rounded-2xl text-green-600">
          <MessageSquare size={24} />
        </div>
        <div className="text-left">
          <p className="font-black text-xl text-[#0f172a]">{customer}</p>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-2">
            Interested in: <span className="text-[#dc2626]">{vehicle}</span>
          </p>
        </div>
      </div>
      
      <div className="flex flex-col md:items-end gap-2 text-left md:text-right">
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase">
          <Calendar size={14} /> {time}
        </div>
        <span className="bg-slate-100 text-[#0f172a] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em]">
          WhatsApp Inquiry
        </span>
      </div>
    </div>
  );
}

export default function AdminLeads() {
  return (
    <div className="space-y-12">
      <header className="text-left">
        <h1 className="text-4xl font-black text-[#0f172a] tracking-tight">WhatsApp Leads</h1>
        <p className="text-slate-400 font-bold mt-2">Track which vehicles are receiving the most interest.</p>
      </header>

      {/* LEAD LOG */}
      <div className="space-y-6">
        <LeadRow customer="Customer #9902" vehicle="MAN TGX 26.460 6x2" time="Today, 11:20 AM" />
        <LeadRow customer="Customer #9901" vehicle="Scania R450 Highline" time="Today, 09:45 AM" />
        <LeadRow customer="Customer #9898" vehicle="Volvo FH 460" time="Yesterday, 04:15 PM" />
        <LeadRow customer="Customer #9895" vehicle="Scania R450 Highline" time="Yesterday, 01:10 PM" />
        <LeadRow customer="Customer #9890" vehicle="MAN TGX 26.460 6x2" time="2 days ago" />
      </div>
      
      {/* SUMMARY BOX */}
      <div className="bg-[#0f172a] p-10 rounded-[40px] text-white flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="text-left">
            <h3 className="text-2xl font-black tracking-tight">Lead Performance</h3>
            <p className="text-slate-400 font-bold mt-2">Scania models are currently 40% more popular than other brands.</p>
         </div>
         <button className="bg-[#dc2626] px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest whitespace-nowrap">Export Log (CSV)</button>
      </div>
    </div>
  );
}