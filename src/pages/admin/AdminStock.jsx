import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, Loader2, Trash2, Edit3 } from 'lucide-react';
import { supabase } from '../../api/supabase';

const BODY_TYPES = ["Rigids", "Tractor Units", "Box van", "Chassis Cab", "Crane Truck", "Curtain sided", "Dropside", "Flatbeds", "Tipper", "Trailers"];
const MAKES = ["Mercedes-Benz", "Scania", "MAN", "Volvo", "DAF", "Iveco", "Renault"];
const GEARBOXES = ["Automatic", "Manual", "Semi-Automatic"];

export default function AdminStock() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const initialFormState = {
    make: 'Mercedes-Benz', model: '', year: 2024, body_type: 'Tractor Units',
    vin: '', registration: '', mileage_miles: '', uk_price_gbp: '',
    delivered_price_usd: '', axle_config: '6x2', horsepower: '',
    gearbox: 'Automatic', emissions_class: 'Euro 6', cab_type: 'Sleeper Cab',
    mot_expiry: '', location: 'UK', status: 'Available', badge: 'Fresh Arrival'
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => { fetchInventory(); }, []);

  async function fetchInventory() {
    const { data } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
    if (data) setInventory(data);
  }

  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleEdit = (item) => {
    setFormData(item);
    setCurrentId(item.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this vehicle?")) {
      await supabase.from('vehicles').delete().eq('id', id);
      fetchInventory();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let publicImageUrl = formData.main_image;
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        await supabase.storage.from('vehicle-images').upload(fileName, imageFile);
        const { data: urlData } = supabase.storage.from('vehicle-images').getPublicUrl(fileName);
        publicImageUrl = urlData.publicUrl;
      }

      const payload = {
        ...formData,
        year: parseInt(formData.year),
        mileage_miles: parseInt(formData.mileage_miles) || 0,
        uk_price_gbp: parseFloat(formData.uk_price_gbp),
        delivered_price_usd: parseFloat(formData.delivered_price_usd),
        main_image: publicImageUrl,
        mot_expiry: formData.mot_expiry === "" ? null : formData.mot_expiry 
      };

      if (isEditing) {
        await supabase.from('vehicles').update(payload).eq('id', currentId);
      } else {
        await supabase.from('vehicles').insert([payload]);
      }

      setShowForm(false);
      setIsEditing(false);
      setFormData(initialFormState);
      fetchInventory();
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center text-left">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight uppercase italic">Stock Manager</h1>
          <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">Update, Edit, or Delete inventory.</p>
        </div>
        <button onClick={() => { setIsEditing(false); setFormData(initialFormState); setShowForm(true); }} className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-red-700 transition shadow-xl">
          <Plus size={20} /> List New Vehicle
        </button>
      </header>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden text-left">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-10 py-6">Vehicle Details</th>
              <th className="px-10 py-6 text-center">Transmission</th>
              <th className="px-10 py-6 text-right">ZIM Price</th>
              <th className="px-10 py-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="font-bold text-sm text-slate-600">
            {inventory.map((item) => (
              <tr key={item.id} className="border-b border-slate-50">
                <td className="px-10 py-8 flex items-center gap-4">
                  <img src={item.main_image} className="w-16 h-12 object-cover rounded-xl bg-slate-50" />
                  <div className="flex flex-col"><span className="text-[#0f172a] font-black">{item.make} {item.model}</span><span className="text-[10px] text-slate-400 uppercase tracking-widest">{item.vin}</span></div>
                </td>
                <td className="px-10 py-8 text-center"><span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] uppercase font-black">{item.gearbox}</span></td>
                <td className="px-10 py-8 text-right font-black text-[#dc2626] text-lg">${Number(item.delivered_price_usd).toLocaleString()}</td>
                <td className="px-10 py-8">
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg transition"><Edit3 size={18}/></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-300 hover:text-red-600 rounded-lg transition"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST */}
      <div className="md:hidden space-y-4">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm text-left">
            <div className="flex gap-4 mb-4">
              <img src={item.main_image} className="w-20 h-16 object-cover rounded-2xl bg-slate-50" />
              <div><h3 className="font-black text-[#0f172a] text-base">{item.make}</h3><p className="text-slate-400 font-bold text-xs uppercase">{item.model}</p><p className="text-[#dc2626] font-black mt-1">${Number(item.delivered_price_usd).toLocaleString()}</p></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
              <span className="bg-slate-50 px-3 py-1 rounded-full text-[9px] font-black uppercase text-slate-400">{item.gearbox}</span>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(item)} className="p-3 bg-slate-50 text-slate-400 rounded-xl"><Edit3 size={20}/></button>
                <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-50 text-red-300 rounded-xl"><Trash2 size={20}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* THE FORM MODAL - RESTORED TO EXACT DESIGN */}
      {showForm && (
        <div className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-5xl rounded-[48px] p-10 md:p-14 relative max-h-[95vh] overflow-y-auto shadow-2xl">
              <button onClick={() => setShowForm(false)} className="absolute top-10 right-10 text-slate-400 hover:text-[#dc2626] transition"><X size={36}/></button>
              
              <h2 className="text-5xl font-black mb-14 text-[#0f172a] text-left uppercase italic tracking-tighter">{isEditing ? 'Edit Vehicle' : 'List New Vehicle'}</h2>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                
                {/* COLUMN 1: CORE IDENTITY */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span>
                    <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">CORE IDENTITY</h3>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">MAKE</label>
                    <select name="make" value={formData.make} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold">{MAKES.map(m => <option key={m}>{m}</option>)}</select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">MODEL NAME</label>
                    <input required name="model" value={formData.model} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">BODY TYPE</label>
                    <select name="body_type" value={formData.body_type} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold">{BODY_TYPES.map(t => <option key={t}>{t}</option>)}</select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">YEAR</label><input name="year" value={formData.year} onChange={handleInputChange} type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Kilometers</label><input name="mileage_miles" value={formData.mileage_miles} onChange={handleInputChange} type="number" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" /></div>
                  </div>
                </div>

                {/* COLUMN 2: TECHNICAL SPECS */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span>
                    <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">TECHNICAL SPECS</h3>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">GEARBOX / TRANSMISSION</label>
                    <select name="gearbox" value={formData.gearbox} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold">{GEARBOXES.map(g => <option key={g}>{g}</option>)}</select>
                  </div>
                  <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">VIN NUMBER</label><input name="vin" value={formData.vin} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">AXLE</label><input name="axle_config" value={formData.axle_config} onChange={handleInputChange} type="text" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">POWER</label><input name="horsepower" value={formData.horsepower} onChange={handleInputChange} type="text" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" /></div>
                  </div>
                  <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">MOT EXPIRY</label><input name="mot_expiry" value={formData.mot_expiry} onChange={handleInputChange} type="date" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" /></div>
                  <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block text-blue-600">LOCATION</label><select name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-blue-50/50 border border-blue-100 p-4 rounded-2xl font-bold text-blue-900"><option value="UK">UK (Stock)</option><option value="In Transit">In Transit</option><option value="Zimbabwe">Zimbabwe</option></select></div>
                </div>

                {/* COLUMN 3: PRICING & MEDIA */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span>
                    <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400">PRICING & MEDIA</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black text-slate-400 mb-2 block">UK (£)</label><input name="uk_price_gbp" value={formData.uk_price_gbp} onChange={handleInputChange} type="number" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold" /></div>
                    <div><label className="text-[10px] font-black text-slate-400 mb-2 block">ZIM ($)</label><input name="delivered_price_usd" value={formData.delivered_price_usd} onChange={handleInputChange} type="number" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-[#dc2626]" /></div>
                  </div>
                  <div><label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">SALE STATUS</label><select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold"><option value="Available">Available</option><option value="Reserved">Reserved</option><option value="Sold">Sold</option></select></div>
                  <div className="relative">
                    <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">PHOTO</label>
                    <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" id="f-upload" />
                    <label htmlFor="f-upload" className="border-2 border-dashed border-slate-100 rounded-3xl p-10 text-center text-slate-400 font-bold hover:bg-slate-50 cursor-pointer flex flex-col items-center gap-2">
                      {imageFile ? <span className="text-[#22c55e] text-[10px]">Photo Ready</span> : <><Upload size={24}/><span className="text-[10px]">Click to Upload</span></>}
                    </label>
                  </div>
                  <button disabled={loading} className="w-full bg-[#dc2626] text-white py-6 rounded-[28px] font-black text-xl mt-4 shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
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