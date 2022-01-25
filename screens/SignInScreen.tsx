import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import { View, TextInput, Text, Pressable, Button, ActivityIndicator } from 'react-native'
import tw from 'twrnc'

import { authStore } from '../store/AuthStore'

const Stack = createNativeStackNavigator()

export const SignInScreen = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='SignIn' component={SignIn} options={{ title: 'Sign In' }} />
                <Stack.Screen name='SignUp' component={SignUp} options={{ title: 'Sign Up' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const SignIn = observer((props: any) => {
    const goToSignUp = () => {
        props.navigation.navigate('SignUp')
    }

    return (
        <View style={tw`h-full justify-center items-center bg-green-50 `}>
            <View style={tw`w-11/12`}>
                <TextInput
                    value={authStore.email}
                    onChangeText={authStore.setEmail}
                    placeholder='Email'
                    autoCapitalize='none'
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <TextInput
                    value={authStore.password}
                    onChangeText={authStore.setPassword}
                    placeholder='Password'
                    secureTextEntry
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <View style={tw`mt-20 w-full items-center`}>
                    {authStore.isSignInLoading ? (
                        <ActivityIndicator size='large' />
                    ) : (
                        <>
                        <Pressable style={tw`bg-black py-4 w-1/2 rounded-md`} onPress={authStore.signIn}>
                            <Text style={tw`text-white font-bold text-xl text-center`}>
                                Sign In
                            </Text>
                        </Pressable>
                        <Text style={tw`text-base mt-10`}>Don't have an account?</Text>
                        <Button title='Sign Up here' onPress={goToSignUp} />
                        </>
                    )}
                </View>
            </View>
        </View>
    )
})

const SignUp = observer(() => {
    return (
        <View style={tw`h-full justify-center items-center bg-green-50 `}>
            <View style={tw`w-11/12`}>
                <TextInput
                    value={authStore.name}
                    onChangeText={authStore.setName}
                    placeholder='Name'
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <TextInput
                    value={authStore.phoneNumber}
                    onChangeText={authStore.setPhoneNumber}
                    placeholder='Phone number'
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <TextInput
                    value={authStore.email}
                    onChangeText={authStore.setEmail}
                    placeholder='Email'
                    autoCapitalize='none'
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <TextInput
                    value={authStore.password}
                    onChangeText={authStore.setPassword}
                    placeholder='Password'
                    secureTextEntry
                    style={tw`border-b border-gray-400 p-2 text-base`}
                />
                <View style={tw`mt-20 w-full items-center`}>
                    {authStore.isSignUpLoading ? (
                        <ActivityIndicator size='large' />
                    ) : (
                        <Pressable style={tw`bg-black py-4 w-1/2 rounded-md`} onPress={authStore.signUp}>
                            <Text style={tw`text-white font-bold text-xl text-center`}>
                                Sign Up
                            </Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </View>
    )
})