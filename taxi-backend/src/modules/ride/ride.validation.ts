import { z } from "zod";

export const estimateRideSchema = z.object({
    pickupLat: z.number().min(-90).max(90),
    pickupLng: z.number().min(-180).max(180),

    dropoffLat: z.number().min(-90).max(90),
    dropoffLng: z.number().min(-180).max(180),

    vehicleCategory: z.enum([
        "economy",
        "premium",
        "xl"
    ]).default("economy"),
});


export const requestRideSchema = estimateRideSchema;

export type EstimateRideInput = z.infer<typeof estimateRideSchema>;
export type RequestRideInput = z.infer<typeof requestRideSchema>;