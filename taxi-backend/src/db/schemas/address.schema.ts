import { doublePrecision, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const savedAddresses = pgTable("saved_addresses", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id),
    label: varchar("label", { length: 30 }).notNull().default("Address"),
    title: varchar("title", { length: 50 }).notNull(),
    fullAddress: varchar("full_address", { length: 255 }).notNull(),
    lat: doublePrecision("lat"),
    lng: doublePrecision("lng"),
    houseNumber: varchar("house_number", { length: 20 }),
    phoneNumber: varchar("phone_number", { length: 20 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});