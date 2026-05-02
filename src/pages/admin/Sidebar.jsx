import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, LogOut, Settings } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#0f172a] text-white fixed h-full flex flex-col p-8 z-50">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-16">
        <div className="w-10 h-10 bg-white flex items-center justify-center rounded text-[#0f172a] font-black text-xl italic leading-none">W</div>
        <span className="font-black text-2xl tracking-tighter text-left">
          WILOM <span className="text-[10px] block text-[#dc2626] -mt-1 tracking-widest font-bold uppercase">Admin Portal</span>
        </span>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-grow space-y-4">
        <AdminLink to="/admin" icon={<LayoutDashboard size={20}/>} label="Overview" end />
        <AdminLink to="/admin/stock" icon={<Package size={20}/>} label="Stock Manager" />
        <AdminLink to="/admin/leads" icon={<MessageSquare size={20}/>} label="WhatsApp Leads" />
        <AdminLink to="/admin/settings" icon={<Settings size={20}/>} label="Settings" />
      </nav>

      {/* LOGOUT */}
      <button className="flex items-center gap-4 text-slate-400 font-bold text-sm hover:text-white transition mt-auto">
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
}

function AdminLink({ to, icon, label, end = false }) {
  return (
    <NavLink 
      to={to} 
      end={end}
      className={({ isActive }) => `w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${isActive ? 'bg-[#dc2626] text-white shadow-xl shadow-red-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
      {icon} {label}
    </NavLink>
  );
}