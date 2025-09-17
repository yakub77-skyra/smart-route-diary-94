import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Layers } from 'lucide-react';
import { DetectedTrip } from '@/services/tripDetection';

interface TripMapProps {
  trips?: DetectedTrip[];
  currentLocation?: GeolocationPosition;
  onTripStart?: (location: { lat: number; lng: number }) => void;
  onTripEnd?: (location: { lat: number; lng: number }) => void;
  className?: string;
}

export const TripMap: React.FC<TripMapProps> = ({
  trips = [],
  currentLocation,
  onTripStart,
  onTripEnd,
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState('https://demotiles.maplibre.org/style.json');
  const [isOffline, setIsOffline] = useState(false);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Map styles for different layers
  const mapStyles = {
    street: 'https://demotiles.maplibre.org/style.json',
    satellite: 'https://api.maptiler.com/maps/satellite/style.json?key=demo', // Demo key
    terrain: 'https://api.maptiler.com/maps/terrain/style.json?key=demo'
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: currentLocation 
        ? [currentLocation.coords.longitude, currentLocation.coords.latitude]
        : [0, 0],
      zoom: 10,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add geolocate control for user location
    const geolocate = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.current.addControl(geolocate);

    // Handle offline detection
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);

    // Map click handler for adding trip markers
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      // Simple logic: first click starts trip, second click ends trip
      const existingMarkers = markersRef.current.filter(marker => 
        marker.getElement().classList.contains('trip-marker')
      );
      
      if (existingMarkers.length === 0) {
        // Start trip
        onTripStart?.({ lat, lng });
        addTripMarker(lng, lat, 'start');
      } else if (existingMarkers.length === 1) {
        // End trip
        onTripEnd?.({ lat, lng });
        addTripMarker(lng, lat, 'end');
        
        // Draw route line between markers
        const startMarker = existingMarkers[0];
        const startLngLat = startMarker.getLngLat();
        drawRouteLine([startLngLat.lng, startLngLat.lat], [lng, lat]);
      }
    });

    // Load existing trips
    loadTripsOnMap();

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      map.current?.remove();
    };
  }, [mapStyle]);

  // Update current location marker
  useEffect(() => {
    if (!map.current || !currentLocation) return;

    const { longitude, latitude } = currentLocation.coords;
    
    // Remove existing current location marker
    const existingLocationMarker = markersRef.current.find(marker =>
      marker.getElement().classList.contains('current-location')
    );
    if (existingLocationMarker) {
      existingLocationMarker.remove();
      markersRef.current = markersRef.current.filter(m => m !== existingLocationMarker);
    }

    // Add current location marker
    const locationMarker = new maplibregl.Marker({
      color: '#3b82f6',
      scale: 0.8
    })
      .setLngLat([longitude, latitude])
      .addTo(map.current);
    
    locationMarker.getElement().classList.add('current-location');
    markersRef.current.push(locationMarker);

    // Center map on current location
    map.current.flyTo({
      center: [longitude, latitude],
      zoom: 15
    });
  }, [currentLocation]);

  const addTripMarker = (lng: number, lat: number, type: 'start' | 'end') => {
    if (!map.current) return;

    const color = type === 'start' ? '#10b981' : '#ef4444';
    const marker = new maplibregl.Marker({ color, scale: 1 })
      .setLngLat([lng, lat])
      .addTo(map.current);
    
    marker.getElement().classList.add('trip-marker', `trip-${type}`);
    markersRef.current.push(marker);
  };

  const drawRouteLine = (start: [number, number], end: [number, number]) => {
    if (!map.current) return;

    const routeGeoJson = {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: [start, end]
      }
    };

    // Add route line source
    if (map.current.getSource('route')) {
      (map.current.getSource('route') as maplibregl.GeoJSONSource).setData(routeGeoJson);
    } else {
      map.current.addSource('route', {
        type: 'geojson',
        data: routeGeoJson
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });
    }
  };

  const loadTripsOnMap = () => {
    if (!map.current || trips.length === 0) return;

    trips.forEach((trip, index) => {
      // Add origin marker
      const originMarker = new maplibregl.Marker({ color: '#10b981' })
        .setLngLat([trip.origin.coordinates.lng, trip.origin.coordinates.lat])
        .setPopup(new maplibregl.Popup().setHTML(`
          <div class="p-2">
            <h4 class="font-semibold">Trip Start</h4>
            <p class="text-sm">${trip.origin.name}</p>
            <p class="text-xs text-gray-500">${trip.startTime.toLocaleString()}</p>
          </div>
        `))
        .addTo(map.current);
      
      markersRef.current.push(originMarker);

      // Add destination marker
      const destMarker = new maplibregl.Marker({ color: '#ef4444' })
        .setLngLat([trip.destination.coordinates.lng, trip.destination.coordinates.lat])
        .setPopup(new maplibregl.Popup().setHTML(`
          <div class="p-2">
            <h4 class="font-semibold">Trip End</h4>
            <p class="text-sm">${trip.destination.name}</p>
            <p class="text-xs text-gray-500">${trip.endTime.toLocaleString()}</p>
          </div>
        `))
        .addTo(map.current);
      
      markersRef.current.push(destMarker);

      // Draw trip path if available
      if (trip.path && trip.path.length > 1) {
        const pathGeoJson = {
          type: 'Feature' as const,
          properties: { tripId: index },
          geometry: {
            type: 'LineString' as const,
            coordinates: trip.path.map(point => [point.lng, point.lat])
          }
        };

        map.current.addSource(`trip-path-${index}`, {
          type: 'geojson',
          data: pathGeoJson
        });

        map.current.addLayer({
          id: `trip-path-${index}`,
          type: 'line',
          source: `trip-path-${index}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#8b5cf6',
            'line-width': 3,
            'line-opacity': 0.7
          }
        });
      }
    });

    // Fit map to show all trips
    if (trips.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      trips.forEach(trip => {
        bounds.extend([trip.origin.coordinates.lng, trip.origin.coordinates.lat]);
        bounds.extend([trip.destination.coordinates.lng, trip.destination.coordinates.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  const clearTripMarkers = () => {
    markersRef.current.forEach(marker => {
      if (marker.getElement().classList.contains('trip-marker')) {
        marker.remove();
      }
    });
    markersRef.current = markersRef.current.filter(marker => 
      !marker.getElement().classList.contains('trip-marker')
    );

    // Remove route layer
    if (map.current?.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }
  };

  const switchMapStyle = (style: keyof typeof mapStyles) => {
    setMapStyle(mapStyles[style]);
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full min-h-[400px]"
        style={{ borderRadius: 'inherit' }}
      />
      
      {/* Offline Indicator */}
      {isOffline && (
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Offline Mode
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-16 flex flex-col gap-2">
        {/* Layer Switcher */}
        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => switchMapStyle('street')}
              className="justify-start text-xs"
            >
              <Layers className="w-3 h-3 mr-1" />
              Street
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => switchMapStyle('satellite')}
              className="justify-start text-xs"
            >
              <Layers className="w-3 h-3 mr-1" />
              Satellite
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => switchMapStyle('terrain')}
              className="justify-start text-xs"
            >
              <Layers className="w-3 h-3 mr-1" />
              Terrain
            </Button>
          </div>
        </div>

        {/* Trip Controls */}
        <Button
          variant="outline"
          size="sm"
          onClick={clearTripMarkers}
          className="bg-background/90 backdrop-blur-sm"
        >
          <MapPin className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <p className="text-xs text-muted-foreground">
          <Navigation className="w-3 h-3 inline mr-1" />
          Tap map to set trip start/end points. Blue dot shows your location.
        </p>
      </div>
    </Card>
  );
};

export default TripMap;