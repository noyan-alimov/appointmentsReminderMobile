import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { View, TextInput, Pressable, Text, ActivityIndicator, Alert } from 'react-native'
import tw from 'twrnc'
import { TimezoneSelect } from '../components/TimezoneSelect'
import { TimezoneType } from '../models'
import { authStore } from '../stores/AuthStore'
import { parsePhoneNumber, validatePhoneNumber } from '../utils'

export const ProfileScreen = observer(() => {
    const userMetadata = authStore.session?.user?.user_metadata

    const [name, setName] = useState(userMetadata?.name || '')
    const [phoneNumber, setPhoneNumber] = useState(userMetadata?.phoneNumber || '')
    const [timezone, setTimezone] = useState<TimezoneType>(userMetadata?.timezone || null)

    const saveProfile = () => {
        const parsedPhoneNumber = parsePhoneNumber(phoneNumber)
        try {
            validatePhoneNumber(parsedPhoneNumber)
        } catch (error) {
            Alert.alert('Invalid phone number')
            return
        }
        authStore.editUserMetadata(name, phoneNumber, timezone)
    }

    return (
        <View style={tw`h-full bg-green-50 items-center pt-6`}>
            <View style={tw`w-11/12`}>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder='Name'
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    placeholder='Phone number'
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <TimezoneSelect value={timezone} handleTimezoneChange={setTimezone} />
            </View>
            <View style={tw`pt-20 w-full items-center`}>
                {authStore.isUpdateUserMetadataLoading ? (
                    <ActivityIndicator size='large' />
                ) : (
                    <Pressable style={tw`bg-black py-4 w-1/2 rounded-md`} onPress={saveProfile}>
                        <Text style={tw`text-white font-bold text-xl text-center`}>Save</Text>
                    </Pressable>
                )}
            </View>
            <View style={tw`h-1/2 w-full justify-end items-center`}>
                {authStore.isSignOutLoading ? (
                    <ActivityIndicator size='large' />
                ): (
                    <Pressable style={tw`bg-green-100 py-4 w-1/2 rounded-md`} onPress={authStore.signOut}>
                        <Text style={tw`text-black font-bold text-xl text-center`}>Sign Out</Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
})