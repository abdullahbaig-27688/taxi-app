import { z } from "zod"
export const updateProfileSchema = z.object({
    fullname: z.string().min(2).max(255).optional(),
    email: z.string().optional()
})
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

