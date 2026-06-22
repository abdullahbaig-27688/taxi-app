import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { env } from "../config/env";
import type { AppEnv } from "../types/index";
import { AppError } from "../utils/error";

export async function authMiddleware(c: Context<AppEnv>, next: Next) {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(401, "Missing or invalid Authorization header")
    }

    const token = authHeader.slice(7);

    let payload: AppEnv["Variables"]["user"];
    try {
        payload = (await verify(token, env.JWT_SECRET, "HS256")) as AppEnv["Variables"]["user"];
    } catch (err) {
        console.error("JWT verify failed:", err);
        throw new AppError(401, "Invalid or expired access token");
    }

    c.set("user", payload);
    await next();
}