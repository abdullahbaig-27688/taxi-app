import { Hono } from "hono"
import { authRoutes } from "./auth.routes"
export const authModule = new Hono();
authModule.route("/auth", authRoutes);
