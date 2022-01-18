import { DateModel } from './models'

export const parseDate = (date: Date) => ({
    dayOfMonth: date.getDate(),
    month: date.getMonth()
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
        month: today.getMonth()
    }
}