import { observer } from 'mobx-react-lite'
import { AppointmentForm } from '../components/AppointmentForm'
import { appointmentStore } from '../stores/AppointmentStore'

export const AppointmentScreen = observer(({ navigation }: any) => {
    const appointment = appointmentStore.selectedAppointment

    if (!appointment) return <></>

    return (
        <AppointmentForm
            navigation={navigation}
            initialValues={appointment}
        />
    )
})