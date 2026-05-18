import React, { useState } from 'react';
import { supabase } from '../../api/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('login'); // 'login' | 'reset'
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl text-left">

        {/* LOGO */}
        <div className="flex justify-center mb-10">
          <img src="/logo.png" alt="Wilom" className="h-16 object-contain" />
        </div>

        {/* ── LOGIN MODE ── */}
        {mode === 'login' && (
          <>
            <div className="mb-10">
              <h1 className="text-3xl font-black text-[#0f172a] tracking-tight uppercase italic">Command Login</h1>
              <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-widest">Authorized Access Only</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold uppercase">
                <AlertCircle size={16} /> {error}
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

            <button
              onClick={() => { setMode('reset'); setError(null); setResetSent(false); }}
              className="mt-8 w-full text-center text-slate-400 hover:text-[#dc2626] font-black text-[10px] uppercase tracking-widest transition"
            >
              Forgot Password?
            </button>
          </>
        )}

        {/* ── RESET MODE ── */}
        {mode === 'reset' && (
          <>
            <button
              onClick={() => { setMode('login'); setError(null); setResetSent(false); }}
              className="flex items-center gap-2 text-slate-400 hover:text-[#0f172a] font-black text-[10px] uppercase tracking-widest mb-10 transition"
            >
              <ArrowLeft size={13} /> Back to Login
            </button>

            <div className="mb-10">
              <h1 className="text-3xl font-black text-[#0f172a] tracking-tight uppercase italic">Reset Password</h1>
              <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-widest">We'll email you a reset link</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold uppercase">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {resetSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center gap-3 text-center">
                <CheckCircle2 size={32} className="text-emerald-500" />
                <p className="text-emerald-700 font-black text-sm uppercase tracking-wide">Reset link sent!</p>
                <p className="text-emerald-600 font-bold text-xs">Check your email and click the link to set a new password.</p>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
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

                <button
                  disabled={loading}
                  className="w-full bg-[#0f172a] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl hover:bg-slate-800 transition flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                </button>
              </form>
            )}
          </>
        )}

        <p className="mt-10 text-center text-slate-300 font-bold text-[9px] uppercase tracking-[0.3em]">
          Wilom Transport Solutions &copy; 2026
        </p>
      </div>
    </div>
  );
}