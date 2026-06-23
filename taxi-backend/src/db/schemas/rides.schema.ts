import { doublePrecision, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
export const rideStatusEnum = pgEnum("ride_status", [
    "pending",
    "accepted",
    "ongoing",
    "completed",
    "cancelled",
])
export const rides = pgTable("rides", {

    id: uuid("id").primaryKey().defaultRandom(),
    riderId: uuid("rider_id").notNull().references(() => users.id),
    driverId: uuid("driver_id").references(() => users.id),
    pickupLat: doublePrecision("pickup_lat").notNull(),
    pickupLng: doublePrecision("pickup_lng").notNull(),
    dropoffLat: doublePrecision("dropoff_lat").notNull(),
    dropoffLng: doublePrecision("dropoff_lng").notNull(),
    distanceKm: doublePrecision("distance_km").notNull(),
    fare: doublePrecision("fare").notNull(),
    vehicleCategory: varchar("vehicle_category", { length: 30 }).notNull(),
    status: rideStatusEnum("status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),

});