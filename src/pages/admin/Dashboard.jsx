import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, MessageSquare, LogOut, Menu } from "lucide-react";
import AdminOverview from "./AdminOverview";
import AdminStock from "./AdminStock";
import AdminLeads from "./AdminLeads";

export default function Dashboard() {
  const location = useLocation();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 pb-24 md:pb-0">
      
      {/* MOBILE HEADER (Matches "COMMAND") */}
      <header className="md:hidden bg-white px-6 py-4 flex justify-between items-center border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center text-white font-black text-xs italic">W</div>
           <span className="font-black text-xl tracking-tighter text-[#0f172a] italic">COMMAND</span>
        </div>
        <Menu size={24} className="text-slate-400" />
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-72 bg-[#0f172a] text-white fixed h-full flex-col p-8 z-50">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full text-[#0f172a] font-black text-xl italic leading-none">W</div>
          <span className="font-black text-2xl tracking-tighter">COMMAND</span>
        </div>
        <nav className="flex-grow space-y-4">
          <DesktopLink to="/admin" icon={<LayoutDashboard size={20}/>} label="Overview" end />
          <DesktopLink to="/admin/stock" icon={<Package size={20}/>} label="Stock" />
          <DesktopLink to="/admin/leads" icon={<MessageSquare size={20}/>} label="Leads" />
        </nav>
        <button className="flex items-center gap-4 text-slate-400 font-bold text-sm hover:text-white transition mt-auto">
          <LogOut size={20} /> Exit
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-72 p-6 md:p-12">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/stock" element={<AdminStock />} />
          <Route path="/leads" element={<AdminLeads />} />
        </Routes>
      </main>

      {/* MOBILE BOTTOM NAVIGATION (Exact Inspiration Look) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-4 px-2 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <MobileNavLink to="/admin" icon={<LayoutDashboard size={22}/>} label="OVERVIEW" end />
        <MobileNavLink to="/admin/stock" icon={<Package size={22}/>} label="STOCK" />
        <MobileNavLink to="/admin/leads" icon={<MessageSquare size={22}/>} label="LEADS" />
        <MobileNavLink to="/" icon={<LogOut size={22}/>} label="EXIT" />
      </nav>

    </div>
  );
}

function DesktopLink({ to, icon, label, end }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${isActive ? 'bg-[#dc2626] text-white shadow-xl shadow-red-900/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </NavLink>
  );
}

function MobileNavLink({ to, icon, label, end }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `flex flex-col items-center gap-1.5 px-4 transition-all ${isActive ? 'text-[#0f172a]' : 'text-slate-300'}`}>
      {icon}
      <span className="text-[9px] font-black tracking-widest">{label}</span>
    </NavLink>
  );
}