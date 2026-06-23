import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authService } from "./auth.service";
import { loginSchema, refreshSchema, registerSchema } from "./auth.validation";

export const authRoutes = new Hono();

authRoutes.post("/register", zValidator("json", registerSchema), async (c) => {
    const result = await authService.register(c.req.valid("json"));
    return c.json(result, 201);
});

authRoutes.post("/login", zValidator("json", loginSchema), async (c) => {
    const result = await authService.login(c.req.valid("json"));
    return c.json(result, 200);
});

authRoutes.post("/refresh", zValidator("json", refreshSchema), async (c) => {
    const tokens = await authService.refresh(c.req.valid("json").refreshToken);
    return c.json(tokens, 200);
});