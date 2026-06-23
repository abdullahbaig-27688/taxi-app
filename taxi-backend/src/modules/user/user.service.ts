import { eq } from "drizzle-orm";
import { db } from "../../config/database";
import { users } from "../../db/schemas/user.schema";
import { AppError } from "../../utils/error";
import { UserProfile } from "./user.types";
import { UpdateProfileInput } from "./user.validation";

class UserService {
    async getProfile(userId: string): Promise<UserProfile> {
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId)
        })
        if (!user) throw new AppError(404, "User not found");
        return this.toProfile(user)
    }

    async updateProfile(userId: string, input: UpdateProfileInput): Promise<UserProfile> {
        const [user] = await db
            .update(users)
            .set({ ...input, updatedAt: new Date() })
            .where(eq(users.id, userId))
            .returning();

        if (!user) throw new AppError(404, "User not found");
        return this.toProfile(user);
    }

    private toProfile(user: typeof users.$inferSelect): UserProfile {
        return {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        }
    }
}
export const userService = new UserService