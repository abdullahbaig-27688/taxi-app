import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { env } from "../config/env";
import type { JwtPayload } from "../modules/auth/auth.types";
import { AppError } from "../utils/error";

export const requireAuth = async (c: Context, next: Next) => {
    const authHeader = c.req.header("Authorization");

    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
        throw new AppError(401, "No token provided");
    }

    try {
        const payload = (await verify(
            token,
            env.JWT_SECRET,
            "HS256"
        )) as JwtPayload;

        c.set("user", payload);

    } catch (error) {
        console.log(error);
        throw new AppError(401, "Invalid or expired token");
    }

    await next();
};