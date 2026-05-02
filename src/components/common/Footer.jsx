import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Phone, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
           <Link to="/" className="flex items-center gap-3 shrink-0">
                    <img src="/logo.png" alt="Wilom Logo" className="h-12 md:h-14 object-contain" />
                    
                  </Link>
          <div>
             <p className="text-slate-400 font-medium">Premium UK trucks delivered to Zimbabwe at unbeatable prices.</p>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/50">Quick Links</h4>
            <ul className="space-y-4 font-bold text-slate-300 uppercase text-[11px] tracking-widest">
              <li><Link to="/inventory">Browse Vehicles</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/admin" className="text-[#dc2626] flex items-center gap-2 hover:text-white transition"><Lock size={12}/> Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/50">Vehicle Types</h4>
            <ul className="space-y-4 font-bold text-slate-300 uppercase text-[11px] tracking-widest">
              <li>Trucks</li><li>Tractors</li><li>Tippers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/50">Contact Us</h4>
            <ul className="space-y-5 font-bold text-slate-300 text-[13px]">
              <li className="flex items-start gap-4 text-left"><MapPin size={20} className="text-[#dc2626] mt-1"/><span>5790 Granary Phase 3, Harare</span></li>
              <li className="flex items-center gap-4 text-left"><Phone size={20} className="text-[#dc2626]"/><span>UK: +44 7480 855 994</span></li>
              <li className="flex items-center gap-4 text-left"><Phone size={20} className="text-[#dc2626]"/><span>ZIM: +263 710 500 296</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-slate-500 font-bold text-[11px] uppercase tracking-widest">
          <p>© 2026 Wilom Transport Solutions.</p>
          <div className="flex gap-10"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}