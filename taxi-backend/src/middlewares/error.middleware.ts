import type { ErrorHandler } from "hono";
import { AppError } from "../utils/error";
export const errorHandler: ErrorHandler = (err, c) => {
    if (err instanceof AppError) {
        return c.json({ error: err.message }, err.statuscode as any);
    }

    console.error("Unexpected error:", err);
    return c.json({ error: "Something went wrong" }, 500);
}