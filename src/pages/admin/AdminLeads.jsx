import React, { useEffect, useState, useCallback } from 'react';
import {
  MessageSquare, Calendar, Trash2, Loader2, Zap,
  Download, Eye, Phone, Truck, Search, Filter,
  CheckSquare, Square, RefreshCw
} from 'lucide-react';
import { supabase } from '../../api/supabase';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeStr(val) {
  if (val === null || val === undefined) return '';
  return String(val);
}

function initials(name) {
  const n = safeStr(name).trim();
  if (!n) return '?';
  return n.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function fmtDate(iso) {
  if (!iso) return '—';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return (
      d.toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' +
      d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    );
  } catch {
    return '—';
  }
}

function exportToCSV(leads) {
  const rows = [['Name', 'Phone', 'Type', 'Vehicle', 'Status', 'Date']];
  leads.forEach(l =>
    rows.push([
      safeStr(l.name),
      safeStr(l.phone),
      l.type === 'whatsapp_inquiry' ? 'WhatsApp' : 'General',
      safeStr(l.vehicle_name),
      safeStr(l.status) || 'new',
      fmtDate(l.created_at),
    ])
  );
  const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

// ─── Error Boundary ───────────────────────────────────────────────────────────

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-red-500 font-bold text-sm mb-1">Could not render this lead card.</p>
          <p className="text-red-400 text-xs font-mono">{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  new:       'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-800',
  closed:    'bg-green-100 text-green-700',
};

function StatusBadge({ status }) {
  const s = safeStr(status) || 'new';
  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${STATUS_STYLES[s] || STATUS_STYLES.new}`}>
      {s}
    </span>
  );
}

// ─── Lead Card ────────────────────────────────────────────────────────────────

function LeadCard({ lead, selected, onSelect, onDelete, onMarkRead, onStatusChange }) {
  const isWA    = lead.type === 'whatsapp_inquiry';
  const name    = safeStr(lead.name) || 'Unknown';
  const phone   = safeStr(lead.phone);
  const vehicle = safeStr(lead.vehicle_name);
  const status  = safeStr(lead.status) || 'new';
  const unread  = Boolean(lead.unread);

  return (
    <div
      className={[
        'bg-white border rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-150',
        unread   ? 'border-l-4 border-l-blue-500 border-slate-100' : 'border-slate-100',
        selected ? 'bg-blue-50 border-blue-200' : 'hover:shadow-sm',
      ].join(' ')}
    >
      {/* Checkbox */}
      <button
        onClick={() => onSelect(lead.id)}
        className="text-slate-300 hover:text-blue-500 transition shrink-0 mt-0.5"
        aria-label={selected ? 'Deselect lead' : 'Select lead'}
      >
        {selected ? <CheckSquare size={18} className="text-blue-500" /> : <Square size={18} />}
      </button>

      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isWA ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
        {initials(name)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {unread && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" title="Unread" />}
          <span className="font-semibold text-[#0f172a] text-sm">{name}</span>
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${isWA ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
            {isWA ? 'WhatsApp' : 'General'}
          </span>
          <StatusBadge status={status} />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
          {phone && <span className="flex items-center gap-1"><Phone size={11} /> {phone}</span>}
          {isWA && vehicle && <span className="flex items-center gap-1"><Truck size={11} /> {vehicle}</span>}
          <span className="flex items-center gap-1"><Calendar size={11} /> {fmtDate(lead.created_at)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        <select
          value={status}
          onChange={e => onStatusChange(lead.id, e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Update lead status"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>

        {unread && (
          <button
            onClick={() => onMarkRead(lead.id)}
            title="Mark as read"
            className="p-1.5 rounded-lg bg-blue-50 text-blue-400 hover:text-blue-600 hover:bg-blue-100 transition"
          >
            <Eye size={15} />
          </button>
        )}

        <button
          onClick={() => onDelete(lead.id)}
          title="Delete lead"
          className="p-1.5 rounded-lg bg-red-50 text-red-300 hover:text-red-600 hover:bg-red-100 transition"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminLeads() {
  const [leads, setLeads]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [saving, setSaving]             = useState(false);
  const [search, setSearch]             = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType]     = useState('');
  const [selected, setSelected]         = useState(new Set());

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const safe = (data || []).map(l => ({
        ...l,
        name:         l.name         ?? null,
        phone:        l.phone        ?? null,
        status:       l.status       ?? 'new',
        unread:       l.unread       ?? true,
        vehicle_name: l.vehicle_name ?? null,
        created_at:   l.created_at   ?? null,
      }));

      setLeads(safe);
    } catch (err) {
      console.error('Error fetching leads:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // ── Filtered list ─────────────────────────────────────────────────────────

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    if (q) {
      const nameMatch  = safeStr(l.name).toLowerCase().includes(q);
      const phoneMatch = safeStr(l.phone).includes(q);
      if (!nameMatch && !phoneMatch) return false;
    }
    if (filterStatus && (l.status || 'new') !== filterStatus) return false;
    if (filterType   && l.type !== filterType)                 return false;
    return true;
  });

  // ── Stats ─────────────────────────────────────────────────────────────────

  const stats = {
    total:    leads.length,
    unread:   leads.filter(l => Boolean(l.unread)).length,
    whatsapp: leads.filter(l => l.type === 'whatsapp_inquiry').length,
    closed:   leads.filter(l => (l.status || 'new') === 'closed').length,
  };

  // ── Single actions ────────────────────────────────────────────────────────

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    
    if (!error) {
      setLeads(prev => prev.filter(l => l.id !== id));
      setSelected(prev => { const s = new Set(prev); s.delete(id); return s; });
    }
  };

  const handleMarkRead = async (id) => {
    const { error } = await supabase.from('leads').update({ unread: false }).eq('id', id);
    if (!error) setLeads(prev => prev.map(l => l.id === id ? { ...l, unread: false } : l));
  };

  const handleStatusChange = async (id, status) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (!error) setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  // ── Selection ─────────────────────────────────────────────────────────────

  const toggleSelect = (id) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const allFilteredSelected = filtered.length > 0 && filtered.every(l => selected.has(l.id));

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(l => s.delete(l.id)); return s; });
    } else {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(l => s.add(l.id)); return s; });
    }
  };

  // ── Bulk actions ──────────────────────────────────────────────────────────

  const bulkDelete = async () => {
    if (!selected.size) return;
    if (!window.confirm(`Delete ${selected.size} lead(s)? This cannot be undone.`)) return;
    setSaving(true);
    const { error } = await supabase.from('leads').delete().in('id', [...selected]);
    if (!error) { setLeads(prev => prev.filter(l => !selected.has(l.id))); setSelected(new Set()); }
    setSaving(false);
  };

  const bulkMarkRead = async () => {
    if (!selected.size) return;
    setSaving(true);
    const { error } = await supabase.from('leads').update({ unread: false }).in('id', [...selected]);
    if (!error) { setLeads(prev => prev.map(l => selected.has(l.id) ? { ...l, unread: false } : l)); setSelected(new Set()); }
    setSaving(false);
  };

  const bulkSetStatus = async (status) => {
    if (!selected.size) return;
    setSaving(true);
    const { error } = await supabase.from('leads').update({ status }).in('id', [...selected]);
    if (!error) { setLeads(prev => prev.map(l => selected.has(l.id) ? { ...l, status } : l)); setSelected(new Set()); }
    setSaving(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-[#0f172a] tracking-tighter italic leading-none">
            INBOUND <span className="text-[#dc2626]">LEADS</span>
          </h1>
          <p className="text-slate-400 font-bold mt-3 uppercase tracking-[0.3em] text-xs flex items-center gap-2">
            <Zap size={14} className="text-[#dc2626]" /> Real-time customer activity log
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Total',    value: stats.total,    dark: false },
            { label: 'Unread',   value: stats.unread,   dark: false, red: true },
            { label: 'WhatsApp', value: stats.whatsapp, dark: true },
            { label: 'Closed',   value: stats.closed,   dark: false },
          ].map(s => (
            <div key={s.label} className={`px-6 py-3 rounded-2xl text-center ${s.dark ? 'bg-[#0f172a]' : 'bg-white border border-slate-100 shadow-sm'}`}>
              <p className={`text-[9px] font-black uppercase tracking-widest mb-0.5 ${s.dark ? 'text-slate-400' : 'text-slate-300'}`}>{s.label}</p>
              <p className={`text-xl font-black ${s.dark ? 'text-white' : s.red ? 'text-[#dc2626]' : 'text-[#0f172a]'}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
          <input
            type="text"
            placeholder="Search name or phone…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
          />
        </div>

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>

        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100">
          <option value="">All types</option>
          <option value="general_contact">General inquiry</option>
          <option value="whatsapp_inquiry">WhatsApp interest</option>
        </select>

        <button onClick={() => exportToCSV(leads)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 transition">
          <Download size={14} /> Export CSV
        </button>

        <button onClick={fetchLeads} title="Refresh"
          className="p-2 border border-slate-200 rounded-xl bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition">
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0f172a] text-white px-6 py-3 rounded-2xl">
          <span className="text-sm font-semibold">
            {saving ? 'Saving…' : `${selected.size} lead${selected.size > 1 ? 's' : ''} selected`}
          </span>
          <div className="flex flex-wrap gap-2">
            <button onClick={bulkMarkRead} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition flex items-center gap-1.5"><Eye size={12} /> Mark read</button>
            <button onClick={() => bulkSetStatus('contacted')} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition flex items-center gap-1.5"><Phone size={12} /> Set contacted</button>
            <button onClick={() => bulkSetStatus('closed')} className="text-xs px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition flex items-center gap-1.5"><MessageSquare size={12} /> Set closed</button>
            <button onClick={bulkDelete} className="text-xs px-3 py-1.5 rounded-lg border border-red-400/40 bg-red-500/20 text-red-300 hover:bg-red-500/40 transition flex items-center gap-1.5"><Trash2 size={12} /> Delete selected</button>
            <button onClick={() => setSelected(new Set())} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition">Cancel</button>
          </div>
        </div>
      )}

      {/* Select all */}
      {filtered.length > 0 && (
        <button onClick={toggleSelectAll} className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-600 transition font-semibold uppercase tracking-wide">
          {allFilteredSelected ? <CheckSquare size={14} className="text-blue-500" /> : <Square size={14} />}
          {allFilteredSelected ? 'Deselect all' : 'Select all'} ({filtered.length})
        </button>
      )}

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-[#dc2626]" size={36} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-200 py-28 text-center">
            <Filter size={40} className="mx-auto text-slate-100 mb-4" />
            <p className="text-slate-300 font-bold uppercase tracking-widest text-sm">No leads match your filters.</p>
          </div>
        ) : (
          filtered.map(lead => (
            <ErrorBoundary key={lead.id}>
              <LeadCard
                lead={lead}
                selected={selected.has(lead.id)}
                onSelect={toggleSelect}
                onDelete={handleDelete}
                onMarkRead={handleMarkRead}
                onStatusChange={handleStatusChange}
              />
            </ErrorBoundary>
          ))
        )}
      </div>

      {/* Tip */}
      <div className="p-8 bg-slate-50 rounded-3xl text-left">
        <h3 className="font-black text-[#0f172a] text-base mb-2">💡 Marketing tip</h3>
        <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-sm">
          These leads represent people who clicked your WhatsApp button or filled out your contact form.
          If you see many leads for a specific truck but no sales, consider adjusting the price to be more competitive.
          Export your leads monthly to track conversion trends over time.
        </p>
      </div>

    </div>
  );
}