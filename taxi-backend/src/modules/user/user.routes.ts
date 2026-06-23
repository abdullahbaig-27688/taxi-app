import { Hono } from "hono";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { AppEnv } from "../../types";
import { userService } from "./user.service";
export const userRoutes = new Hono<AppEnv>();
userRoutes.use("*", authMiddleware)
userRoutes.get("/me", async (c) => {
    const { sub } = c.get("user")
    const profile = await userService.getProfile(sub)
    return c.json(profile)
})
userRoutes.patch("/me", async (c) => {
    const { sub } = c.get("user")
    const input = c.req.valid("form");
    const updated = await userService.updateProfile(sub, input)
    return c.json(updated)
})