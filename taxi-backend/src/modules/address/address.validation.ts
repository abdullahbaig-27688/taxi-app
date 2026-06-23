import { z } from "zod";

export const createAddressSchema = z.object({
    label: z.string().max(30).default("Address"),
    title: z.string().min(1).max(50),
    fullAddress: z.string().min(1).max(255),
    lat: z.number().min(-90).max(90).nullable().optional(),
    lng: z.number().min(-180).max(180).nullable().optional(),
    houseNumber: z.string().max(20).optional(),
    phoneNumber: z.string().max(20).optional(),
});

export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;