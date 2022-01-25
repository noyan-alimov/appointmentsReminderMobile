import { View, Text, FlatList, ListRenderItemInfo, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Appointment } from '../models'
import tw from 'twrnc'
import { showDate } from '../utils'
import { observer } from 'mobx-react-lite'
import { appointmentStore } from '../stores/AppointmentStore'
import { useEffect } from 'react'

export const AppointmentsScreen = observer(({ navigation }: any) => {
    useEffect(() => {
        appointmentStore.loadAppointments()
    }, [])

    const renderAppointment = ({ item }: ListRenderItemInfo<Appointment>) => {
        const { name, date, invitee } = item
        const { name: inviteeName } = invitee

        const openAppointmentModal = () => {
            appointmentStore.setSelectedAppointment(item)
            navigation.navigate('Appointment')
        }
    
        return (
            <View style={tw`items-center mt-8`}>
                <View style={tw`w-5/6`}>
                    <View style={tw`flex-row justify-between`}>
                        <View>
                            <Text style={tw`text-lg`}>{name}</Text>
                            <Text style={tw`text-lg`}>With {inviteeName}</Text>
                            <Text style={tw`text-base text-gray-500`}>{showDate(date)}</Text>
                        </View>
                        <View style={tw`justify-center`}>
                            <Pressable onPress={openAppointmentModal}>
                                <FontAwesome name='chevron-circle-right' size={40} color={'black'} />
                            </Pressable>
                        </View>
                    </View>
                    <View style={tw`h-1 w-full border-b border-gray-300 my-4`}></View>
                </View>
            </View>
        )
    }

    return (
        <FlatList
            data={appointmentStore.appointments}
            keyExtractor={appointment => appointment.id.toString()}
            renderItem={renderAppointment}
            style={tw`bg-green-50`}
        />
    )
})

