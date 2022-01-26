import { useState } from 'react'
import { TextInput, View, Text, Switch, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import tw from 'twrnc'
import DateTimePicker from '@react-native-community/datetimepicker'
import { convertFromDateModelToJSDate, generateRemindPeriods, getTodaysDateModel, parseDate, parseRemindPeriods, parseTime } from '../utils'
import { Appointment, DateModel } from '../models'
import { useEffect } from 'react'
import { appointmentStore } from '../stores/AppointmentStore'
import { authStore } from '../stores/AuthStore'
import { supabase } from '../supabaseClient'
import { observer } from 'mobx-react-lite'

interface props {
    navigation: any
    initialValues?: Appointment
}

export const AppointmentForm = observer(({ navigation, initialValues }: props) => {
    const [name, setName] = useState(initialValues?.name || '')
    const [inviteeName, setInviteeName] = useState(initialValues?.invitee?.name || '')
    const [inviteePhoneNumber, setInviteePhoneNumber] = useState(initialValues?.invitee.phoneNumber || '')
    const [dateModel, setDateModel] = useState<DateModel>(initialValues?.date || getTodaysDateModel())

    const inviteeRemindPeriods = parseRemindPeriods(initialValues?.invitee_reminder_periods || [])
    const requestorRemindPeriods = parseRemindPeriods(initialValues?.requestor_reminder_periods || [])

    // remindPeriods invitee
    const [add30mins, setAdd30mins] = useState<boolean>(inviteeRemindPeriods?.thirtyMins || false)
    const [add1hour, setAdd1hour] = useState<boolean>(inviteeRemindPeriods?.oneHour || false)
    const [add1day, setAdd1day] = useState<boolean>(inviteeRemindPeriods?.oneDay || false)
    // remindPeriods requestor
    const [add30minsRequestor, setAdd30minsRequestor] = useState<boolean>(requestorRemindPeriods?.thirtyMins || false)
    const [add1hourRequestor, setAdd1hourRequestor] = useState<boolean>(requestorRemindPeriods?.oneHour || false)
    const [add1dayRequestor, setAdd1dayRequestor] = useState<boolean>(requestorRemindPeriods?.oneDay || false)

    const [sameAsInvitee, setSameAsInvitee] = useState<boolean>(false)

    useEffect(() => {
        if (sameAsInvitee) {
            setAdd30minsRequestor(add30mins)
            setAdd1hourRequestor(add1hour)
            setAdd1dayRequestor(add1day)
        }
    }, [sameAsInvitee])

    const navigate = () => {
        if (initialValues) {
            navigation.goBack()
        } else {
            navigation.navigate('Appointments')
        }
    }

    const resetForm = () => {
        setName('')
        setInviteeName('')
        setInviteePhoneNumber('')
        setDateModel(getTodaysDateModel())
        setAdd30mins(false)
        setAdd1hour(false)
        setAdd1day(false)
        setAdd30minsRequestor(false)
        setAdd1hourRequestor(false)
        setAdd1dayRequestor(false)
        setSameAsInvitee(false)
    }

    const handleAppointmentPress = async () => {
        const user = supabase.auth.user()
        if (!user) {
            authStore.setSession(null)
            return
        }

        const appointment = {
            user_id: user.id,
            name,
            date: JSON.stringify(dateModel),
            invitee: JSON.stringify({ name: inviteeName, phoneNumber: inviteePhoneNumber }),
            invitee_reminder_periods: generateRemindPeriods({ add30mins, add1hour, add1day }),
            requestor: JSON.stringify(user.user_metadata),
            requestor_reminder_periods: generateRemindPeriods({ add30mins: add30minsRequestor, add1hour: add1hourRequestor, add1day: add1dayRequestor })
        }

        if (initialValues) {
            await appointmentStore.updateAppointment(initialValues.id, appointment)
        } else {
            await appointmentStore.createAppointment(appointment)
            resetForm()
        }
        navigate()
    }

    const handleDelete = async () => {
        if (!initialValues) return
        await appointmentStore.deleteAppointment(initialValues.id)
        navigate()
    }

    const renderDeleteButton = () => {
        if (appointmentStore.isDeleteAppointmentLoading) return <ActivityIndicator size={'large'} style={tw`mt-10`} />
        return (
            <Pressable style={tw`bg-red-500 py-4 w-1/2 rounded-md mt-10`} onPress={handleDelete}>
                <Text style={tw`text-white font-bold text-xl text-center`}>
                    Delete
                </Text>
            </Pressable>
        )
    }

    return (
        <ScrollView>
            <View style={tw`items-center pt-6 bg-green-50`}>
                <View style={tw`mb-10 w-11/12`}>
                    <TextInput
                        style={tw`border-b border-gray-400 p-2 text-base`}
                        placeholder='Appointment Name (dentist, business meeting)'
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>

                <View style={tw`mb-10 w-11/12`}>
                    <Text style={tw`text-center mb-4 text-base`}>Invitee (person with whom appointment)</Text>
                    <TextInput
                        style={tw`border-b border-gray-400 p-2 text-base`}
                        placeholder='Name'
                        value={inviteeName}
                        onChangeText={text => setInviteeName(text)}
                    />
                    <TextInput
                        style={tw`border-b border-gray-400 p-2 text-base`}
                        placeholder='Phone number'
                        value={inviteePhoneNumber}
                        onChangeText={text => setInviteePhoneNumber(text)}
                    />
                </View>

                <View style={tw`h-32 w-1/2 mb-6`}>
                    <Text style={tw`text-center text-base`}>Date of appointment</Text>
                    <CustomDateTimePicker dateModel={dateModel} onChange={dateModel => setDateModel(dateModel)} />
                </View>

                <View style={tw`mb-10 w-11/12 items-center`}>
                    <View style={tw`h-1 w-full border-b border-gray-300 my-4`}></View>
                    <Text style={tw`text-center text-base`}>Remind invitee before</Text>
                    <View style={tw`flex-row items-center justify-between w-1/2 mt-4`}>
                        <Text style={tw`text-base`}>30 minutes</Text>
                        <Switch
                            value={add30mins}
                            onValueChange={setAdd30mins}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2 my-4`}>
                        <Text style={tw`text-base`}>1 hour</Text>
                        <Switch
                            value={add1hour}
                            onValueChange={setAdd1hour}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2`}>
                        <Text style={tw`text-base`}>1 day</Text>
                        <Switch
                            value={add1day}
                            onValueChange={setAdd1day}
                        />
                    </View>
                </View>

                <View style={tw`mb-10 w-11/12 items-center`}>
                    <Text style={tw`text-center text-base`}>Remind myself before</Text>
                    <View style={tw`flex-row items-center justify-between w-1/2 mt-4`}>
                        <Text style={tw`text-base`}>Same as invitee</Text>
                        <Switch
                            value={sameAsInvitee}
                            onValueChange={setSameAsInvitee}
                        />
                    </View>
                    <View style={tw`h-1 w-full border-b border-gray-300 my-4`}></View>
                    <View style={tw`flex-row items-center justify-between w-1/2`}>
                        <Text style={tw`text-base`}>30 minutes</Text>
                        <Switch
                            value={add30minsRequestor}
                            onValueChange={setAdd30minsRequestor}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2 my-4`}>
                        <Text style={tw`text-base`}>1 hour</Text>
                        <Switch
                            value={add1hourRequestor}
                            onValueChange={setAdd1hourRequestor}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2`}>
                        <Text style={tw`text-base`}>1 day</Text>
                        <Switch
                            value={add1dayRequestor}
                            onValueChange={setAdd1dayRequestor}
                        />
                    </View>
                </View>

                <View style={tw`mb-10 w-full items-center`}>
                    {appointmentStore.isLoading ? (
                        <ActivityIndicator size='large' />
                    ) : (
                        <Pressable style={tw`bg-black py-4 w-1/2 rounded-md`} onPress={handleAppointmentPress}>
                            <Text style={tw`text-white font-bold text-xl text-center`}>
                                {initialValues ? 'Save' : 'Add'}
                            </Text>
                        </Pressable>
                    )}
                    {initialValues && renderDeleteButton()}
                </View>
            </View>
        </ScrollView>
    )
})

const CustomDateTimePicker = ({ dateModel, onChange }: { dateModel: DateModel, onChange: (dateModel: DateModel) => void }) => {
    const [date, setDate] = useState(convertFromDateModelToJSDate(dateModel))
    const onDateChange = (_: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date
        setDate(currentDate)
        const parsedDate = parseDate(currentDate)
        onChange({ ...dateModel, ...parsedDate })
    }

    const [time, setTime] = useState(convertFromDateModelToJSDate(dateModel))
    const onTimeChange = (_: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || time
        setTime(currentDate)
        const parsedTime = parseTime(currentDate)
        onChange({ ...dateModel, ...parsedTime })
    }

    return (
        <>
            <DateTimePicker
                style={tw`my-4`}
                value={date}
                mode={'date'}
                onChange={onDateChange}
            />
            <DateTimePicker
                value={time}
                mode={'time'}
                onChange={onTimeChange}
            />
        </>
    )
}