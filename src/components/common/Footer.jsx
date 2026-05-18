import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, MapPin, Phone, Lock, Video, MessageCircle, Globe, Mail } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* BRAND & SOCIALS */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" className="h-10 object-contain bg-white rounded p-1" alt="Wilom" />
              <span className="font-black text-2xl tracking-tighter italic uppercase"></span>
            </div>
            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
              Registered company supplying with premium and affordable Shipping to right-hand drive nations across Southern African(SADC), with full documentation and port logistics support.
            </p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@willy.dube" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#dc2626] transition-all text-white border border-white/5">
                <Video size={20} />
              </a>
              <a href="https://wa.me/263710500296" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#25d366] transition-all text-white border border-white/5">
                <MessageCircle size={20} />
              </a>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/5">
                <Globe size={20} />
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/50">Navigation</h4>
            <ul className="space-y-4 font-bold text-slate-300 uppercase text-[11px] tracking-widest">
              <li><Link to="/inventory" className="hover:text-[#dc2626] transition">Inventory</Link></li>
              <li><Link to="/about" className="hover:text-[#dc2626] transition">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#dc2626] transition">How it works</Link></li>
              <li><Link to="/admin" className="text-[#dc2626] flex items-center gap-2 hover:text-white transition"><Lock size={12}/> Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/50">Core Catalog</h4>
            <ul className="space-y-4 font-bold text-slate-300 uppercase text-[11px] tracking-widest cursor-default">
              <li>MAN Tractor Units</li>
              <li>Rigids & Tippers</li>
              <li>Trailers & Parts</li>
              <li>Refridgerators</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/50">HQ Contact</h4>
            <ul className="space-y-6 font-bold text-slate-300 text-[13px]">
              <li className="flex items-start gap-4 text-left">
                <MapPin size={20} className="text-[#dc2626] shrink-0 mt-1"/>
                <span>5790 Granary Phase 3, <br/>Harare, Zimbabwe</span>
              </li>
              <li className="flex items-center gap-4 text-left">
                <Phone size={20} className="text-[#dc2626] shrink-0"/>
                <span>UK: +44 7480 855 994</span>
              </li>
              <li className="flex items-center gap-4 text-left">
                <a
                  href="https://wa.me/263710500296"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 hover:text-[#25d366] transition"
                >
                  <MessageCircle size={20} className="text-[#25d366] shrink-0"/>
                  <span>ZIM: +263 710 500 296</span>
                </a>
              </li>
              <li className="flex items-center gap-4 text-left">
                <a
                  href="mailto:info@wilommasvanhise.co.za"
                  className="flex items-center gap-4 hover:text-[#dc2626] transition"
                >
                  <Mail size={20} className="text-[#dc2626] shrink-0"/>
                  <span>info@wilommasvanhise.co.za</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT AREA WITH LEGAL LINKS */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest italic">
            © 2026 Wilom Masvanhise Transport Solutions PVT. LTD.
          </p>
          <div className="flex gap-10 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}