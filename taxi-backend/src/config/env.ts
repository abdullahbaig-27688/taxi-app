import { z } from "zod";
// import { process } from "zod/v4/core";
const envSchema = z.object({
    PORT: z.string().default("3000"),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    JWT_EXPIRATION_TIME: z.string().default("1h"),
    JWT_REFRESH_SECRET: z.string().min(1),
    JWT_REFRESH_EXPIRATION_TIME: z.string().default("7d"),
})
export const env = envSchema.parse(process.env);