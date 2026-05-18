import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus, X, Upload, Loader2, BadgeDollarSign, Cog, Trash2, Edit3,
  Image as ImageIcon, CheckCircle2, Copy, ChevronDown, ChevronUp,
  AlertTriangle, Search, Filter, TrendingUp, Truck, DollarSign, MapPin,
  Calendar, Zap, Settings2, Tag
} from 'lucide-react';
import { supabase } from '../../api/supabase';

const BODY_TYPES = ["Rigids", "Tractor Units", "Box van", "Chassis Cab", "Crane Truck", "Curtain sided", "Dropside", "Flatbeds", "Tipper", "Trailers"];
const MAKES = ["Mercedes-Benz", "Scania", "MAN", "Volvo", "DAF", "Iveco", "Renault"];
const GEARBOXES = ["Automatic", "Manual", "Semi-Automatic"];
const BADGES = ["None", "Fresh Arrival", "Price Drop", "Last One", "Hot Deal", "Just Serviced", "Low Mileage"];
const STATUSES = ["All", "Available", "Reserved", "Sold"];

const statusColors = {
  Available: 'bg-emerald-100 text-emerald-700',
  Reserved:  'bg-amber-100 text-amber-700',
  Sold:      'bg-slate-200 text-slate-500',
};

const badgeColors = {
  'Fresh Arrival':  'bg-blue-600 text-white',
  'Price Drop':     'bg-[#dc2626] text-white',
  'Last One':       'bg-orange-500 text-white',
  'Hot Deal':       'bg-rose-500 text-white',
  'Just Serviced':  'bg-emerald-600 text-white',
  'Low Mileage':    'bg-violet-600 text-white',
};

function HealthWarnings({ inventory }) {
  const warnings = [];
  inventory.forEach(v => {
    const name = `${v.make} ${v.model}`;
    if (!v.main_image) warnings.push({ id: v.id, msg: `${name} — missing main photo`, level: 'error' });
    if (!v.uk_price_gbp && !v.delivered_price_usd) warnings.push({ id: v.id, msg: `${name} — no price set`, level: 'warn' });
    if (v.mot_expiry) {
      const expiry = new Date(v.mot_expiry);
      const daysLeft = Math.floor((expiry - new Date()) / 86400000);
      if (daysLeft < 0) warnings.push({ id: v.id, msg: `${name} — MOT expired`, level: 'error' });
      else if (daysLeft < 30) warnings.push({ id: v.id, msg: `${name} — MOT expires in ${daysLeft}d`, level: 'warn' });
    }
  });
  if (warnings.length === 0) return null;
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-[24px] px-8 py-5 space-y-2">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 flex items-center gap-2 mb-3 text-left">
        <AlertTriangle size={13}/> Stock Health — {warnings.length} issue{warnings.length > 1 ? 's' : ''}
      </p>
      {warnings.map((w, i) => (
        <div key={i} className={`flex items-center gap-2 text-xs font-bold ${w.level === 'error' ? 'text-[#dc2626]' : 'text-amber-700'} text-left`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${w.level === 'error' ? 'bg-[#dc2626]' : 'bg-amber-400'}`}/>
          {w.msg}
        </div>
      ))}
    </div>
  );
}

function StatsBar({ inventory }) {
  const available = inventory.filter(v => v.status === 'Available').length;
  const reserved  = inventory.filter(v => v.status === 'Reserved').length;
  const sold      = inventory.filter(v => v.status === 'Sold').length;
  const totalGBP  = inventory.reduce((s, v) => s + (parseFloat(v.uk_price_gbp) || 0), 0);
  const totalUSD  = inventory.reduce((s, v) => s + (parseFloat(v.delivered_price_usd) || 0), 0);

  const stats = [
    { label: 'Total Stock', value: inventory.length, icon: <Truck size={14}/>, accent: 'text-[#0f172a]' },
    { label: 'Available', value: available, icon: <CheckCircle2 size={14}/>, accent: 'text-emerald-600' },
    { label: 'Reserved', value: reserved, icon: <Zap size={14}/>, accent: 'text-amber-500' },
    { label: 'Sold', value: sold, icon: <TrendingUp size={14}/>, accent: 'text-slate-400' },
    { label: 'Fleet Value (£)', value: `£${(totalGBP / 1000).toFixed(0)}k`, icon: <DollarSign size={14}/>, accent: 'text-[#0f172a]' },
    { label: 'ZIM Value ($)', value: `$${(totalUSD / 1000).toFixed(0)}k`, icon: <BadgeDollarSign size={14}/>, accent: 'text-[#dc2626]' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-[24px] border border-slate-100 shadow-sm px-6 py-5 flex flex-col gap-1 text-left">
          <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400`}>
            {s.icon}{s.label}
          </div>
          <span className={`text-2xl font-black ${s.accent}`}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

function QuickView({ item }) {
  const fields = [
    ['Body Type', item.body_type],
    ['Year', item.year],
    ['Mileage', item.mileage_miles ? `${Number(item.mileage_miles).toLocaleString()} Mi` : '—'],
    ['Axle Config', item.axle_config || '—'],
    ['Horsepower', item.horsepower ? `${item.horsepower} hp` : '—'],
    ['Emissions', item.emissions_class || '—'],
    ['Cab Type', item.cab_type || '—'],
    ['MOT Expiry', item.mot_expiry || '—'],
    ['Registration', item.registration || '—'],
    ['Location', item.location || '—'],
    ['UK Price', item.uk_price_gbp ? `£${Number(item.uk_price_gbp).toLocaleString()}` : '—'],
    ['ZIM Price', item.delivered_price_usd ? `$${Number(item.delivered_price_usd).toLocaleString()}` : '—'],
  ];
  return (
    <tr className="bg-slate-50/80">
      <td colSpan={5} className="px-10 py-6 text-left">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
          {fields.map(([k, v]) => (
            <div key={k} className="bg-white rounded-2xl px-4 py-3 border border-slate-100">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 mb-0.5">{k}</p>
              <p className="text-xs font-black text-[#0f172a]">{v}</p>
            </div>
          ))}
        </div>
        {item.description && (
          <p className="text-xs text-slate-500 font-bold bg-white rounded-2xl px-4 py-3 border border-slate-100 leading-relaxed text-left">{item.description}</p>
        )}
        {item.image_gallery?.length > 0 && (
          <div className="flex gap-3 mt-3 flex-wrap">
            {item.image_gallery.map((url, i) => (
              <img key={i} src={url} className="w-20 h-14 object-cover rounded-xl border border-slate-100" alt="gallery" />
            ))}
          </div>
        )}
      </td>
    </tr>
  );
}

export default function AdminStock() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const [search, setSearch] = useState('');
  const [filterMake, setFilterMake] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const initialFormState = {
    make: 'Mercedes-Benz', model: '', year: 2024, body_type: 'Tractor Units',
    vin: '', registration: '', mileage_miles: '', uk_price_gbp: '',
    delivered_price_usd: '', axle_config: '', horsepower: '',
    gearbox: 'Automatic', emissions_class: 'Euro 6', cab_type: 'Sleeper Cab',
    mot_expiry: '', location: 'UK', status: 'Available', badge: 'None',
    description: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => { fetchInventory(); }, []);

  async function fetchInventory() {
    const { data } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
    if (data) setInventory(data);
  }

  const filteredInventory = useMemo(() => {
    return inventory.filter(v => {
      const matchSearch = !search || `${v.make} ${v.model} ${v.vin}`.toLowerCase().includes(search.toLowerCase());
      const matchMake = filterMake === 'All' || v.make === filterMake;
      const matchStatus = filterStatus === 'All' || v.status === filterStatus;
      return matchSearch && matchMake && matchStatus;
    });
  }, [inventory, search, filterMake, filterStatus]);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleMainPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) { setMainImageFile(file); setMainPreview(URL.createObjectURL(file)); }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.id);
    setIsEditing(true);
    setMainPreview(item.main_image || null);
    setShowForm(true);
  };

  const handleDuplicate = (item) => {
    const { id, created_at, ...rest } = item;
    setFormData({ ...rest, model: `${rest.model} (Copy)`, status: 'Available' });
    setCurrentId(null);
    setIsEditing(false);
    setMainPreview(rest.main_image || null);
    setMainImageFile(null);
    setGalleryFiles([]);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this vehicle?")) {
      const { error } = await supabase.from('vehicles').delete().eq('id', id);
      if (error) alert("Delete Error: " + error.message);
      fetchInventory();
    }
  };

  const uploadToStorage = async (file) => {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const { error } = await supabase.storage.from('vehicle-images').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('vehicle-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  // STRICTER SUBMIT LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let mainImageUrl = formData.main_image || '';
      let galleryUrls = formData.image_gallery || [];

      // 1. Upload new Main Photo
      if (mainImageFile) {
        mainImageUrl = await uploadToStorage(mainImageFile);
      }

      // 2. Upload new Gallery Photos
      if (galleryFiles.length > 0) {
        const uploadPromises = Array.from(galleryFiles).map(file => uploadToStorage(file));
        const newGalleryUrls = await Promise.all(uploadPromises);
        galleryUrls = [...galleryUrls, ...newGalleryUrls];
      }

      // 3. Construct Payload
      const payload = {
        ...formData,
        year: parseInt(formData.year) || 2024,
        mileage_miles: parseInt(formData.mileage_miles) || 0,
        uk_price_gbp: parseFloat(formData.uk_price_gbp) || 0,
        delivered_price_usd: parseFloat(formData.delivered_price_usd) || 0,
        main_image: mainImageUrl,
        image_gallery: galleryUrls,
        mot_expiry: formData.mot_expiry === "" ? null : formData.mot_expiry,
        badge: formData.badge === 'None' ? null : formData.badge,
      };

      // 4. SUPABASE TRANSACTION WITH STRICT ERROR CHECK
      const { data, error } = isEditing 
        ? await supabase.from('vehicles').update(payload).eq('id', currentId).select()
        : await supabase.from('vehicles').insert([payload]).select();

      if (error) {
        // This catches DB constraint violations or RLS policy errors
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("The database accepted the request but failed to return the new data. Please check your Supabase table.");
      }

      // 5. SUCCESS UI - Only runs if Database confirms success
      alert("SUCCESS: Vehicle is Live!");
      setShowForm(false); 
      setIsEditing(false); 
      setMainImageFile(null);
      setMainPreview(null); 
      setGalleryFiles([]); 
      setFormData(initialFormState);
      fetchInventory();

    } catch (err) {
      console.error("CRITICAL UPLOAD ERROR:", err);
      alert(`FAILED TO SAVE: ${err.message || "Unknown Database Error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center text-left">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight uppercase italic leading-none">
            Stock <span className="text-[#dc2626]">Manager</span>
          </h1>
          <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Global Fleet Intelligence</p>
        </div>
        <button
          onClick={() => { setIsEditing(false); setFormData(initialFormState); setMainPreview(null); setShowForm(true); }}
          className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-red-700 transition shadow-xl"
        >
          <Plus size={20} /> List New Vehicle
        </button>
      </header>

      <StatsBar inventory={inventory} />
      <HealthWarnings inventory={inventory} />

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search make, model, VIN..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl font-bold text-sm shadow-sm focus:outline-none focus:border-[#dc2626]"
          />
        </div>
        <select value={filterMake} onChange={e => setFilterMake(e.target.value)}
          className="bg-white border border-slate-100 px-4 py-3 rounded-2xl font-bold text-sm shadow-sm focus:outline-none">
          <option value="All">All Makes</option>
          {MAKES.map(m => <option key={m}>{m}</option>)}
        </select>
        <div className="flex gap-1 bg-white border border-slate-100 rounded-2xl p-1 shadow-sm">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase transition ${filterStatus === s ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-400 hover:text-slate-700'}`}>
              {s}
            </button>
          ))}
        </div>
        {(search || filterMake !== 'All' || filterStatus !== 'All') && (
          <button onClick={() => { setSearch(''); setFilterMake('All'); setFilterStatus('All'); }}
            className="text-[11px] font-black uppercase text-slate-400 hover:text-[#dc2626] transition flex items-center gap-1">
            <X size={12}/> Clear Filters
          </button>
        )}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-x-auto text-left">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-10 py-6 text-left uppercase">Vehicle Details</th>
              <th className="px-6 py-6 text-center uppercase">Status</th>
              <th className="px-6 py-6 text-center uppercase">Transmission</th>
              <th className="px-10 py-6 text-right uppercase">ZIM Price</th>
              <th className="px-10 py-6 text-center uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="font-bold text-sm text-slate-600">
            {filteredInventory.map((item) => (
              <React.Fragment key={item.id}>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={item.main_image} className="w-16 h-12 object-cover rounded-xl bg-slate-50" alt="" />
                        {item.badge && item.badge !== 'None' && (
                          <span className={`absolute -top-2 -right-2 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full whitespace-nowrap ${badgeColors[item.badge] || 'bg-slate-700 text-white'}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] font-black uppercase tracking-tight">{item.make} {item.model}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{item.vin || 'NO VIN'}</span>
                        <span className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={9}/>{item.location} · {item.year}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-7 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-7 text-center uppercase text-[10px]">{item.gearbox}</td>
                  <td className="px-10 py-7 text-right font-black text-[#dc2626] text-lg">${Number(item.delivered_price_usd).toLocaleString()}</td>
                  <td className="px-10 py-7 text-center" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleDuplicate(item)} className="p-2 bg-blue-50 text-blue-400 hover:text-blue-600 rounded-lg transition"><Copy size={16}/></button>
                      <button onClick={() => handleEdit(item)} className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg transition"><Edit3 size={16}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-200 hover:text-red-600 rounded-lg transition"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
                {expandedId === item.id && <QuickView item={item} />}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl rounded-[48px] p-10 md:p-14 relative max-h-[95vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setShowForm(false)} className="absolute top-10 right-10 text-slate-400 hover:text-[#dc2626] transition"><X size={36}/></button>
            <h2 className="text-5xl font-black mb-14 text-[#0f172a] text-left uppercase italic tracking-tighter">
              {isEditing ? 'Edit Vehicle' : 'List New Vehicle'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {/* COLUMN 1 */}
              <div className="space-y-6">
                <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b pb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span> Identity</h3>
                <select name="make" value={formData.make} onChange={handleInputChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold">{MAKES.map(m => <option key={m}>{m}</option>)}</select>
                <input required name="model" value={formData.model} onChange={handleInputChange} type="text" placeholder="MODEL NAME" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                <select name="body_type" value={formData.body_type} onChange={handleInputChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold">{BODY_TYPES.map(t => <option key={t}>{t}</option>)}</select>
                <div className="grid grid-cols-2 gap-4">
                  <input name="year" value={formData.year} onChange={handleInputChange} type="number" placeholder="YEAR" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                  <input name="mileage_miles" value={formData.mileage_miles} onChange={handleInputChange} type="number" placeholder="MILES" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {BADGES.map(b => (
                    <button type="button" key={b} onClick={() => setFormData({ ...formData, badge: b })}
                      className={`text-[10px] font-black uppercase px-3 py-2.5 rounded-xl border-2 transition ${formData.badge === b ? 'bg-[#0f172a] text-white border-transparent' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                      {b}
                    </button>
                  ))}
                </div>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" placeholder="Description..." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none"></textarea>
              </div>

              {/* COLUMN 2 */}
              <div className="space-y-6">
                <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b pb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span> Tech Specs</h3>
                <select name="gearbox" value={formData.gearbox} onChange={handleInputChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold">{GEARBOXES.map(g => <option key={g}>{g}</option>)}</select>
                <input name="vin" value={formData.vin} onChange={handleInputChange} type="text" placeholder="VIN NUMBER" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="axle_config" value={formData.axle_config} onChange={handleInputChange} type="text" placeholder="AXLE" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                  <input name="horsepower" value={formData.horsepower} onChange={handleInputChange} type="text" placeholder="POWER" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                </div>
                <input name="mot_expiry" value={formData.mot_expiry} onChange={handleInputChange} type="date" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                <select name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-blue-50/50 border border-blue-100 p-4 rounded-2xl font-bold text-blue-900">
                  <option value="UK">UK (Stock)</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>

              {/* COLUMN 3 */}
              <div className="space-y-6">
                <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b pb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span> Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input name="uk_price_gbp" value={formData.uk_price_gbp} onChange={handleInputChange} type="number" placeholder="UK £" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                  <input name="delivered_price_usd" value={formData.delivered_price_usd} onChange={handleInputChange} type="number" placeholder="ZIM $" className="w-full bg-slate-50 p-4 rounded-2xl font-bold text-[#dc2626]" />
                </div>
                <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-50 p-4 rounded-2xl font-bold">
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleMainPhotoChange} className="hidden" id="f-main" />
                    <label htmlFor="f-main" className={`border-2 border-dashed rounded-3xl p-6 h-36 flex flex-col items-center justify-center cursor-pointer overflow-hidden ${mainImageFile ? 'border-[#22c55e] bg-green-50' : 'border-slate-100 bg-slate-50'}`}>
                      {mainPreview ? <img src={mainPreview} className="w-full h-full object-cover rounded-xl" alt="preview" /> : <><Upload size={20} className="opacity-20 mb-1"/><span className="text-[8px] font-black uppercase">Main Photo</span></>}
                    </label>
                  </div>
                  <div className="relative">
                    <input type="file" multiple accept="image/*" onChange={(e) => setGalleryFiles(e.target.files)} className="hidden" id="f-bulk" />
                    <label htmlFor="f-bulk" className={`border-2 border-dashed rounded-3xl p-6 h-36 flex flex-col items-center justify-center cursor-pointer ${galleryFiles.length > 0 ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-slate-50'}`}>
                      <ImageIcon size={20} className="opacity-20 mb-1"/>
                      <span className="text-[8px] font-black uppercase">{galleryFiles.length > 0 ? `${galleryFiles.length} Gallery Images` : 'Bulk Gallery'}</span>
                    </label>
                  </div>
                </div>

                <button disabled={loading} className="w-full bg-[#dc2626] text-white py-6 rounded-[28px] font-black text-xl mt-4 shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : (isEditing ? 'SAVE CHANGES' : 'PUBLISH LISTING')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}