import { Appointment } from './models'

export const appointments: Appointment[] = [
    {
        id: 1,
        name: 'Dentist',
        date: {
            minute: 0,
            hour: 16,
            dayOfMonth: 10,
            month: 9
        },
        requestor: {
            name: 'Noyan',
            phone_number: '+7 771 123 7777'
        },
        invitee: {
            name: 'John',
            phone_number: '+7 778 921 0640'
        },
        requestor_reminder_periods: ['1day'],
        invitee_reminder_periods: ['30mins', '1hour']
    },
    {
        id: 2,
        name: 'Dentist',
        date: {
            minute: 0,
            hour: 16,
            dayOfMonth: 10,
            month: 9
        },
        requestor: {
            name: 'Noyan',
            phone_number: '+7 771 123 7777'
        },
        invitee: {
            name: 'John',
            phone_number: '+7 778 921 0640'
        },
        requestor_reminder_periods: ['1day'],
        invitee_reminder_periods: ['30mins']
    },
    {
        id: 3,
        name: 'Dentist',
        date: {
            minute: 0,
            hour: 16,
            dayOfMonth: 10,
            month: 9
        },
        requestor: {
            name: 'Noyan',
            phone_number: '+7 771 123 7777'
        },
        invitee: {
            name: 'John',
            phone_number: '+7 778 921 0640'
        },
        requestor_reminder_periods: ['1day'],
        invitee_reminder_periods: ['30mins']
    },
    {
        id: 4,
        name: 'Dentist',
        date: {
            minute: 0,
            hour: 16,
            dayOfMonth: 10,
            month: 9
        },
        requestor: {
            name: 'Noyan',
            phone_number: '+7 771 123 7777'
        },
        invitee: {
            name: 'John',
            phone_number: '+7 778 921 0640'
        },
        requestor_reminder_periods: ['1day'],
        invitee_reminder_periods: ['30mins']
    }
]