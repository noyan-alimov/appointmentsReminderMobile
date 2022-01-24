import { useState } from 'react'
import { TextInput, View, Text, Switch, ScrollView, Alert, Pressable } from 'react-native'
import tw from 'twrnc'
import DateTimePicker from '@react-native-community/datetimepicker'
import { getTodaysDateModel, parseDate, parseRemindPeriods, parseTime } from '../utils'
import { Appointment, DateModel } from '../models'
import { useEffect } from 'react'

interface props {
    initialValues?: Appointment
}

export const AppointmentForm: React.FC<props> = ({ initialValues }) => {
    const [name, setName] = useState(initialValues?.name || '')
    const [inviteeName, setInviteeName] = useState(initialValues?.invitee?.name || '')
    const [inviteePhoneNumber, setInviteePhoneNumber] = useState(initialValues?.invitee.phone_number || '')
    const [dateModel, setDateModel] = useState<DateModel>(initialValues?.date || getTodaysDateModel())

    const inviteeRemindPeriods = parseRemindPeriods(initialValues?.invitee_reminder_periods || [])
    const requestorRemindPeriods = parseRemindPeriods(initialValues?.requestor_reminder_periods || [])

    // remindPeriods invitee
    const [add30mins, setAdd30mins] = useState(inviteeRemindPeriods?.thirtyMins || false)
    const [add1hour, setAdd1hour] = useState(inviteeRemindPeriods?.oneHour || false)
    const [add1day, setAdd1day] = useState(inviteeRemindPeriods?.oneDay || false)
    // remindPeriods requestor
    const [add30minsRequestor, setAdd30minsRequestor] = useState(requestorRemindPeriods?.thirtyMins || false)
    const [add1hourRequestor, setAdd1hourRequestor] = useState(requestorRemindPeriods?.oneHour || false)
    const [add1dayRequestor, setAdd1dayRequestor] = useState(requestorRemindPeriods?.oneDay || false)

    const [sameAsInvitee, setSameAsInvitee] = useState(false)

    useEffect(() => {
        if (sameAsInvitee) {
            setAdd30minsRequestor(add30mins)
            setAdd1hourRequestor(add1hour)
            setAdd1dayRequestor(add1day)
        }
    }, [sameAsInvitee])

    const addAppointment = () => {
        Alert.alert('Added')
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
                    <Pressable style={tw`bg-black py-4 w-1/2 rounded-md`} onPress={addAppointment}>
                        <Text style={tw`text-white font-bold text-xl text-center`}>
                            {initialValues ? 'Save' : 'Add'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

const CustomDateTimePicker = ({ dateModel, onChange }: { dateModel: DateModel, onChange: (dateModel: DateModel) => void }) => {
    const [date, setDate] = useState(new Date())
    const onDateChange = (_, selectedDate) => {
        const currentDate = selectedDate || date
        setDate(currentDate)
        const parsedDate = parseDate(date)
        onChange({ ...dateModel, ...parsedDate })
    }

    const [time, setTime] = useState(new Date())
    const onTimeChange = (_, selectedDate) => {
        const currentDate = selectedDate || time
        setTime(currentDate)
        const parsedTime = parseTime(time)
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