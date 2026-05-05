import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, Menu, X, MessageCircle, Phone } from 'lucide-react';
import { supabase } from '../../api/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Hide Navbar if we are in the admin dashboard
  if (location.pathname.startsWith('/admin')) return null;

  const trackContactLead = async () => {
    await supabase.from('leads').insert([{ type: 'general_contact' }]);
    window.open('https://wa.me/263710500296?text=Hi%20Wilom%20Transport,%20I%20would%20like%20to%20make%20a%20general%20inquiry.', '_blank');
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.png" alt="Wilom Logo" className="h-10 md:h-14 object-contain" />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10 font-black text-[#0f172a] text-[13px] uppercase tracking-widest">
          <Link to="/inventory" className="hover:text-[#dc2626] transition">Inventory</Link>
          <Link to="/about" className="hover:text-[#dc2626] transition">About</Link>
          <Link to="/how-it-works" className="hover:text-[#dc2626] transition">How It Works</Link>
        </div>

        {/* DESKTOP CONTACT BUTTON */}
        <button 
          onClick={trackContactLead} 
          className="hidden md:flex bg-[#dc2626] text-white px-8 py-3 rounded-xl font-black text-sm items-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-200"
        >
          <Truck size={18} /> <span>Contact Us</span>
        </button>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          className="md:hidden text-[#0f172a] p-2" 
          onClick={() => setIsOpen(true)}
        >
          <Menu size={32} />
        </button>
      </div>

      {/* MOBILE SIDE-SLIDE MENU (OFF-CANVAS) */}
      <div className={`fixed inset-0 z-[110] transition-visibility duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        
        {/* BLACK OVERLAY/BACKDROP */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* SLIDING PANEL */}
        <div className={`absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          {/* MENU HEADER */}
          <div className="p-6 border-b flex justify-between items-center bg-[#0f172a]">
            <img src="/logo.png" className="h-8 object-contain bg-white rounded p-1" alt="Wilom" />
            <button onClick={() => setIsOpen(false)} className="text-white p-2 hover:rotate-90 transition-transform">
              <X size={32} />
            </button>
          </div>

          {/* MENU LINKS */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 text-left">
            <div className="space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Navigation</p>
              <Link to="/inventory" className="block text-3xl font-black text-[#0f172a] uppercase italic tracking-tighter hover:text-[#dc2626]">Inventory</Link>
              <Link to="/about" className="block text-3xl font-black text-[#0f172a] uppercase italic tracking-tighter hover:text-[#dc2626]">About Us</Link>
              <Link to="/how-it-works" className="block text-3xl font-black text-[#0f172a] uppercase italic tracking-tighter hover:text-[#dc2626]">How It Works</Link>
            </div>

            <div className="pt-8 border-t border-slate-50 space-y-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Quick Contact</p>
              <a href="tel:+263710500296" className="flex items-center gap-4 text-[#0f172a] font-bold text-lg">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#dc2626]"><Phone size={20}/></div>
                +263 710 500 296
              </a>
              <button 
                onClick={trackContactLead} 
                className="w-full bg-[#25d366] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-100"
              >
                <MessageCircle size={24} /> WhatsApp Us
              </button>
            </div>
          </div>

          {/* MENU FOOTER */}
          <div className="p-8 bg-slate-50">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-left">
              © 2026 WILOM Masvanhise Transport solutions. Pvt Ltd
            </p>
          </div>

        </div>
      </div>
    </nav>
  );
}