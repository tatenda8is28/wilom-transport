import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, Gauge, Calendar, 
  MapPin, Search, Loader2, 
  MessageCircle, Settings2, Truck, Anchor, Eye,
  Star, X, Send, ChevronLeft, ChevronRight
} from 'lucide-react';
import { supabase } from '../../api/supabase';
import LandedCostCalculator from './LandedCostCalculator'; 

const MAKES = [
  "All Brands", "3 cyl kobota", "DAF", "ENGINE", "Isuzu", "IVECO", 
  "kbkc", "MAN", "Mercedes-Benz", "Mitsubishi", "MOTRACOM", 
  "Renault", "Scania", "Toyota", "Tyres", "Volvo"
];

const BRAND_LOGOS = [
  { name: 'MAN', src: '/brand-man.png' },
  { name: 'VOLVO', src: '/brand-volvo.png' },
  { name: 'MERCEDES', src: '/brand-mercedes.png' },
  { name: 'DAF', src: '/brand-daf.png' },
  { name: 'IVECO', src: '/brand-iveco.png' },
  { name: 'RENAULT', src: '/brand-renault.png' },
  { name: 'TOYOTA', src: '/brand-toyota.png' },
];

const COUNTRIES = [
  'Zimbabwe', 'Zambia', 'Malawi', 'Tanzania', 'Mozambique',
  'Namibia', 'Kenya', 'South Africa', 'Botswana', 'Other'
];

// ── Star Rating ───────────────────────────────────────────────────────────────

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className="focus:outline-none"
        >
          <Star
            size={22}
            className={`transition-colors ${
              star <= (hovered || value)
                ? 'text-[#dc2626] fill-[#dc2626]'
                : 'text-slate-600 fill-slate-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ── Single Review Card ────────────────────────────────────────────────────────

function ReviewCard({ review }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-5 text-left h-full select-none">
      <StarRating value={review.rating} />
      <p className="text-slate-300 font-medium leading-relaxed text-base flex-grow">
        "{review.message}"
      </p>
      <div className="flex items-center gap-3 pt-5 border-t border-white/10">
        <div className="w-11 h-11 rounded-full bg-[#dc2626] flex items-center justify-center text-white font-black text-lg uppercase shrink-0">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-black text-white uppercase tracking-tight text-sm">{review.name}</p>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{review.country}</p>
        </div>
      </div>
    </div>
  );
}

// ── Auto-Scrolling Carousel ───────────────────────────────────────────────────

function ReviewsCarousel({ reviews }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const timerRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const total = reviews.length;
  const actualVisible = Math.min(visibleCount, total);

  const slide = useCallback((dir) => {
    if (animating || total <= actualVisible) return;
    setAnimating(true);
    setCurrent((prev) => (prev + dir + total) % total);
    setTimeout(() => setAnimating(false), 500);
  }, [animating, total, actualVisible]);

  useEffect(() => {
    if (paused || total <= actualVisible) return;
    timerRef.current = setInterval(() => slide(1), 4000);
    return () => clearInterval(timerRef.current);
  }, [paused, slide, total, actualVisible]);

  if (total === 0) return null;

  const visibleCards = Array.from({ length: actualVisible }, (_, i) =>
    reviews[(current + i) % total]
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`grid gap-6 transition-opacity duration-500 ${animating ? 'opacity-0' : 'opacity-100'}`}
        style={{ gridTemplateColumns: `repeat(${actualVisible}, minmax(0, 1fr))` }}
      >
        {visibleCards.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>

      {total > actualVisible && (
        <div className="flex items-center justify-between mt-12">
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!animating) {
                    setAnimating(true);
                    setCurrent(i);
                    setTimeout(() => setAnimating(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-[#dc2626]' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => slide(-1)}
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => slide(1)}
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition-all"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Review Submit Modal ───────────────────────────────────────────────────────

function ReviewModal({ onClose, onSubmitted }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name || !country || !rating || !message) {
      setError('Please fill in all fields and select a star rating.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: err } = await supabase.from('reviews').insert([{ name, country, rating, message }]);
    setLoading(false);
    if (err) {
      setError('Something went wrong. Please try again.');
    } else {
      onSubmitted();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[3rem] p-10 w-full max-w-lg shadow-2xl z-10">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-[#0f172a] transition">
          <X size={28} />
        </button>
        <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Share Your Experience</span>
        <h3 className="text-3xl font-black italic uppercase text-[#0f172a] tracking-tight mb-8">Leave A Review</h3>
        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Your Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Tendai Moyo"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#0f172a] outline-none focus:border-[#dc2626] transition"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Country</label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-bold text-[#0f172a] outline-none focus:border-[#dc2626] transition cursor-pointer"
            >
              <option value="">Select your country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">Your Review</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tell us about your experience with Wilom Transport Solutions..."
              rows={4}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-medium text-[#0f172a] outline-none focus:border-[#dc2626] transition resize-none"
            />
          </div>
          {error && <p className="text-[#dc2626] text-sm font-bold">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#dc2626] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-red-700 transition shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 size={22} className="animate-spin" /> : <><Send size={20} /> Submit Review</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Vehicle Card ──────────────────────────────────────────────────────────────

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
      className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group flex flex-col h-full text-left cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={vehicle.main_image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          alt={`${vehicle.make} ${vehicle.model}`}
        />
        {vehicle.badge && vehicle.badge !== 'None' && (
          <div className="absolute top-6 left-6">
            <span className="bg-[#22c55e] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
              {vehicle.badge}
            </span>
          </div>
        )}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#0f172a] text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase shadow-xl">
          <MapPin size={12} className="text-[#dc2626]" /> {vehicle.location}
        </div>
      </div>

      {/* Body */}
      <div className="p-10 flex-grow flex flex-col">
        <h3 className="font-black text-3xl text-[#0f172a] leading-none mb-2 uppercase italic">{vehicle.make}</h3>
        <p className="text-slate-400 font-bold text-lg mb-6 uppercase">{vehicle.model}</p>

        <div className="grid grid-cols-2 gap-4 text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-10 pt-6 border-t border-slate-50">
          <div className="flex items-center gap-2"><Calendar size={14} className="text-slate-200" /> {vehicle.year} Model</div>
          <div className="flex items-center gap-2"><Settings2 size={14} className="text-slate-200" /> {vehicle.gearbox}</div>
          <div className="flex items-center gap-2"><Truck size={14} className="text-slate-200" /> {vehicle.axle_config}</div>
          <div className="flex items-center gap-2"><Gauge size={14} className="text-slate-200" /> {vehicle.mileage_miles?.toLocaleString()} Km</div>
        </div>

        <div className="flex justify-between items-end bg-slate-50 p-7 rounded-[2rem] mb-8 text-left">
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase block mb-1">UK Price</span>
            <span className="text-xl font-black text-[#0f172a]">£{Number(vehicle.uk_price_gbp).toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-black text-[#dc2626] uppercase block mb-1">Delivered ZIM</span>
            <span className="text-2xl font-black text-[#dc2626]">${Number(vehicle.delivered_price_usd).toLocaleString()}</span>
          </div>
        </div>

        {/* Button — stops propagation so it still works as a standalone link */}
        <Link
          to={`/vehicle/${vehicle.id}`}
          onClick={e => e.stopPropagation()}
          className="w-full bg-[#0f172a] text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl"
        >
          <Eye size={22} /> View Full Specs
        </Link>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMake, setSearchMake] = useState('All Brands');
  const [searchType, setSearchType] = useState('All Types');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase.from('vehicles').select('*').limit(3).order('created_at', { ascending: false });
      if (data) setFeatured(data);
      setLoading(false);
    }
    fetchFeatured();
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setReviewsLoading(true);
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false }).limit(12);
    if (data) setReviews(data);
    setReviewsLoading(false);
  }

  const handleHomeSearch = () => {
    const params = new URLSearchParams();
    if (searchMake !== 'All Brands') params.append('make', searchMake);
    if (searchType !== 'All Types') params.append('type', searchType);
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <section className="relative bg-[#0f172a] h-[85vh] flex items-center overflow-hidden pb-32">
        <div className="absolute inset-0 z-0">
          <img src="/hero-truck.jpg" className="w-full h-full object-cover opacity-25" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/70 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-left uppercase italic">
          <div className="bg-[#dc2626]/10 border border-[#dc2626]/30 px-5 py-2 rounded-full text-[#dc2626] text-[11px] font-black inline-flex items-center gap-3 mb-10 tracking-widest not-italic">
            <span className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse" />
            UK to the SADC Region — Direct Import
          </div>
          <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.9] mb-10 tracking-tighter">
            Heavy Duty Deals. <br /><span className="text-[#dc2626]">Delivered Across <br /> Borders.</span>
          </h1>
          <div className="flex flex-wrap gap-5 not-italic">
            <button onClick={() => navigate('/inventory')} className="bg-[#dc2626] text-white px-12 py-5 rounded-xl font-black text-lg flex items-center gap-3 group shadow-2xl">
              Browse Vehicles <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH OVERLAY */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 md:-mt-16 relative z-30">
        <div className="bg-white p-6 rounded-[32px] shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="text-left space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 px-4 block tracking-widest">Manufacturer</label>
            <select value={searchMake} onChange={e => setSearchMake(e.target.value)} className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 cursor-pointer">
              {MAKES.map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </div>
          <div className="text-left space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 px-4 block tracking-widest">Category</label>
            <select value={searchType} onChange={e => setSearchType(e.target.value)} className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border border-slate-100 cursor-pointer">
              <option>All Types</option>
              <option>Rigids</option>
              <option>Tractor Units</option>
              <option>Box Van</option>
              <option>Chassis Cab</option>
              <option>Crane Truck</option>
              <option>Curtain Sided</option>
              <option>Dropside</option>
              <option>Engine</option>
              <option>Flatbeds</option>
              <option>Grab Lorries</option>
              <option>Hookloader</option>
              <option>Municipal</option>
              <option>Parts</option>
              <option>Pickup Trucks</option>
              <option>Plant And Generators</option>
              <option>Refrigerated</option>
              <option>Skip Loader</option>
              <option>Tipper</option>
              <option>Trailers</option>
            </select>
          </div>
          <div className="pt-6">
            <button onClick={handleHomeSearch} className="w-full bg-[#dc2626] text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-red-700 transition shadow-lg">
              <Search size={22} /> Search Now
            </button>
          </div>
        </div>
      </div>

      {/* BRAND LOGOS MARQUEE */}
      <div className="bg-[#1e293b] py-8 overflow-hidden border-y border-white/5 mt-20 relative">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, index) => (
            <div key={index} className="flex items-center justify-center px-12 md:px-20 group">
              <img src={brand.src} alt={brand.name} className="h-10 md:h-14 w-auto object-contain brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* LATEST ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 text-left">
          <div>
            <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Hand-Picked</span>
            <h2 className="text-6xl font-black tracking-tighter text-[#0f172a] leading-none uppercase italic">Latest Arrivals</h2>
          </div>
          <button onClick={() => navigate('/inventory')} className="bg-white border-2 border-slate-200 px-10 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all shadow-sm">
            View All Inventory <ArrowRight size={18} className="inline ml-2" />
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#dc2626]" size={48} /></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
            {featured.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        )}
      </section>

      <LandedCostCalculator />

      {/* CUSTOMER REVIEWS */}
      <section className="bg-[#0f172a] py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20 text-left">
            <div>
              <span className="text-[#dc2626] font-black uppercase tracking-[0.4em] text-[10px] block mb-3">Real Customers</span>
              <h2 className="text-5xl md:text-[72px] font-black italic uppercase tracking-tighter text-white leading-none">
                What Our Clients<br /><span className="text-[#dc2626]">Are Saying.</span>
              </h2>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#dc2626] text-white px-10 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-red-700 transition shadow-lg whitespace-nowrap"
            >
              <Star size={18} /> Leave a Review
            </button>
          </div>

          {reviewsLoading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#dc2626]" size={48} /></div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 font-bold text-xl mb-4">No reviews yet.</p>
              <p className="text-slate-600 font-medium">Be the first to share your experience!</p>
            </div>
          ) : (
            <ReviewsCarousel reviews={reviews} />
          )}
        </div>
      </section>

      {/* REVIEW MODAL */}
      {showModal && (
        <ReviewModal onClose={() => setShowModal(false)} onSubmitted={fetchReviews} />
      )}

      {/* WORLDWIDE CLIENT BASE */}
      <section className="max-w-7xl mx-auto px-4 py-32 pb-40">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] italic uppercase tracking-tighter mb-8 leading-none">
              Our client base <br /> is worldwide..!
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
              Shipping to majority of right-hand drive countries around the World.
            </p>
            <div className="flex gap-6">
              <img src="https://flagcdn.com/mw.svg" className="h-10 w-auto rounded shadow-sm" alt="Malawi" />
              <img src="https://flagcdn.com/zm.svg" className="h-10 w-auto rounded shadow-sm" alt="Zambia" />
              <img src="https://flagcdn.com/zw.svg" className="h-10 w-auto rounded shadow-sm" alt="Zimbabwe" />
              <img src="https://flagcdn.com/tz.svg" className="h-10 w-auto rounded shadow-sm" alt="Tanzania" />
            </div>
          </div>
          <div className="bg-[#0f172a] p-10 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="relative z-10 text-left">
              <h4 className="text-[#dc2626] font-black uppercase tracking-widest text-xs mb-8">African Port Destinations</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]" /><div><p className="font-black text-lg">Walvis Bay</p><p className="text-slate-500 text-[10px] uppercase">Namibia</p></div></li>
                <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]" /><div><p className="font-black text-lg">Durban</p><p className="text-slate-500 text-[10px] uppercase">South Africa</p></div></li>
                <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]" /><div><p className="font-black text-lg">Maputo</p><p className="text-slate-500 text-[10px] uppercase">Mozambique</p></div></li>
                <li className="flex items-center gap-4"><Anchor size={18} className="text-[#dc2626]" /><div><p className="font-black text-lg">Dar es Salaam</p><p className="text-slate-500 text-[10px] uppercase">Tanzania</p></div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}