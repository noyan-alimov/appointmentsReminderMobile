import { DateModel, ReminderPeriod, allAvailableRemindPeriods, Appointment } from './models'
import { definitions } from './types/supabase'

export const parseDate = (date: Date) => ({
    dayOfMonth: date.getDate(),
    month: date.getMonth() + 1
})

export const parseTime = (time: Date) => ({
    minute: time.getMinutes(),
    hour: time.getHours()
})

export const getTodaysDateModel = (): DateModel => {
    const today = new Date()
    return {
        minute: today.getMinutes(),
        hour: today.getHours(),
        dayOfMonth: today.getDate(),
        month: today.getMonth() + 1
    }
}

export const showDate = (date: DateModel): string => {
    const { dayOfMonth, month, hour, minute } = date

    return `${formatDate(dayOfMonth)}/${formatDate(month)}/2022 ${formatDate(hour)}:${formatDate(minute)}`
}

const formatDate = (value: number): string => {
    if (value < 10) return `0${value}`
    return value.toString()
}

export const parseRemindPeriods = (remindPeriods: ReminderPeriod[]): any => {
    const obj: any = {}

    for (const remindPeriod of allAvailableRemindPeriods) {
        obj[remindPeriod] = false
    }

    for (const remindPeriod of remindPeriods) {
        obj[remindPeriod] = true
    }

    return obj
}

export const generateRemindPeriods = ({ add30mins, add1hour, add1day }: { add30mins: boolean, add1hour: boolean, add1day: boolean }): ReminderPeriod[] => {
    const remindPeriods: ReminderPeriod[] = []
    add30mins && remindPeriods.push('thirtyMins')
    add1hour && remindPeriods.push('oneHour')
    add1day && remindPeriods.push('oneDay')
    return remindPeriods
}

export const parseAppointment = (appointment: definitions['appointment']): Appointment => {
    return {
        ...appointment,
        id: appointment.id!,
        date: JSON.parse(appointment.date),
        requestor: JSON.parse(appointment.requestor),
        invitee: JSON.parse(appointment.invitee),
    }
}