import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* REAL LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/logo.png" alt="Wilom Logo" className="h-12 md:h-14 object-contain" />
          
        </Link>

        <div className="hidden md:flex items-center gap-10 font-black text-[#0f172a] text-[13px] uppercase tracking-widest">
          <Link to="/inventory" className="hover:text-[#dc2626] transition">Inventory</Link>
          <Link to="/about" className="hover:text-[#dc2626] transition">About</Link>
          <Link to="/how-it-works" className="hover:text-[#dc2626] transition">How It Works</Link>
        </div>

        <button className="hidden md:flex bg-[#dc2626] text-white px-8 py-3 rounded-xl font-black text-sm items-center gap-2 hover:bg-red-700 transition shadow-lg">
          <Truck size={18} /> <span>Contact Us</span>
        </button>

        <button className="md:hidden text-[#0f172a]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t p-6 flex flex-col gap-6 shadow-xl z-50">
          <Link to="/inventory" onClick={() => setIsOpen(false)} className="font-black text-[#0f172a] text-lg uppercase tracking-widest border-b pb-4 text-left">Inventory</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="font-black text-[#0f172a] text-lg uppercase tracking-widest border-b pb-4 text-left">About</Link>
          <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="font-black text-[#0f172a] text-lg uppercase tracking-widest border-b pb-4 text-left">How It Works</Link>
          <button className="bg-[#dc2626] text-white w-full py-4 rounded-xl font-black text-lg">Contact Us</button>
        </div>
      )}
    </nav>
  );
}