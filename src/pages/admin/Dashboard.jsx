import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  LogOut, 
  Menu 
} from "lucide-react";
import { supabase } from "../../api/supabase";
import AdminOverview from "./AdminOverview";
import AdminStock from "./AdminStock";
import AdminLeads from "./AdminLeads";

export default function Dashboard() {
  const navigate = useNavigate();

  // SECURE LOGOUT LOGIC
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    } else {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 pb-24 md:pb-0">
      
      {/* MOBILE HEADER - MATCHES "COMMAND" STYLE */}
      <header className="md:hidden bg-white px-6 py-5 flex justify-between items-center border-b sticky top-0 z-50">
        <div className="flex items-center gap-3">
           <img src="/logo.png" alt="Wilom" className="h-8 object-contain" />
           <span className="font-black text-xl tracking-tighter text-[#0f172a] italic uppercase">COMMAND</span>
        </div>
        <Menu size={24} className="text-slate-400" />
      </header>

      {/* DESKTOP SIDEBAR - FIXED LOGO & NAVIGATION */}
      <aside className="hidden md:flex w-72 bg-[#0f172a] text-white fixed h-full flex-col p-8 z-50">
        
        {/* SIDEBAR LOGO */}
        <div className="flex items-center gap-3 mb-16">
          <img 
            src="/logo.png" 
            alt="Wilom Logo" 
            className="h-10 object-contain bg-white rounded-lg p-1" 
          />
          <span className="font-black text-2xl tracking-tighter uppercase italic">COMMAND</span>
        </div>

        {/* NAV LINKS */}
        <nav className="flex-grow space-y-4">
          <DesktopLink 
            to="/admin" 
            icon={<LayoutDashboard size={20}/>} 
            label="Overview" 
            end={true} 
          />
          <DesktopLink 
            to="/admin/stock" 
            icon={<Package size={20}/>} 
            label="Stock Manager" 
          />
          <DesktopLink 
            to="/admin/leads" 
            icon={<MessageSquare size={20}/>} 
            label="Leads Log" 
          />
        </nav>

        {/* DESKTOP LOGOUT BUTTON */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 text-slate-400 font-bold text-sm hover:text-white transition mt-auto group px-6 py-4"
        >
          <LogOut size={20} className="group-hover:text-[#dc2626] transition-colors" /> 
          <span>Exit COMMAND</span>
        </button>
      </aside>

      {/* MAIN CONTENT WINDOW */}
      <main className="flex-1 md:ml-72 p-6 md:p-14">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/stock" element={<AdminStock />} />
          <Route path="/leads" element={<AdminLeads />} />
        </Routes>
      </main>

      {/* MOBILE BOTTOM NAVIGATION - HIGH VISIBILITY */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-4 px-2 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <MobileNavLink to="/admin" icon={<LayoutDashboard size={22}/>} label="OVERVIEW" end={true} />
        <MobileNavLink to="/admin/stock" icon={<Package size={22}/>} label="STOCK" />
        <MobileNavLink to="/admin/leads" icon={<MessageSquare size={22}/>} label="LEADS" />
        <button 
          onClick={handleLogout}
          className="flex flex-col items-center gap-1.5 px-4 text-red-400"
        >
          <LogOut size={22} />
          <span className="text-[9px] font-black tracking-widest uppercase">EXIT</span>
        </button>
      </nav>

    </div>
  );
}

// Sub-component: Desktop Links
function DesktopLink({ to, icon, label, end = false }) {
  return (
    <NavLink 
      to={to} 
      end={end}
      className={({ isActive }) => 
        `w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all text-left ${
          isActive 
          ? 'bg-[#dc2626] text-white shadow-xl shadow-red-900/40' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );
}

// Sub-component: Mobile Links
function MobileNavLink({ to, icon, label, end = false }) {
  return (
    <NavLink 
      to={to} 
      end={end}
      className={({ isActive }) => 
        `flex flex-col items-center gap-1.5 px-4 transition-all ${
          isActive ? 'text-[#dc2626] scale-110' : 'text-slate-300'
        }`
      }
    >
      {icon}
      <span className="text-[9px] font-black tracking-widest uppercase">{label}</span>
    </NavLink>
  );
}