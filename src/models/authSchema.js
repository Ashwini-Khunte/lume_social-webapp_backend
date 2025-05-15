import {z} from "zod"

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(/^[a-z0-9](?!.*__)(?!.*_$)[a-z0-9_]*[a-z0-9]$/,
        "Username must be lowercase, can contain numbers and underscores (not start or end with _ or contain consecutive __)"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
});

export const loginSchema = z.object({
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8),
})