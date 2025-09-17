import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

interface GeolocationState {
  location: GeolocationPosition | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = (options?: PositionOptions) => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true
  });

  const [watchId, setWatchId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const getCurrentLocation = async () => {
      try {
        // Check permissions first
        const permissions = await Geolocation.checkPermissions();
        
        if (permissions.location === 'denied') {
          const requestResult = await Geolocation.requestPermissions();
          if (requestResult.location === 'denied') {
            throw new Error('Location permission denied');
          }
        }

        // Get current position
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: options?.enableHighAccuracy ?? true,
          timeout: options?.timeout ?? 10000,
          maximumAge: options?.maximumAge ?? 60000
        });

        if (mounted) {
          // Convert Capacitor position to standard GeolocationPosition
          const geolocationPosition: GeolocationPosition = {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              altitude: position.coords.altitude ?? null,
              accuracy: position.coords.accuracy,
              altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
              heading: position.coords.heading ?? null,
              speed: position.coords.speed ?? null,
              toJSON: () => ({})
            },
            timestamp: position.timestamp,
            toJSON: () => ({})
          };

          setState({
            location: geolocationPosition,
            error: null,
            loading: false
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            location: null,
            error: error instanceof Error ? error.message : 'Failed to get location',
            loading: false
          });
        }
      }
    };

    getCurrentLocation();

    return () => {
      mounted = false;
    };
  }, []);

  const startWatching = async () => {
    try {
      const id = await Geolocation.watchPosition({
        enableHighAccuracy: options?.enableHighAccuracy ?? true,
        timeout: options?.timeout ?? 10000,
        maximumAge: options?.maximumAge ?? 60000
      }, (position) => {
        if (position) {
          // Convert Capacitor position to standard GeolocationPosition
          const geolocationPosition: GeolocationPosition = {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              altitude: position.coords.altitude ?? null,
              accuracy: position.coords.accuracy,
              altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
              heading: position.coords.heading ?? null,
              speed: position.coords.speed ?? null,
              toJSON: () => ({})
            },
            timestamp: position.timestamp,
            toJSON: () => ({})
          };

          setState(prev => ({
            ...prev,
            location: geolocationPosition,
            error: null
          }));
        }
      });

      setWatchId(id);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to watch location'
      }));
    }
  };

  const stopWatching = async () => {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
    }
  };

  const refreshLocation = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0 // Force fresh location
      });

      const geolocationPosition: GeolocationPosition = {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude ?? null,
          accuracy: position.coords.accuracy,
          altitudeAccuracy: position.coords.altitudeAccuracy ?? null,
          heading: position.coords.heading ?? null,
          speed: position.coords.speed ?? null,
          toJSON: () => ({})
        },
        timestamp: position.timestamp,
        toJSON: () => ({})
      };

      setState({
        location: geolocationPosition,
        error: null,
        loading: false
      });
    } catch (error) {
      setState({
        location: null,
        error: error instanceof Error ? error.message : 'Failed to get location',
        loading: false
      });
    }
  };

  return {
    ...state,
    startWatching,
    stopWatching,
    refreshLocation,
    isWatching: watchId !== null
  };
};