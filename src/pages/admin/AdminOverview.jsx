import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, MessageSquare, Truck, Loader2, Zap, RefreshCw,
  TrendingUp, DollarSign, ArrowRight, Clock, Star, BarChart3,
  CheckCircle2, AlertCircle, MinusCircle, ExternalLink
} from 'lucide-react';
import { supabase } from '../../api/supabase';

// ─── PILL STAT CARD ───────────────────────────────────────────────────────────
function PillCard({ icon, label, value, sub, accent }) {
  return (
    <div className="bg-white px-6 py-10 rounded-[4rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-5 hover:shadow-md transition-shadow">
      <div className={accent ? `text-[${accent}]` : 'text-slate-200'}>{icon}</div>
      <div className="space-y-1">
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">{label}</p>
        <p className="text-5xl font-black text-[#0f172a] italic tracking-tighter">{value}</p>
        <p className="text-slate-300 font-bold text-[9px] uppercase tracking-widest">{sub}</p>
      </div>
    </div>
  );
}

// ─── REVENUE CARD ─────────────────────────────────────────────────────────────
function RevenueCard({ label, value, icon, dark }) {
  return (
    <div className={`rounded-[2.5rem] p-8 flex flex-col gap-3 ${dark ? 'bg-[#0f172a] text-white' : 'bg-[#dc2626] text-white'}`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{label}</p>
        <div className="opacity-30">{icon}</div>
      </div>
      <p className="text-4xl font-black italic tracking-tighter">{value}</p>
      <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Total fleet value</p>
    </div>
  );
}

// ─── STOCK STATUS BAR ─────────────────────────────────────────────────────────
function StockBar({ available, reserved, sold }) {
  const total = available + reserved + sold || 1;
  const pctA = ((available / total) * 100).toFixed(1);
  const pctR = ((reserved / total) * 100).toFixed(1);
  const pctS = ((sold / total) * 100).toFixed(1);

  const segments = [
    { label: 'Available', count: available, pct: pctA, color: 'bg-emerald-500', textColor: 'text-emerald-600', icon: <CheckCircle2 size={12}/> },
    { label: 'Reserved',  count: reserved,  pct: pctR, color: 'bg-amber-400',   textColor: 'text-amber-600',   icon: <MinusCircle size={12}/> },
    { label: 'Sold',      count: sold,      pct: pctS, color: 'bg-slate-300',   textColor: 'text-slate-500',   icon: <AlertCircle size={12}/> },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-left space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
          <BarChart3 size={13}/> Inventory Health
        </h3>
        <span className="text-[10px] font-black text-slate-300 uppercase">{total} units total</span>
      </div>

      {/* Segmented bar */}
      <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
        {segments.map(s => s.count > 0 && (
          <div key={s.label} className={`${s.color} transition-all`} style={{ width: `${s.pct}%` }} title={`${s.label}: ${s.count}`} />
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 flex-wrap">
        {segments.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <span className={`flex items-center gap-1 ${s.textColor} text-[10px] font-black uppercase`}>
              {s.icon} {s.label}
            </span>
            <span className="text-[#0f172a] font-black text-sm">{s.count}</span>
            <span className="text-slate-300 text-[9px] font-black">({s.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RECENT LEADS ─────────────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return '—';
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function RecentLeads({ leads }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-left h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
          <MessageSquare size={13}/> Recent Leads
        </h3>
        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live
        </span>
      </div>
      {leads.length === 0 ? (
        <p className="text-slate-300 font-black text-xs uppercase text-center py-8">No leads yet</p>
      ) : (
        <div className="space-y-3">
          {leads.map((lead, i) => (
            <div key={lead.id || i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">
                  {(lead.name || lead.phone || '?')[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-black text-[#0f172a]">{lead.name || lead.phone || 'Unknown'}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide truncate max-w-[160px]">
                    {lead.vehicle_interest || lead.message || 'General enquiry'}
                  </p>
                </div>
              </div>
              <span className="text-[9px] text-slate-300 font-black uppercase flex-shrink-0 flex items-center gap-1">
                <Clock size={9}/>{timeAgo(lead.created_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TOP VEHICLES ─────────────────────────────────────────────────────────────
function TopVehicles({ vehicles }) {
  const maxClicks = vehicles[0]?.click_count || 1;
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-left h-full">
      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
        <Star size={13}/> Top Vehicles by Interest
      </h3>
      {vehicles.length === 0 ? (
        <p className="text-slate-300 font-black text-xs uppercase text-center py-8">No data yet</p>
      ) : (
        <div className="space-y-4">
          {vehicles.map((v, i) => (
            <div key={v.id} className="flex items-center gap-4">
              <span className={`text-[11px] font-black w-5 flex-shrink-0 ${i === 0 ? 'text-[#dc2626]' : 'text-slate-300'}`}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-[#0f172a] truncate">{v.make} {v.model}</p>
                <div className="mt-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${i === 0 ? 'bg-[#dc2626]' : 'bg-slate-300'}`}
                    style={{ width: `${((v.click_count || 0) / maxClicks) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-400 flex-shrink-0">{v.click_count || 0} clicks</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── QUICK ACTIONS ────────────────────────────────────────────────────────────
function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    { label: 'Add New Vehicle', sub: 'List a truck instantly', color: 'bg-[#dc2626]', textColor: 'text-white', route: '/admin/stock' },
    { label: 'View All Leads', sub: 'See inquiry pipeline',   color: 'bg-[#0f172a]', textColor: 'text-white', route: '/admin/leads' },
    { label: 'Stock Manager',  sub: 'Manage inventory',       color: 'bg-slate-50',  textColor: 'text-[#0f172a]', route: '/admin/stock' },
  ];
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-left">
      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-6">
        <Zap size={13}/> Quick Actions
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map(a => (
          <button
            key={a.label}
            onClick={() => navigate(a.route)}
            className={`${a.color} ${a.textColor} rounded-2xl px-5 py-4 flex items-center justify-between font-black text-sm text-left hover:opacity-90 transition active:scale-[0.98]`}
          >
            <div>
              <p className="text-xs font-black uppercase tracking-wide">{a.label}</p>
              <p className={`text-[9px] uppercase font-bold ${a.color === 'bg-slate-50' ? 'text-slate-400' : 'opacity-50'}`}>{a.sub}</p>
            </div>
            <ArrowRight size={16} className="opacity-50 flex-shrink-0"/>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminOverview() {
  const [stats, setStats] = useState({
    stock: 0, leads: 0, transit: 0,
    available: 0, reserved: 0, sold: 0,
    totalGBP: 0, totalUSD: 0,
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [topVehicles, setTopVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAll = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      // Counts
      const [
        { count: stockCount },
        { count: transitCount },
        { count: leadCount },
        { data: vehicles },
        { data: leads },
      ] = await Promise.all([
        supabase.from('vehicles').select('*', { count: 'exact', head: true }),
        supabase.from('vehicles').select('*', { count: 'exact', head: true }).eq('location', 'In Transit'),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('vehicles').select('make, model, status, uk_price_gbp, delivered_price_usd, click_count').order('click_count', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
      ]);

      const veh = vehicles || [];
      const available = veh.filter(v => v.status === 'Available').length;
      const reserved  = veh.filter(v => v.status === 'Reserved').length;
      const sold      = veh.filter(v => v.status === 'Sold').length;
      const totalGBP  = veh.reduce((s, v) => s + (parseFloat(v.uk_price_gbp) || 0), 0);
      const totalUSD  = veh.reduce((s, v) => s + (parseFloat(v.delivered_price_usd) || 0), 0);

      setStats({ stock: stockCount || 0, leads: leadCount || 0, transit: transitCount || 0, available, reserved, sold, totalGBP, totalUSD });
      setRecentLeads(leads || []);
      setTopVehicles(veh.filter(v => (v.click_count || 0) > 0).slice(0, 5));
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toString();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-[#dc2626]" size={48} />
        <p className="font-black text-slate-300 uppercase tracking-widest text-xs">Syncing Command Center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header className="flex items-start justify-between text-left">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight uppercase italic">
            Dashboard <span className="text-[#dc2626]">Overview</span>
          </h1>
          <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-[0.3em] flex items-center gap-2">
            <Zap size={14} className="text-[#dc2626]" /> Real-time database metrics
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={() => fetchAll(true)}
            disabled={refreshing}
            className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0f172a] hover:border-slate-300 transition shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''}/> Refresh
          </button>
          {lastUpdated && (
            <p className="text-[9px] text-slate-300 font-bold flex items-center gap-1">
              <Clock size={9}/> Updated {timeAgo(lastUpdated)}
            </p>
          )}
        </div>
      </header>

      {/* TOP PILL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PillCard icon={<Package size={32}/>} label="Total Products"   value={stats.stock}   sub="Live units in system" />
        <PillCard icon={<MessageSquare size={32}/>} label="WhatsApp Leads" value={stats.leads}   sub="Total customer inquiries" />
        <PillCard icon={<Truck size={32}/>} label="On The Road"    value={stats.transit} sub="In Transit to Zimbabwe" />
      </div>

      {/* REVENUE ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueCard label="Fleet Value — UK (GBP)" value={`£${fmt(stats.totalGBP)}`} icon={<DollarSign size={28}/>} dark />
        <RevenueCard label="Fleet Value — ZIM (USD)" value={`$${fmt(stats.totalUSD)}`} icon={<TrendingUp size={28}/>} />
      </div>

      {/* INVENTORY HEALTH BAR */}
      <StockBar available={stats.available} reserved={stats.reserved} sold={stats.sold} />

      {/* BOTTOM ROW: Recent Leads | Top Vehicles | Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentLeads leads={recentLeads} />
        <TopVehicles vehicles={topVehicles} />
        <QuickActions />
      </div>

      {/* PRIORITY PIPELINE */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm text-left">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-[#0f172a] italic uppercase tracking-tighter">Priority Pipeline</h2>
          <span className="bg-red-50 text-[#dc2626] px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Active Monitoring</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Lead Conversion</p>
            <p className="text-slate-600 font-medium">
              Your current inventory has generated <span className="text-[#0f172a] font-black">{stats.leads} leads</span>. Most inquiries are coming from the <span className="text-[#dc2626] font-black">Latest Arrivals</span> section.
            </p>
          </div>
          <div className="p-8 bg-[#0f172a] rounded-[2rem] text-white">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Logistics Alert</p>
            <p className="text-slate-300 font-medium">
              There are currently <span className="text-white font-black">{stats.transit} units</span> on the water. Update their location to "Zimbabwe" in the Stock Manager once they arrive at the port.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}