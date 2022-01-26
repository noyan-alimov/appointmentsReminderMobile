import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { View, TextInput, Pressable, Text, ActivityIndicator } from 'react-native'
import tw from 'twrnc'
import { authStore } from '../stores/AuthStore'

export const ProfileScreen = observer(() => {
    const userMetadata = authStore.session?.user?.user_metadata

    const [name, setName] = useState(userMetadata?.name || '')
    const [phoneNumber, setPhoneNumber] = useState(userMetadata?.phoneNumber || '')

    const saveProfile = () => {
        authStore.editUserMetadata(name, phoneNumber)
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
        </View>
    )
})