import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, Loader2, Info, BadgeDollarSign, Cog, Trash2, Edit3, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../api/supabase';

const BODY_TYPES = ["Rigids", "Tractor Units", "Box van", "Chassis Cab", "Crane Truck", "Curtain sided", "Dropside", "Flatbeds", "Tipper", "Trailers"];
const MAKES = ["Mercedes-Benz", "Scania", "MAN", "Volvo", "DAF", "Iveco", "Renault"];
const GEARBOXES = ["Automatic", "Manual", "Semi-Automatic"];

export default function AdminStock() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);
  
  // FILE STATES
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainPreview, setMainPreview] = useState(null); // Live preview URL
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const initialFormState = {
    make: 'Mercedes-Benz', model: '', year: 2024, body_type: 'Tractor Units',
    vin: '', registration: '', mileage_miles: '', uk_price_gbp: '',
    delivered_price_usd: '', axle_config: '', horsepower: '',
    gearbox: 'Automatic', emissions_class: 'Euro 6', cab_type: 'Sleeper Cab',
    mot_expiry: '', location: 'UK', status: 'Available', badge: 'Fresh Arrival',
    description: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => { fetchInventory(); }, []);

  async function fetchInventory() {
    const { data } = await supabase.from('vehicles').select('*').order('created_at', { ascending: false });
    if (data) setInventory(data);
  }

  const handleInputChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  // HANDLE MAIN PHOTO SELECTION
  const handleMainPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainPreview(URL.createObjectURL(file)); // Generate local preview URL
    }
  };

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

  const uploadToStorage = async (file) => {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
    const { error } = await supabase.storage.from('vehicle-images').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('vehicle-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let mainImageUrl = formData.main_image || '';
      let galleryUrls = formData.image_gallery || [];

      if (mainImageFile) mainImageUrl = await uploadToStorage(mainImageFile);
      if (galleryFiles.length > 0) {
        const uploadPromises = Array.from(galleryFiles).map(file => uploadToStorage(file));
        const newGalleryUrls = await Promise.all(uploadPromises);
        galleryUrls = [...galleryUrls, ...newGalleryUrls];
      }

      const payload = {
        ...formData,
        year: parseInt(formData.year),
        mileage_miles: parseInt(formData.mileage_miles) || 0,
        uk_price_gbp: parseFloat(formData.uk_price_gbp),
        delivered_price_usd: parseFloat(formData.delivered_price_usd),
        main_image: mainImageUrl,
        image_gallery: galleryUrls,
        mot_expiry: formData.mot_expiry === "" ? null : formData.mot_expiry 
      };

      if (isEditing) {
        await supabase.from('vehicles').update(payload).eq('id', currentId);
      } else {
        await supabase.from('vehicles').insert([payload]);
      }

      setShowForm(false);
      setIsEditing(false);
      setMainImageFile(null);
      setMainPreview(null);
      setGalleryFiles([]);
      setFormData(initialFormState);
      fetchInventory();
      alert("SUCCESS: Vehicle is Live!");
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center text-left">
        <div>
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight uppercase italic leading-none">Stock <span className="text-[#dc2626]">Manager</span></h1>
          <p className="text-slate-400 font-bold mt-2 text-sm uppercase">Manage your fleet inventory</p>
        </div>
        <button onClick={() => { setIsEditing(false); setFormData(initialFormState); setMainPreview(null); setShowForm(true); }} className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-red-700 transition shadow-xl">
          <Plus size={20} /> List New Vehicle
        </button>
      </header>

      {/* TABLE */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-x-auto text-left">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-10 py-6 text-left">Vehicle Details</th>
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

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-6xl rounded-[48px] p-10 md:p-14 relative max-h-[95vh] overflow-y-auto shadow-2xl">
              <button onClick={() => setShowForm(false)} className="absolute top-10 right-10 text-slate-400 hover:text-[#dc2626] transition"><X size={36}/></button>
              <h2 className="text-5xl font-black mb-14 text-[#0f172a] text-left uppercase italic tracking-tighter">{isEditing ? 'Edit Vehicle' : 'List New Vehicle'}</h2>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                
                {/* COLUMN 1 */}
                <div className="space-y-6">
                  <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b pb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span> CORE IDENTITY</h3>
                  <select name="make" value={formData.make} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold">{MAKES.map(m => <option key={m}>{m}</option>)}</select>
                  <input required name="model" value={formData.model} onChange={handleInputChange} type="text" placeholder="MODEL NAME" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold" />
                  <select name="body_type" value={formData.body_type} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold">{BODY_TYPES.map(t => <option key={t}>{t}</option>)}</select>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="year" value={formData.year} onChange={handleInputChange} type="number" placeholder="YEAR" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                    <input name="mileage_miles" value={formData.mileage_miles} onChange={handleInputChange} type="number" placeholder="MILES" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                  </div>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Add technical details, condition notes, etc." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none focus:border-[#dc2626]"></textarea>
                </div>

                {/* COLUMN 2 */}
                <div className="space-y-6">
                  <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b pb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span> TECHNICAL SPECS</h3>
                  <select name="gearbox" value={formData.gearbox} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold">{GEARBOXES.map(g => <option key={g}>{g}</option>)}</select>
                  <input name="vin" value={formData.vin} onChange={handleInputChange} type="text" placeholder="VIN NUMBER" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="axle_config" value={formData.axle_config} onChange={handleInputChange} type="text" placeholder="AXLE" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                    <input name="horsepower" value={formData.horsepower} onChange={handleInputChange} type="text" placeholder="POWER" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                  </div>
                  <input name="mot_expiry" value={formData.mot_expiry} onChange={handleInputChange} type="date" className="w-full bg-slate-50 p-4 rounded-2xl font-bold" />
                  <select name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-blue-50/50 border border-blue-100 p-4 rounded-2xl font-bold text-blue-900"><option value="UK">UK (Stock)</option><option value="In Transit">In Transit</option><option value="Zimbabwe">Zimbabwe</option></select>
                </div>

                {/* COLUMN 3: UPDATED MEDIA VISUAL FEEDBACK */}
                <div className="space-y-6">
                  <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 border-b pb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full"></span> PRICING & MEDIA</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black text-slate-400 mb-2 block uppercase">UK (£)</label><input name="uk_price_gbp" value={formData.uk_price_gbp} onChange={handleInputChange} type="number" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold" /></div>
                    <div><label className="text-[10px] font-black text-slate-400 mb-2 block uppercase">ZIM ($)</label><input name="delivered_price_usd" value={formData.delivered_price_usd} onChange={handleInputChange} type="number" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold text-[#dc2626]" /></div>
                  </div>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold"><option value="Available">Available</option><option value="Reserved">Reserved</option><option value="Sold">Sold</option></select>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* MAIN PHOTO BOX - WITH PREVIEW */}
                    <div className="relative group">
                      <input type="file" accept="image/*" onChange={handleMainPhotoChange} className="hidden" id="f-main" />
                      <label htmlFor="f-main" className={`border-2 border-dashed rounded-3xl p-6 h-32 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${mainImageFile ? 'border-[#22c55e] bg-green-50' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                        {mainPreview ? (
                            <img src={mainPreview} className="w-full h-full object-cover rounded-xl" alt="preview" />
                        ) : (
                            <><Upload size={20} className="opacity-20 mb-1"/><span className="text-[8px] font-black uppercase text-slate-400">Main Photo</span></>
                        )}
                        {mainImageFile && <div className="absolute top-2 right-2 bg-[#22c55e] text-white rounded-full p-0.5"><CheckCircle2 size={12}/></div>}
                      </label>
                    </div>

                    {/* BULK GALLERY BOX - WITH COUNT */}
                    <div className="relative">
                      <input type="file" multiple accept="image/*" onChange={(e) => setGalleryFiles(e.target.files)} className="hidden" id="f-bulk" />
                      <label htmlFor="f-bulk" className={`border-2 border-dashed rounded-3xl p-6 h-32 flex flex-col items-center justify-center cursor-pointer transition-all ${galleryFiles.length > 0 ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}>
                        <ImageIcon size={20} className={`${galleryFiles.length > 0 ? 'text-blue-500' : 'opacity-20'} mb-1`}/>
                        <span className={`text-[8px] font-black uppercase ${galleryFiles.length > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
                            {galleryFiles.length > 0 ? `${galleryFiles.length} Images Selected` : 'Bulk Gallery'}
                        </span>
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