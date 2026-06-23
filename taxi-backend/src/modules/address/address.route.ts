import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { requireAuth } from "../../middlewares/auth.middleware";
import type { AppEnv } from "../../types/index";
import { AppError } from "../../utils/error";
import { addressService } from "./address.service";
import { createAddressSchema, updateAddressSchema } from "./address.validation";

export const addressRoutes = new Hono<AppEnv>();

addressRoutes.get("/", requireAuth, async (c) => {
    try {
        const user = c.get("user");
        console.log("DEBUG: GET /addresses user:", JSON.stringify(user));
        if (!user || !user.sub) {
            console.error("DEBUG: User or user.sub missing in GET /addresses");
            throw new AppError(401, "User context missing or invalid");
        }
        const addresses = await addressService.listForUser(user.sub);
        return c.json(addresses, 200);
    } catch (err: any) {
        console.error("CRITICAL ERROR GET /addresses:", err);
        return c.json({
            error: err.message || "Internal Server Error",
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }, err.statusCode || 500);
    }
});

addressRoutes.post("/", requireAuth, zValidator("json", createAddressSchema), async (c) => {
    try {
        const user = c.get("user");
        if (!user || !user.sub) throw new AppError(401, "User context missing");
        const address = await addressService.create(user.sub, c.req.valid("json"));
        return c.json(address, 201);
    } catch (err: any) {
        console.error("CRITICAL ERROR POST /addresses:", err);
        return c.json({ error: err.message }, err.statusCode || 500);
    }
});

addressRoutes.patch("/:id", requireAuth, zValidator("json", updateAddressSchema), async (c) => {
    try {
        const user = c.get("user");
        if (!user || !user.sub) throw new AppError(401, "User context missing");
        const id = c.req.param("id");
        const address = await addressService.update(user.sub, id, c.req.valid("json"));
        return c.json(address, 200);
    } catch (err: any) {
        console.error("CRITICAL ERROR PATCH /addresses:", err);
        return c.json({ error: err.message }, err.statusCode || 500);
    }
});

addressRoutes.delete("/:id", requireAuth, async (c) => {
    try {
        const user = c.get("user");
        if (!user || !user.sub) throw new AppError(401, "User context missing");
        const id = c.req.param("id");
        const result = await addressService.delete(user.sub, id);
        return c.json(result, 200);
    } catch (err: any) {
        console.error("CRITICAL ERROR DELETE /addresses:", err);
        return c.json({ error: err.message }, err.statusCode || 500);
    }
});