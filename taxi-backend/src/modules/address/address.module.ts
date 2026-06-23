import { Hono } from "hono";
import { addressRoutes } from "./address.route";
export const addressModule = new Hono();
addressModule.route("/addresses", addressRoutes);  // was "/auth" — that was the bug