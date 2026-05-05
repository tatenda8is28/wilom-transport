import React, { useEffect, useState } from 'react';
import { MessageSquare, Calendar, Trash2, Loader2, User, ExternalLink, Zap } from 'lucide-react';
import { supabase } from '../../api/supabase';

function LeadCard({ lead, onDelete }) {
  const isGeneral = lead.type === 'general_contact';
  
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex gap-6 items-center">
        {/* ICON CIRCLE */}
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${isGeneral ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
          <MessageSquare size={28} />
        </div>

        {/* LEAD INFO */}
        <div className="text-left">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-black text-xl text-[#0f172a]">
              {isGeneral ? "General Inquiry" : "WhatsApp Product Interest"}
            </h3>
            <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${isGeneral ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              New Lead
            </span>
          </div>
          
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
             Status: <span className={isGeneral ? "text-blue-500" : "text-[#dc2626]"}>
               {isGeneral ? "Customer wants to talk" : `Interested in ${lead.vehicle_name}`}
             </span>
          </p>
        </div>
      </div>

      {/* METADATA & ACTIONS */}
      <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2 text-slate-300 font-black text-[10px] uppercase tracking-widest">
          <Calendar size={14} /> 
          {new Date(lead.created_at).toLocaleDateString()} at {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => onDelete(lead.id)}
             className="p-3 bg-red-50 text-red-300 hover:text-red-600 hover:bg-red-100 rounded-2xl transition shadow-sm"
           >
             <Trash2 size={18} />
           </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, products: 0 });

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setLeads(data);
      const productLeads = data.filter(l => l.type === 'whatsapp_inquiry').length;
      setStats({ total: data.length, products: productLeads });
    }
    setLoading(false);
  }

  const handleDeleteLead = async (id) => {
    if (window.confirm("Delete this lead entry?")) {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (!error) fetchLeads();
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-left">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0f172a] tracking-tighter italic leading-none">
            INBOUND <span className="text-[#dc2626]">LEADS</span>
          </h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.3em] flex items-center gap-3">
             <Zap size={16} className="text-[#dc2626]" /> Real-time customer activity log
          </p>
        </div>
        
        {/* MINI STATS */}
        <div className="flex gap-4">
           <div className="bg-white px-8 py-4 rounded-[2rem] border border-slate-100 shadow-sm text-center">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Total</p>
              <p className="text-2xl font-black text-[#0f172a]">{stats.total}</p>
           </div>
           <div className="bg-[#0f172a] px-8 py-4 rounded-[2rem] text-center shadow-xl">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock Inquiries</p>
              <p className="text-2xl font-black text-white">{stats.products}</p>
           </div>
        </div>
      </header>

      {/* LEADS LIST */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#dc2626]" size={40} /></div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-[4rem] border border-dashed border-slate-200 py-32 text-center">
             <User size={48} className="mx-auto text-slate-100 mb-6" />
             <p className="text-slate-300 font-black uppercase tracking-widest">No customer inquiries recorded yet.</p>
          </div>
        ) : (
          leads.map(lead => (
            <LeadCard key={lead.id} lead={lead} onDelete={handleDeleteLead} />
          ))
        )}
      </div>

      {/* FOOTER TIP */}
      <div className="p-10 bg-slate-100 rounded-[3rem] text-left">
         <h3 className="font-black text-[#0f172a] text-lg mb-2">💡 Marketing Tip</h3>
         <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
            These leads represent people who clicked your WhatsApp button. If you see many leads for a specific truck but no sales, consider adjusting the "Delivered ZIM" price to be more competitive.
         </p>
      </div>
    </div>
  );
}