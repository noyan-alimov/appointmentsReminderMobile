import { z } from 'zod'

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const SignUpSchema = SignInSchema.extend({
    name: z.string().min(2),
    phoneNumber: z.string().min(4),
    timezone: z.string().min(4)
})

export const AppointmentSchema = z.object({
    name: z.string().min(4),
    dateModel: z.object({
        minute: z.number(),
        hour: z.number(),
        dayOfMonth: z.number(),
        month: z.number()
    }),
    requestor: z.object({
        name: z.string().min(2),
        phoneNumber: z.string().min(4)
    }),
    invitee: z.object({
        name: z.string().min(2),
        phoneNumber: z.string().min(4)
    }),
    requestor_reminder_periods: z.array(z.string()).nonempty(),
    invitee_reminder_periods: z.array(z.string()).nonempty()
})