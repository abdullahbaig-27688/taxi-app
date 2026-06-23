import { and, desc, eq } from "drizzle-orm";
import { db } from "../../config/database";
import { savedAddresses } from "../../db/schemas/address.schema";
import { AppError } from "../../utils/error";
import type { CreateAddressInput, UpdateAddressInput } from "./address.validation";

class AddressService {
    async listForUser(userId: string) {
        return db
            .select()
            .from(savedAddresses)
            .where(eq(savedAddresses.userId, userId))
            .orderBy(desc(savedAddresses.createdAt));
    }

    async create(userId: string, input: CreateAddressInput) {
        const [address] = await db
            .insert(savedAddresses)
            .values({ userId, ...input })
            .returning();
        return address;
    }

    async update(userId: string, addressId: string, input: UpdateAddressInput) {
        const [existing] = await db
            .select()
            .from(savedAddresses)
            .where(and(eq(savedAddresses.id, addressId), eq(savedAddresses.userId, userId)))
            .limit(1);

        if (!existing) throw new AppError(404, "Address not found");

        const [updated] = await db
            .update(savedAddresses)
            .set(input)
            .where(eq(savedAddresses.id, addressId))
            .returning();
        return updated;
    }

    async delete(userId: string, addressId: string) {
        const [existing] = await db
            .select()
            .from(savedAddresses)
            .where(and(eq(savedAddresses.id, addressId), eq(savedAddresses.userId, userId)))
            .limit(1);

        if (!existing) throw new AppError(404, "Address not found");

        await db.delete(savedAddresses).where(eq(savedAddresses.id, addressId));
        return { id: addressId };
    }
}

export const addressService = new AddressService();