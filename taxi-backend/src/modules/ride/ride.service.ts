import { eq } from "drizzle-orm";
import { db } from "../../config/database";
import { rides } from "../../db/schemas/rides.schema";
import { AppError } from "../../utils/error";
import type { RideEstimate } from "./ride.type";
import type { EstimateRideInput, RequestRideInput } from "./ride.validation";

const EARTH_RADIUS_KM = 6371;


const VEHICLE_RATES: Record<string, { baseFare: number; perKm: number }> = {
    economy: { baseFare: 1000, perKm: 250 },
    premium: { baseFare: 2000, perKm: 400 },
    xl: { baseFare: 2500, perKm: 450 },
};

const AVERAGE_SPEED_KMH = 30;
const CURRENCY = "IQD"; // adjust to your actual market currency

function toRadians(deg: number): number {
    return (deg * Math.PI) / 180;
}

function haversineDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c;
}

class RideService {
    calculateEstimate(input: EstimateRideInput): RideEstimate {
        const rates = VEHICLE_RATES[input.vehicleCategory];
        if (!rates) throw new AppError(400, "Invalid vehicle category");

        const distanceKm = haversineDistanceKm(
            input.pickupLat,
            input.pickupLng,
            input.dropoffLat,
            input.dropoffLng
        );

        const fare = Math.round(rates.baseFare + rates.perKm * distanceKm);
        const durationMinutes = Math.max(1, Math.round((distanceKm / AVERAGE_SPEED_KMH) * 60));

        return {
            distanceKm: Math.round(distanceKm * 100) / 100,
            durationMinutes,
            fare,
            vehicleCategory: input.vehicleCategory,
            currency: CURRENCY,
        };
    }

    async requestRide(riderId: string, input: RequestRideInput) {
        const estimate = this.calculateEstimate(input);

        const [ride] = await db
            .insert(rides)
            .values({
                riderId,
                pickupLat: input.pickupLat,
                pickupLng: input.pickupLng,
                dropoffLat: input.dropoffLat,
                dropoffLng: input.dropoffLng,
                distanceKm: estimate.distanceKm,
                fare: estimate.fare,
                vehicleCategory: input.vehicleCategory,
                status: "pending",
            })
            .returning();



        return ride;
    }

    async getRideById(rideId: string) {
        const ride = await db.query.rides.findFirst({ where: eq(rides.id, rideId) });
        if (!ride) throw new AppError(404, "Ride not found");
        return ride;
    }
}

export const rideService = new RideService();