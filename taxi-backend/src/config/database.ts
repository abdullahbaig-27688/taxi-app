

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as addressSchemas from "../db/schemas/address.schema";
import * as userSchemas from "../db/schemas/user.schema";
import { env } from "./env";
export const sql = postgres(env.DATABASE_URL, {

});
const client = postgres(env.DATABASE_URL, {
});
export const db = drizzle(client, {
    schema: {
        ...userSchemas,
        ...addressSchemas,
    }
});



export async function testConnection() {
    try {
        await sql`SELECT 1`;
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
}