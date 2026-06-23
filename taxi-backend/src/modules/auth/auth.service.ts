import { eq } from "drizzle-orm";
import { sign, verify } from "hono/jwt";
import { db } from "../../config/database";
import { env } from "../../config/env";
import { users } from "../../db/schemas/user.schema";
import { AppError } from "../../utils/error";
import type { AuthResponse, JwtPayload } from "./auth.types";
import type { LoginInput, RegisterInput } from "./auth.validation";
function parseExpiry(value: string): number {
    const match = value.match(/^(\d+)([smhd])$/);
    if (!match) return 900;
    const multipliers: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };
    return Number(match[1]) * multipliers[match[2]];
}
class AuthService {
    async register(input: RegisterInput): Promise<AuthResponse> {
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, input.email),
        });
        if (existingUser) throw new AppError(409, "Email is already registered")
        const passwordHash = await Bun.password.hash(input.password, {
            algorithm: "argon2id",
        })

        const [user] = await db
            .insert(users)
            .values({ fullname: input.fullname, email: input.email, password: passwordHash })
            .returning();

        return { ...(await this.generateTokens(user)), user: this.toAuthUser(user) };

    }

    async login(input: LoginInput): Promise<AuthResponse> {
        const user = await db.query.users.findFirst({
            where: eq(users.email, input.email)
        })
        if (!user) throw new AppError(401, "Invalid email or password");
        const isValid = await Bun.password.verify(input.password, user.password)
        if (!isValid) throw new Error("INVALID_CREDENTIALS");
        return { ...(await this.generateTokens(user)), user: this.toAuthUser(user) };
    }

    async refresh(refreshToken: string) {
        let payload: JwtPayload;
        try {
            payload = (await verify(refreshToken, env.JWT_REFRESH_SECRET)) as JwtPayload;
        } catch {
            throw new Error("INVALID_REFRESH_TOKEN");
        }
        const user = await db.query.users.findFirst({
            where: eq(users.id, payload.sub)

        });
        if (!user) throw new AppError(401, "Invalid or expired refresh token");
        return this.generateTokens(user);

    }

    private toAuthUser(user: typeof users.$inferSelect) {
        return { id: user.id, fullname: user.fullname, email: user.email, role: user.role }
    }

    private async generateTokens(user: typeof users.$inferSelect) {
        const basePayload: JwtPayload = { sub: user.id, email: user.email, role: user.role }
        const now = Math.floor(Date.now() / 1000);
        const accessToken = await sign(
            { ...basePayload, exp: now + parseExpiry(env.JWT_EXPIRATION_TIME) }, env.JWT_SECRET
        );
        const refreshToken = await sign({
            ...basePayload, exp: now + parseExpiry(env.JWT_REFRESH_EXPIRATION_TIME)
        }, env.JWT_REFRESH_SECRET)

        return { accessToken, refreshToken };

    }
}
export const authService = new AuthService;