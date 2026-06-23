import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000';

interface UserProfile {
    id: string;
    fullname: string;
    email: string;
    role: string;
    createdAt: string;
}

interface UseUserProfileResult {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

function extractErrorMessage(data: any): string {
    if (!data) return 'Failed to load profile.';

    if (typeof data.error === 'string') {
        return data.error;
    }

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

    return 'Failed to load profile.';
}

export function useUserProfile(): UseUserProfileResult {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const token = await SecureStore.getItemAsync('authToken');

            if (!token) {
                router.replace('/auth/login');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/users/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                if (response.status === 401) {
                    await SecureStore.deleteItemAsync('authToken');
                    await SecureStore.deleteItemAsync('refreshToken');
                    router.replace('/auth/login');
                    return;
                }
                throw new Error(extractErrorMessage(data));
            }

            const profile: UserProfile = data?.user ?? data;
            setUser(profile);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load profile.');
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refetch: fetchUser };
}