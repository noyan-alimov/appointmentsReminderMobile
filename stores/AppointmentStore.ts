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
            createAppointment: action,
            updateAppointment: action,

            isDeleteAppointmentLoading: observable,
            deleteAppointment: action,

            appointments: observable,
            isAppointmentsLoading: observable,
            loadAppointments: action,

            selectedAppointment: observable,
            setSelectedAppointment: action
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

    async updateAppointment(id: number, appointment: definitions['appointment']) {
        runInAction(() => {
            this.isLoading = true
        })
        const { error, status } = await supabase.from('appointment').update(appointment).match({ id })
        if (error || status !== 200) {
            Alert.alert(error?.message || 'Error updating an appointment')
        }
        runInAction(() => {
            this.isLoading = false
        })
        this.loadAppointments()
    }

    isDeleteAppointmentLoading: boolean = false

    async deleteAppointment(id: number) {
        runInAction(() => {
            this.isDeleteAppointmentLoading = true
        })
        const { error, status } = await supabase.from('appointment').delete().match({ id })
        if (error || status !== 200) {
            Alert.alert(error?.message || 'Error deleting an appointment')
        }
        runInAction(() => {
            this.isDeleteAppointmentLoading = false
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