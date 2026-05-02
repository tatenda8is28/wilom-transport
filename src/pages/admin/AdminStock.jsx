import React, { useState } from 'react';
import { Plus, X, Upload, Package } from 'lucide-react';

function StockTableRow({ name, vin, status, ukPrice, zimPrice }) {
  return (
    <tr className="border-b border-slate-50 hover:bg-slate-50 transition">
      <td className="px-10 py-8 text-left">
        <div className="flex flex-col">
          <span className="text-[#0f172a] text-lg font-black leading-tight">{name}</span>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">VIN: {vin}</span>
        </div>
      </td>
      <td className="px-10 py-8 text-left">
        <span className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest ${
          status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-10 py-8 font-black text-[#0f172a] text-right">{ukPrice}</td>
      <td className="px-10 py-8 font-black text-[#dc2626] text-right text-lg">{zimPrice}</td>
      <td className="px-10 py-8">
        <div className="flex justify-center gap-6">
          <button className="text-slate-400 hover:text-[#0f172a] uppercase text-[10px] font-black tracking-widest transition">Edit</button>
          <button className="text-red-500 hover:text-red-700 uppercase text-[10px] font-black tracking-widest transition">Delete</button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminStock() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight">Stock Manager</h1>
          <p className="text-slate-400 font-bold mt-2">Manage and update your vehicle listings.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-[#dc2626] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-red-700 transition shadow-xl shadow-red-900/20"
        >
          <Plus size={20} /> List New Vehicle
        </button>
      </header>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-10 py-6">Vehicle Details</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">UK Price (GBP)</th>
                <th className="px-10 py-6 text-right">Delivered ZIM ($)</th>
                <th className="px-10 py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold text-sm text-slate-600">
              <StockTableRow name="MAN TGX 26.460 6x2" vin="MAN9384JK" status="Available" ukPrice="£7,500" zimPrice="$25,000" />
              <StockTableRow name="Scania R450 Highline" vin="SCN00234X" status="In Transit" ukPrice="£8,200" zimPrice="$27,000" />
              <StockTableRow name="Volvo FH 460 Globetrotter" vin="VLV88299P" status="Available" ukPrice="£9,000" zimPrice="$28,500" />
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-[#0f172a]/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-3xl rounded-[48px] p-12 relative max-h-[90vh] overflow-y-auto shadow-2xl">
              <button onClick={() => setShowForm(false)} className="absolute top-10 right-10 text-slate-400 hover:text-[#dc2626] transition">
                <X size={36}/>
              </button>
              
              <h2 className="text-4xl font-black mb-12 text-[#0f172a] text-left tracking-tight">List New Vehicle</h2>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Name (Make & Model)</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold focus:border-[#dc2626] outline-none" placeholder="e.g. Scania R500" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">UK Price (GBP)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold focus:border-[#dc2626] outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">ZIM Price (USD)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold focus:border-[#dc2626] outline-none" />
                </div>
                <div className="col-span-2">
                  <div className="border-3 border-dashed border-slate-100 rounded-[32px] p-12 text-center text-slate-400 font-bold hover:bg-slate-50 transition flex flex-col items-center gap-4">
                    <Upload size={40} className="text-[#dc2626] opacity-30" />
                    <span>Upload Vehicle Images</span>
                  </div>
                </div>
                <button className="col-span-2 bg-[#dc2626] text-white py-6 rounded-[24px] font-black text-xl mt-4 shadow-xl">Publish Listing</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}