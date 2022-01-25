import { action, makeObservable, observable, runInAction } from 'mobx'
import { Alert } from 'react-native'
import { Appointment } from '../models'
import { supabase } from '../supabaseClient'
import { definitions } from '../types/supabase'
import { parseAppointment } from '../utils'

class AppointmentStore {
    constructor() {
        makeObservable(this, {
            isLoading: observable,
            createAppointment: action.bound,
            updateAppointment: action.bound,

            appointments: observable,
            isAppointmentsLoading: observable,
            loadAppointments: action.bound,

            selectedAppointment: observable,
            setSelectedAppointment: action.bound
        })
    }

    isLoading: boolean = false

    async createAppointment(appointment: definitions['appointment']) {
        runInAction(() => {
            this.isLoading = true
        })
        const { error, status } = await supabase.from('appointment').insert(appointment)
        if (error || status !== 201) {
            Alert.alert(error?.message || 'Error creating an appointment')
        }
        runInAction(() => {
            this.isLoading = false
        })
        this.loadAppointments()
    }

    async updateAppointment(appointment: definitions['appointment']) {
        runInAction(() => {
            this.isLoading = true
        })
        const { error, status } = await supabase.from('appointment').update(appointment)
        if (error || status !== 200) {
            Alert.alert(error?.message || 'Error updating an appointment')
        }
        runInAction(() => {
            this.isLoading = false
        })
        this.loadAppointments()
    }

    appointments: Appointment[] = []
    isAppointmentsLoading: boolean = false

    async loadAppointments() {
        runInAction(() => {
            this.isAppointmentsLoading = true
        })
        const { error, status, data } = await supabase.from<definitions['appointment']>('appointment').select()
        if (error || status !== 200 || !data) {
            Alert.alert(error?.message || 'Error loading appointments')
        } else {
            runInAction(() => {
                this.appointments = data.map(a => parseAppointment(a))
            })
        }
        runInAction(() => {
            this.isAppointmentsLoading = false
        })
    }

    selectedAppointment: Appointment | null = null

    setSelectedAppointment(appointment: Appointment) {
        this.selectedAppointment = appointment
    }
}

export const appointmentStore = new AppointmentStore()