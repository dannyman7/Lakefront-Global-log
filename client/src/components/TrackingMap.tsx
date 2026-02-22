import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L, { Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

// Reset leaflet defaults
delete (Icon.Default.prototype as any)._getIconUrl;

// Custom Icons that look like Google Maps / Bolt
const createVehicleIcon = (heading: number, type: string) => {
  // Rotate the SVG based on heading
  // Adjust heading so 0 is up
  const rot = heading + 90; 
  
  let svg = '';
  if (type === 'car' || type === 'van') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" stroke="#0f172a" stroke-width="1.5" style="transform: rotate(${rot}deg);" class="drop-shadow-lg"><rect width="18" height="12" x="3" y="6" rx="3"/><path d="M4 11h16"/></svg>`;
  } else {
    // Bike
    svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#22c55e" stroke="#0f172a" stroke-width="1.5" style="transform: rotate(${rot}deg);" class="drop-shadow-lg"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="#0f172a"/></svg>`;
  }

  return new DivIcon({
    html: `
      <div class="relative flex items-center justify-center w-12 h-12">
        <div class="absolute inset-0 bg-green-500/20 rounded-full animate-ping" style="animation-duration: 2s;"></div>
        <div class="w-8 h-8 rounded-full bg-white border-2 border-slate-900 flex items-center justify-center shadow-xl z-10 p-1">
          ${svg}
        </div>
      </div>
    `,
    className: 'bg-transparent',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
};

const pinHtml = (color: string) => `
  <div class="relative w-8 h-10 flex flex-col items-center">
    <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white" style="background-color: ${color}">
      <div class="w-2.5 h-2.5 rounded-full bg-white"></div>
    </div>
    <div class="w-0.5 h-3 shadow-sm" style="background-color: ${color}"></div>
  </div>
`;

const pickupIcon = new DivIcon({
  html: pinHtml('#3b82f6'), // Blue
  className: 'bg-transparent',
  iconSize: [32, 40],
  iconAnchor: [16, 40],
});

const dropoffIcon = new DivIcon({
  html: pinHtml('#ef4444'), // Red
  className: 'bg-transparent',
  iconSize: [32, 40],
  iconAnchor: [16, 40],
});


function MapController({ center, zoom, bounds }: { center: [number, number], zoom: number, bounds?: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1 });
    } else {
      map.setView(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, bounds, map]);
  return null;
}

interface MapProps {
  riderPos: [number, number];
  pickupPos?: [number, number];
  dropoffPos?: [number, number];
  pathTraveled?: [number, number][];
  riderHeading?: number;
  vehicleType?: string;
  className?: string;
  zoom?: number;
  fitBounds?: boolean;
}

export function TrackingMap({ 
  riderPos, pickupPos, dropoffPos, 
  pathTraveled = [], riderHeading = 0, vehicleType = 'bike',
  className = "h-full w-full", zoom = 15, fitBounds = false 
}: MapProps) {
  
  // Calculate bounds if requested
  const bounds = fitBounds && pickupPos && dropoffPos 
    ? L.latLngBounds([pickupPos, dropoffPos, riderPos]) 
    : undefined;

  // Use a dark map tile that looks like Google Maps Dark Mode (Carto Dark Matter)
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <MapContainer 
        center={riderPos} 
        zoom={zoom} 
        zoomControl={false}
        className="h-full w-full bg-[#0f172a]"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Route Trail */}
        {pathTraveled.length > 0 && (
          <Polyline 
            positions={pathTraveled} 
            color="#22c55e" 
            weight={4} 
            opacity={0.8}
            dashArray="1, 8"
            lineCap="round"
          />
        )}
        
        {/* Planned Route (Dashed) */}
        {pickupPos && dropoffPos && (
           <Polyline 
            positions={[pickupPos, dropoffPos]} 
            color="#3b82f6" 
            weight={3} 
            opacity={0.3}
            dashArray="5, 10"
          />
        )}

        {pickupPos && (
          <Marker position={pickupPos} icon={pickupIcon}>
            <Popup className="glass-panel text-white font-sans rounded-xl border-none">Pickup</Popup>
          </Marker>
        )}
        
        {dropoffPos && (
          <Marker position={dropoffPos} icon={dropoffIcon}>
            <Popup className="glass-panel text-white font-sans rounded-xl border-none">Dropoff</Popup>
          </Marker>
        )}
        
        <Marker 
          position={riderPos} 
          icon={createVehicleIcon(riderHeading, vehicleType)}
          zIndexOffset={1000}
        />
        
        <MapController center={riderPos} zoom={zoom} bounds={bounds} />
      </MapContainer>
      
      {/* Vignette Overlay for premium look */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-[400]"></div>
    </div>
  );
}