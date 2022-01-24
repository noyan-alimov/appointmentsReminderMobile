import { AppointmentForm } from '../components/AppointmentForm'
import { appointments } from '../data'

export const AppointmentScreen = () => {
    const appointment = appointments[0]

    return (
        <AppointmentForm
            initialValues={appointment}
        />
    )
}