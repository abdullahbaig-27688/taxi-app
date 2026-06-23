import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

interface CurrentLocation {
    lat: number;
    lng: number;
    address: string;
}

export function useCurrentLocation() {
    const [location, setLocation] = useState<CurrentLocation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLocation = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setError('Location permission denied');
                setLoading(false);
                return;
            }

            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const { latitude, longitude } = position.coords;

            const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });

            const address = place
                ? [place.name, place.street, place.city].filter(Boolean).join(', ')
                : `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

            setLocation({ lat: latitude, lng: longitude, address });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get location');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    return { location, loading: loading, error, refresh: fetchLocation };
}