import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Gauge } from 'lucide-react';

export default function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={vehicle.image || vehicle.main_image}
          alt={vehicle.name || `${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {(vehicle.badge && vehicle.badge !== 'None') && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
              {vehicle.badge}
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase">
          {vehicle.brand || vehicle.make}
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-800 line-clamp-1 mb-3">
          {vehicle.name || `${vehicle.make} ${vehicle.model}`}
        </h3>

        <div className="flex items-center gap-4 text-slate-500 text-sm mb-6 pb-4 border-b border-slate-50">
          <span className="flex items-center gap-1">
            <Gauge size={14} />
            {vehicle.mileage || (vehicle.mileage_miles ? Number(vehicle.mileage_miles).toLocaleString() + ' mi' : '—')}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {vehicle.location}
          </span>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">UK Price</span>
            <span className="text-xl font-black text-slate-900">
              £{(vehicle.ukPrice || vehicle.uk_price_gbp || 0).toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#dc2626] uppercase block">Delivered ZIM</span>
            <span className="text-xl font-black text-[#dc2626]">
              ${(vehicle.zimPrice || vehicle.delivered_price_usd || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}