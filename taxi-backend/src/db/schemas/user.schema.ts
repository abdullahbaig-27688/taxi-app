import { pgEnum, pgTable, timestamp, uuid, varchar, } from 'drizzle-orm/pg-core';
export const userRole = pgEnum("user_role", ["rider"])
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    fullname: varchar("fullname", { length: 255 }).notNull(),
    email: varchar("email").notNull().unique(),
    password: varchar("password").notNull(),
    role: userRole("role").notNull().default("rider"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),

})


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;