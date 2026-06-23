import { Hono } from "hono";
import { rideRoutes } from "./ride.route"
export const rideModule = new Hono();
rideModule.route("/ride", rideRoutes);