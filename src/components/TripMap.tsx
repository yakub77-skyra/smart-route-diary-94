import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Layers, AlertCircle } from 'lucide-react';
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
  const [mapStyle, setMapStyle] = useState<'street' | 'satellite' | 'terrain'>('street');
  const [isOffline, setIsOffline] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Create OpenStreetMap-based styles
  const createMapStyle = (styleType: 'street' | 'satellite' | 'terrain') => {
    const baseStyle = {
      version: 8 as const,
      sources: {
        'osm': {
          type: 'raster' as const,
          tiles: styleType === 'street' 
            ? ['https://tile.openstreetmap.org/{z}/{x}/{y}.png']
            : styleType === 'satellite'
            ? ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}']
            : ['https://tile.opentopomap.org/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: styleType === 'street'
            ? '© OpenStreetMap contributors'
            : styleType === 'satellite'
            ? '© Esri, USGS, NOAA'
            : '© OpenTopoMap (CC-BY-SA)'
        }
      },
      layers: [
        {
          id: 'osm',
          type: 'raster' as const,
          source: 'osm',
          minzoom: 0,
          maxzoom: 22
        }
      ]
    };
    return baseStyle;
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Handle offline detection
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOffline(!navigator.onLine);

    try {
      // Initialize map with OpenStreetMap style
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: createMapStyle(mapStyle),
        center: currentLocation 
          ? [currentLocation.coords.longitude, currentLocation.coords.latitude]
          : [-74.5, 40], // Default to New York area
        zoom: currentLocation ? 15 : 10,
        attributionControl: false
      });

      // Clear any previous location errors
      setLocationError(null);

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      // Add attribution control with custom options
      map.current.addControl(new maplibregl.AttributionControl({
        compact: true
      }), 'bottom-right');

      // Add geolocate control for user location
      const geolocate = new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        },
        trackUserLocation: true
      });

      // Handle geolocation events
      geolocate.on('error', (e) => {
        console.error('Geolocation error:', e);
        setLocationError('Location access denied or unavailable');
      });

      geolocate.on('geolocate', (position) => {
        setLocationError(null);
      });

      map.current.addControl(geolocate, 'top-right');

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

      // Trigger initial location if user location is available
      if (currentLocation) {
        map.current.flyTo({
          center: [currentLocation.coords.longitude, currentLocation.coords.latitude],
          zoom: 15,
          duration: 2000
        });
      }

    } catch (error) {
      console.error('Map initialization error:', error);
      setLocationError('Failed to initialize map');
    }

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

  const switchMapStyle = (style: 'street' | 'satellite' | 'terrain') => {
    if (map.current) {
      map.current.setStyle(createMapStyle(style));
      setMapStyle(style);
      
      // Re-add trip data after style change
      setTimeout(() => {
        loadTripsOnMap();
      }, 1000);
    }
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full min-h-[400px] bg-muted/20"
        style={{ borderRadius: 'inherit' }}
      />
      
      {/* Location Error */}
      {locationError && (
        <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg">
          <AlertCircle className="w-4 h-4" />
          {locationError}
        </div>
      )}
      
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
              variant={mapStyle === 'street' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => switchMapStyle('street')}
              className="justify-start text-xs"
            >
              <Layers className="w-3 h-3 mr-1" />
              Street
            </Button>
            <Button
              variant={mapStyle === 'satellite' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => switchMapStyle('satellite')}
              className="justify-start text-xs"
            >
              <Layers className="w-3 h-3 mr-1" />
              Satellite
            </Button>
            <Button
              variant={mapStyle === 'terrain' ? 'default' : 'ghost'}
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