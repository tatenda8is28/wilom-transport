import { MapPin, Calendar, Gauge } from 'lucide-react';

export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
           <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
             {vehicle.badge || 'Fresh Arrival'}
           </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase">
           {vehicle.brand}
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-800 line-clamp-1 mb-3">{vehicle.name}</h3>
        
        <div className="flex items-center gap-4 text-slate-500 text-sm mb-6 pb-4 border-b border-slate-50">
          <span className="flex items-center gap-1"><Gauge size={14}/> {vehicle.mileage}</span>
          <span className="flex items-center gap-1"><Calendar size={14}/> {vehicle.year}</span>
          <span className="flex items-center gap-1"><MapPin size={14}/> {vehicle.location}</span>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">UK Price</span>
            <span className="text-xl font-black text-slate-900">${vehicle.ukPrice.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-wilom-red uppercase block">Delivered ZIM</span>
            <span className="text-xl font-black text-wilom-red">${vehicle.zimPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}