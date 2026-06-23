import * as SecureStore from "expo-secure-store";
import { useState } from "react";

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:3000";


export interface RidePayload {
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
    vehicleCategory: "economy" | "premium" | "xl";
}


export interface RideEstimate {
    distanceKm: number;
    durationMinutes: number;
    fare: number;
    vehicleCategory: string;
    currency: string;
}


export interface Ride {
    id: string;
    riderId: string;
    driverId: string | null;
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
    distanceKm: number;
    fare: number;
    vehicleCategory: string;
    status: string;
    createdAt: string;
}


function extractErrorMessage(data: any) {
    if (!data) return "Something went wrong";

    if (typeof data.error === "string") {
        return data.error;
    }

    return (
        data.error?.message ||
        data.message ||
        "Something went wrong"
    );
}


export function useRide() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getToken = async () => {
        const token = await SecureStore.getItemAsync("authToken");

        if (!token) {
            throw new Error("User not authenticated");
        }

        return token;
    };



    const estimateRide = async (
        payload: RidePayload
    ): Promise<RideEstimate | null> => {

        try {

            setLoading(true);
            setError(null);

            const token = await getToken();


            const response = await fetch(
                `${API_BASE_URL}/api/rides/estimate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    extractErrorMessage(data)
                );
            }


            return data;


        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : "Estimate failed"
            );

            return null;

        } finally {

            setLoading(false);

        }
    };




    const requestRide = async (
        payload: RidePayload
    ): Promise<Ride | null> => {

        try {

            setLoading(true);
            setError(null);

            const token = await getToken();


            const response = await fetch(
                `${API_BASE_URL}/api/rides/request`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    extractErrorMessage(data)
                );
            }


            return data;


        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : "Ride request failed"
            );

            return null;

        } finally {

            setLoading(false);

        }
    };



    return {
        estimateRide,
        requestRide,
        loading,
        error,
    };
}