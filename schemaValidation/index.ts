import { z } from 'zod'

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const SignUpSchema = SignInSchema.extend({
    name: z.string().min(2),
    phoneNumber: z.string().min(4)
})