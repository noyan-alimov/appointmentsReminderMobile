export interface Appointment {
    id: number
    name: string // dentist, business meeting
    date: DateModel
    requestor: User // person who scheduled an apoointment
    invitee: User
    requestor_reminder_periods: ReminderPeriod[] // When to remind a requestor
    invitee_reminder_periods: ReminderPeriod[] // When to remind an invitee
}

export interface DateModel {
    minute: number
    hour: number
    dayOfMonth: number
    month: number
}

export interface User {
    name: string
    phone_number: string
}

// When to remind about the appointment (before 30 minutes, etc...)
export type ReminderPeriod = '30mins' | '1hour' | '1day'