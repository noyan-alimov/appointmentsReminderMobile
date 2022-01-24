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

export const showDate = (date: DateModel): string => {
    const { dayOfMonth, month, hour, minute } = date

    return `${formatDate(dayOfMonth)}/${formatDate(month)}/2022 ${formatDate(hour)}:${formatDate(minute)}`
}

const formatDate = (time: number): string => {
    if (time < 10) return `0${time}`
    return time.toString()
}