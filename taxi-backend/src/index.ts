import app from "./app";
import { testConnection } from "./config/database";
import { env } from "./config/env";
await testConnection();
Bun.serve({
  port: parseInt(env.PORT, 10),
  fetch: app.fetch
})
console.log(`🚀 Server is running on port ${env.PORT}`);