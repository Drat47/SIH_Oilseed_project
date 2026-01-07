import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center: [number, number];
  zoom?: number;
  polygon?: Array<[number, number]>;
  markers?: Array<{ position: [number, number]; label: string }>;
  height?: string;
}

export default function Map({ center, zoom = 13, polygon, markers, height = '400px' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      L.tileLayer('/images/photo1765732440.jpg', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add polygon if provided
    if (polygon && polygon.length > 0) {
      const polygonLayer = L.polygon(polygon, {
        color: '#16A34A',
        fillColor: '#16A34A',
        fillOpacity: 0.3,
      }).addTo(map);
      map.fitBounds(polygonLayer.getBounds());
    }

    // Add markers if provided
    if (markers && markers.length > 0) {
      markers.forEach((marker) => {
        L.marker(marker.position)
          .addTo(map)
          .bindPopup(marker.label);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, polygon, markers]);

  return <div ref={mapRef} style={{ height, width: '100%', borderRadius: '8px' }} />;
}