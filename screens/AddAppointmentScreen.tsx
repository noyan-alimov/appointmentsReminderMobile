import { useState } from 'react'
import { TextInput, View, Text, Switch, ScrollView, Button, Alert } from 'react-native'
import tw from 'twrnc'
import DateTimePicker from '@react-native-community/datetimepicker'
import { getTodaysDateModel, parseDate, parseTime } from '../utils'
import { DateModel } from '../models'
import { useEffect } from 'react'

export const AddAppointmentScreen = () => {
    const [name, setName] = useState('')
    const [inviteeName, setInviteeName] = useState('')
    const [inviteePhoneNumber, setInviteePhoneNumber] = useState('')
    const [dateModel, setDateModel] = useState<DateModel>(getTodaysDateModel())

    // remindPeriod invitee
    const [add30mins, setAdd30mins] = useState(false)
    const [add1hour, setAdd1hour] = useState(false)
    const [add1day, setAdd1day] = useState(false)
    // remindPeriod requestor
    const [add30minsRequestor, setAdd30minsRequestor] = useState(false)
    const [add1hourRequestor, setAdd1hourRequestor] = useState(false)
    const [add1dayRequestor, setAdd1dayRequestor] = useState(false)

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
            <View style={tw`items-center pt-6`}>
                <View style={tw`mb-10 w-5/6`}>
                    <TextInput
                        style={tw`border-b border-gray-400 p-2`}
                        placeholder='Appointment Name (dentist, business meeting)'
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>

                <View style={tw`mb-10 w-5/6`}>
                    <Text style={tw`text-center mb-4`}>Invitee (person with whom appointment)</Text>
                    <TextInput
                        style={tw`border-b border-gray-400 p-2`}
                        placeholder='Name'
                        value={inviteeName}
                        onChangeText={text => setInviteeName(text)}
                    />
                    <TextInput
                        style={tw`border-b border-gray-400 p-2`}
                        placeholder='Phone number'
                        value={inviteePhoneNumber}
                        onChangeText={text => setInviteePhoneNumber(text)}
                    />
                </View>

                <View style={tw`h-32 w-1/2 mb-10`}>
                    <Text style={tw`text-center`}>Date of appointment</Text>
                    <CustomDateTimePicker dateModel={dateModel} onChange={dateModel => setDateModel(dateModel)} />
                </View>

                <View style={tw`mb-10 w-5/6 items-center`}>
                    <Text style={tw`text-center`}>Remind invitee before</Text>
                    <View style={tw`flex-row items-center justify-between w-1/2 mt-4`}>
                        <Text>30 minutes</Text>
                        <Switch
                            value={add30mins}
                            onValueChange={setAdd30mins}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2 my-4`}>
                        <Text>1 hour</Text>
                        <Switch
                            value={add1hour}
                            onValueChange={setAdd1hour}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2`}>
                        <Text>1 day</Text>
                        <Switch
                            value={add1day}
                            onValueChange={setAdd1day}
                        />
                    </View>
                </View>

                <View style={tw`mb-10 w-5/6 items-center`}>
                    <Text style={tw`text-center`}>Remind myself before</Text>
                    <View style={tw`flex-row items-center justify-between w-1/2 mt-4`}>
                        <Text>Same as invitee</Text>
                        <Switch
                            value={sameAsInvitee}
                            onValueChange={setSameAsInvitee}
                        />
                    </View>
                    <View style={tw`h-1 w-full border-b border-gray-300 my-4`}></View>
                    <View style={tw`flex-row items-center justify-between w-1/2`}>
                        <Text>30 minutes</Text>
                        <Switch
                            value={add30minsRequestor}
                            onValueChange={setAdd30minsRequestor}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2 my-4`}>
                        <Text>1 hour</Text>
                        <Switch
                            value={add1hourRequestor}
                            onValueChange={setAdd1hourRequestor}
                        />
                    </View>
                    <View style={tw`flex-row items-center justify-between w-1/2`}>
                        <Text>1 day</Text>
                        <Switch
                            value={add1dayRequestor}
                            onValueChange={setAdd1dayRequestor}
                        />
                    </View>
                </View>

                <View style={tw`mb-10`}>
                    <Button
                        title='Add'
                        onPress={addAppointment}
                    />
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