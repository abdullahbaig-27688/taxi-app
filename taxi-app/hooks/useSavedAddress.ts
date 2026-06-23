import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';

export interface SavedAddress {
    id: string;
    label: string;
    title: string;
    fullAddress: string;
    lat: number | null;
    lng: number | null;
    houseNumber?: string;
    phoneNumber?: string;
    createdAt: string;
}

function extractErrorMessage(data: any): string {
    if (!data) return 'Something went wrong. Please try again.';
    if (typeof data.error === 'string') return data.error;
    const errorObj = data.error ?? data;
    const raw = errorObj?.message ?? data.message;
    if (typeof raw === 'string') {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed.map((item: any) => item?.message).filter(Boolean).join('\n');
            }
        } catch {
            return raw;
        }
        return raw;
    }
    return 'Something went wrong. Please try again.';
}

async function authHeaders() {
    const token = await SecureStore.getItemAsync('authToken');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

export function useSavedAddresses() {
    const [addresses, setAddresses] = useState<SavedAddress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAddresses = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/api/addresses`, {
                method: 'GET',
                headers: await authHeaders(),
            });

            console.log('ADDRESS FETCH STATUS:', response.status); // 👈 added

            const data = await response.json().catch(() => null);

            console.log('ADDRESS FETCH RAW DATA:', JSON.stringify(data)); // 👈 added

            if (!response.ok) throw new Error(extractErrorMessage(data));

            setAddresses(data ?? []);
        } catch (err) {
            console.log('SAVED ADDRESS FETCH ERROR:', err);
            setError(err instanceof Error ? err.message : 'Failed to load addresses.');
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteAddress = useCallback(async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/api/addresses/${id}`, {
            method: 'DELETE',
            headers: await authHeaders(),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(extractErrorMessage(data));
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    }, []);

    const saveAddress = useCallback(async (address: Omit<SavedAddress, 'id' | 'createdAt'>) => {
        const response = await fetch(`${API_BASE_URL}/api/addresses`, {
            method: 'POST',
            headers: await authHeaders(),
            body: JSON.stringify(address),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(extractErrorMessage(data));
        setAddresses((prev) => [data, ...prev]);
        return data;
    }, []);

    const updateAddress = useCallback(async (id: string, address: Partial<Omit<SavedAddress, 'id' | 'createdAt'>>) => {
        const response = await fetch(`${API_BASE_URL}/api/addresses/${id}`, {
            method: 'PATCH',
            headers: await authHeaders(),
            body: JSON.stringify(address),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(extractErrorMessage(data));
        setAddresses((prev) => prev.map((a) => (a.id === id ? data : a)));
        return data;
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return { addresses, loading, error, refetch: fetchAddresses, deleteAddress, saveAddress, updateAddress };
}