import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../../api/supabase';

export default function AdminStock() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inventory, setInventory] = useState([]);

  // Form State - Local names for the form
  const [formData, setFormData] = useState({
    make: 'Scania',
    model: '',
    year: 2025,
    mileage: '',
    vin: '',
    uk_price_gbp: '',
    delivered_price_usd: '',
    body_type: 'Tractor',
    location: 'UK',
    status: 'Available'
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error("Fetch Error:", error);
    if (data) setInventory(data);
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let publicImageUrl = '';

      // 1. Image Upload Logic
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('vehicle-images')
          .upload(fileName, imageFile);

        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data: urlData } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(fileName);
        
        publicImageUrl = urlData.publicUrl;
      }

      // 2. THE INSERT - Keys match your DB screenshot EXACTLY
      const { error: dbError } = await supabase.from('vehicles').insert([
        {
          make: formData.make,
          model: formData.model,
          year: parseInt(formData.year),
          mileage: parseInt(formData.mileage) || 0,
          vin: formData.vin,
          uk_price_gbp: parseFloat(formData.uk_price_gbp),
          delivered_price_usd: parseFloat(formData.delivered_price_usd),
          body_type: formData.body_type,
          location: formData.location,
          status: formData.status,
          main_image: publicImageUrl 
        }
      ]);

      if (dbError) {
        console.error("Supabase Database Error:", dbError);
        throw new Error(dbError.message);
      }

      // 3. Reset UI
      alert("Vehicle successfully listed!");
      setShowForm(false);
      setImageFile(null);
      setFormData({ make: 'Scania', model: '', year: 2025, mileage: '', vin: '', uk_price_gbp: '', delivered_price_usd: '', body_type: 'Tractor', location: 'UK', status: 'Available' });
      fetchInventory();

    } catch (err) {
      console.error("FULL ERROR DETAILS:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight text-left">Stock Manager</h1>
          <p className="text-slate-400 font-bold mt-2 text-left">Manage your vehicle listings.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-red-700 transition shadow-xl">
          <Plus size={20} /> List New Vehicle
        </button>
      </header>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden text-left">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-10 py-6">Vehicle</th>
              <th className="px-10 py-6">Status</th>
              <th className="px-10 py-6 text-right">UK Price (GBP)</th>
              <th className="px-10 py-6 text-right">Delivered ZIM</th>
              <th className="px-10 py-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="font-bold text-sm text-slate-600">
            {inventory.length === 0 ? (
              <tr><td colSpan="5" className="p-10 text-center text-slate-400 font-medium">No vehicles in database.</td></tr>
            ) : (
              inventory.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <img src={item.main_image} className="w-16 h-12 object-cover rounded-lg bg-slate-100" alt="truck" />
                      <div className="flex flex-col">
                        <span className="text-[#0f172a] text-lg font-black">{item.make} {item.model}</span>
                        <span className="text-slate-400 text-xs uppercase">VIN: {item.vin}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest bg-green-100 text-green-700">{item.status}</span>
                  </td>
                  <td className="px-10 py-8 text-right font-black">£{item.uk_price_gbp?.toLocaleString()}</td>
                  <td className="px-10 py-8 text-right font-black text-[#dc2626] text-lg">${item.delivered_price_usd?.toLocaleString()}</td>
                  <td className="px-10 py-8 text-center text-xs font-black text-slate-300">Edit / Delete</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-3xl rounded-[48px] p-10 md:p-14 relative max-h-[90vh] overflow-y-auto shadow-2xl">
              <button onClick={() => setShowForm(false)} className="absolute top-10 right-10 text-slate-400 hover:text-[#dc2626] transition"><X size={36}/></button>
              <h2 className="text-4xl font-black mb-12 text-[#0f172a] text-left">List New Vehicle</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Make</label>
                  <select name="make" value={formData.make} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold">
                    <option>Scania</option><option>MAN</option><option>Volvo</option><option>DAF</option><option>Mercedes-Benz</option><option>Iveco</option><option>Renault</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Model</label>
                  <input required name="model" value={formData.model} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold" placeholder="e.g. R500" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Year</label>
                  <input required name="year" value={formData.year} onChange={handleInputChange} type="number" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">VIN Number</label>
                  <input required name="vin" value={formData.vin} onChange={handleInputChange} type="text" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block text-left text-xs">UK Price (GBP)</label>
                  <input required name="uk_price_gbp" value={formData.uk_price_gbp} onChange={handleInputChange} type="number" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block text-left text-xs">ZIM Price (USD)</label>
                  <input required name="delivered_price_usd" value={formData.delivered_price_usd} onChange={handleInputChange} type="number" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block">Upload Photo</label>
                  <input required type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="admin-file-upload" />
                  <label htmlFor="admin-file-upload" className="border-3 border-dashed border-slate-100 rounded-[32px] p-12 text-center text-slate-400 font-bold hover:bg-slate-50 transition flex flex-col items-center gap-4 cursor-pointer">
                    {imageFile ? <span className="text-[#22c55e]">File Selected: {imageFile.name}</span> : <><Upload size={40} className="text-[#dc2626] opacity-30" /><span>Click to Select Truck Photo</span></>}
                  </label>
                </div>
                <button disabled={loading} className="col-span-2 bg-[#dc2626] text-white py-6 rounded-[24px] font-black text-xl mt-4 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : "Publish Listing"}
                </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}