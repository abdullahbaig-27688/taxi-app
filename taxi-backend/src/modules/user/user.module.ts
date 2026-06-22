import { Hono } from "hono";
import { userRoutes } from "./user.routes";
export const userModule = new Hono();
userModule.route("/users", userRoutes)