import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icon issues in React Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom Icon for Vehicle
const vehicleIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck">
      <rect width="16" height="13" x="2" y="5" rx="2" fill="#2563eb" />
      <polygon points="18 5 22 9 22 18 18 18" fill="#2563eb" />
      <circle cx="7" cy="18" r="2" fill="#1e293b" />
      <circle cx="17" cy="18" r="2" fill="#1e293b" />
      <line x1="22" x2="18" y1="12" y2="12" />
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
  className: 'drop-shadow-lg'
});

const pickupIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#16a34a" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3" fill="#fff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const dropoffIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3" fill="#fff"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


// Component to handle map center changes dynamically
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
}

interface MapProps {
  riderPos: [number, number];
  pickupPos?: [number, number];
  dropoffPos?: [number, number];
  className?: string;
  zoom?: number;
}

export function TrackingMap({ riderPos, pickupPos, dropoffPos, className = "h-full w-full", zoom = 14 }: MapProps) {
  // Using a stylized map tile for professional logistics look (CartoDB Positron)
  return (
    <div className={`relative overflow-hidden rounded-xl border shadow-sm ${className}`}>
      <MapContainer 
        center={riderPos} 
        zoom={zoom} 
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {pickupPos && (
          <Marker position={pickupPos} icon={pickupIcon}>
            <Popup>Pickup Location</Popup>
          </Marker>
        )}
        
        {dropoffPos && (
          <Marker position={dropoffPos} icon={dropoffIcon}>
            <Popup>Dropoff Location</Popup>
          </Marker>
        )}
        
        <Marker position={riderPos} icon={vehicleIcon}>
          <Popup>
            <div className="font-semibold text-primary">Rider is here</div>
            <div className="text-xs text-muted-foreground">Moving at 35 mph</div>
          </Popup>
        </Marker>
        
        <MapUpdater center={riderPos} />
      </MapContainer>
      
      {/* Decorative overlay to make it look like a high-tech UI */}
      <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 rounded-xl mix-blend-multiply"></div>
    </div>
  );
}