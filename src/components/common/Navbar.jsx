import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Menu, X } from 'lucide-react';
import { supabase } from '../../api/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Hide Navbar if we are in the admin dashboard
  if (location.pathname.startsWith('/admin')) return null;

  const trackContactLead = async () => {
    // Save lead to Supabase before redirecting
    await supabase.from('leads').insert([{ type: 'general_contact' }]);
    window.open('https://wa.me/263710500296?text=Hi%20Wilom%20Transport,%20I%20would%20like%20to%20make%20a%20general%20inquiry.', '_blank');
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO - FIXED (Removed extra text div) */}
        <Link to="/" className="flex items-center shrink-0">
          <img 
            src="/logo.png" 
            alt="Wilom Transport Solutions" 
            className="h-12 md:h-14 object-contain" 
          />
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-10 font-black text-[#0f172a] text-[13px] uppercase tracking-widest">
          <Link to="/inventory" className="hover:text-[#dc2626] transition">Inventory</Link>
          <Link to="/about" className="hover:text-[#dc2626] transition">About</Link>
          <Link to="/how-it-works" className="hover:text-[#dc2626] transition">How It Works</Link>
        </div>

        {/* CONTACT BUTTON */}
        <button 
          onClick={trackContactLead} 
          className="hidden md:flex bg-[#dc2626] text-white px-8 py-3 rounded-xl font-black text-sm items-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-200"
        >
          <Truck size={18} /> 
          <span>Contact Us</span>
        </button>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden text-[#0f172a] p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-6 flex flex-col gap-6 shadow-xl z-50 absolute w-full left-0">
          <Link to="/inventory" onClick={() => setIsOpen(false)} className="font-black text-[#0f172a] text-lg uppercase tracking-widest text-left border-b pb-4">Inventory</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="font-black text-[#0f172a] text-lg uppercase tracking-widest text-left border-b pb-4">About</Link>
          <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="font-black text-[#0f172a] text-lg uppercase tracking-widest text-left border-b pb-4">How It Works</Link>
          <button 
            onClick={() => { setIsOpen(false); trackContactLead(); }} 
            className="bg-[#dc2626] text-white w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2"
          >
            <Truck size={20} />
            <span>Contact Us</span>
          </button>
        </div>
      )}
    </nav>
  );
}