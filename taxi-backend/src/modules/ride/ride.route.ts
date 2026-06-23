import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { requireAuth } from "../../middlewares/auth.middleware";
import type { AppEnv } from "../../types/index";
import { rideService } from "./ride.service";
import { estimateRideSchema, requestRideSchema } from "./ride.validation";

export const rideRoutes = new Hono<AppEnv>();

rideRoutes.post("/estimate", requireAuth, zValidator("json", estimateRideSchema), async (c) => {
    const estimate = rideService.calculateEstimate(c.req.valid("json"));
    return c.json(estimate, 200);
});

rideRoutes.post("/request", requireAuth, zValidator("json", requestRideSchema), async (c) => {
    const user = c.get("user");
    const ride = await rideService.requestRide(user.sub, c.req.valid("json"));
    return c.json(ride, 201);
});