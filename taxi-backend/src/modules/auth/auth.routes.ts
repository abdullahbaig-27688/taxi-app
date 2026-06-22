import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { authService } from "./auth.service";
import { loginSchema, refreshSchema, registerSchema } from "./auth.validation";

export const authRoutes = new Hono();

authRoutes.post("/register", zValidator("form", registerSchema), async (c) => {

    const result = await authService.register(c.req.valid("form"));
    return c.json(result, 201);

});

authRoutes.post("/login", zValidator("form", loginSchema), async (c) => {

    const result = await authService.login(c.req.valid("form"));
    return c.json(result, 200);

});

authRoutes.post("/refresh", zValidator("form", refreshSchema), async (c) => {

    const tokens = await authService.refresh(c.req.valid("form").refreshToken);
    return c.json(tokens, 200);

});