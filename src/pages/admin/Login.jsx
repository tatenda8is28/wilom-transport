import React, { useState } from 'react';
import { supabase } from '../../api/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl text-left">
        
        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <img src="/logo.png" alt="Wilom" className="h-16 object-contain" />
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight uppercase italic">Command Login</h1>
          <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-widest">Authorized Access Only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold uppercase">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:border-[#dc2626] transition-all"
              placeholder="admin@wilomtransport.com"
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold outline-none focus:border-[#dc2626] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#dc2626] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-red-900/20 hover:bg-red-700 transition flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Lock size={20} /> Access COMMAND</>}
          </button>
        </form>

        <p className="mt-10 text-center text-slate-300 font-bold text-[9px] uppercase tracking-[0.3em]">
          Wilom Transport Solutions &copy; 2026
        </p>
      </div>
    </div>
  );
}