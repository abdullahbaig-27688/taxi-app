import { Hono } from 'hono'
import { errorHandler } from './middlewares/error.middleware'
import { authModule } from './modules/auth/auth.module'
import { userModule } from './modules/user/user.module'
const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})
app.get("/health", (c) => {
    return c.text("ok")
})
app.route("/api", authModule);
app.route("/api", userModule)
app.onError(errorHandler)
export default app
