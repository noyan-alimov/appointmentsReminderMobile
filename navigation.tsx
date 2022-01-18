import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { NotFoundScreen } from './screens/NotFoundScreen'
import { View, Text } from 'react-native' // to be deleted
import { NavigationContainer } from '@react-navigation/native'

export const Navigation = () => (
    <NavigationContainer>
        <RootNavigator />
    </NavigationContainer>
)

const Stack = createNativeStackNavigator()

const todoScreen = () => <View><Text>TODO</Text></View>

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group>
        <Stack.Screen name='Appointment' component={todoScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='Appointments'
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarShowLabel: false
      }}
    >
      <BottomTab.Screen
        name='Appointments'
        component={todoScreen}
        options={{
          title: 'Appointments',
          tabBarIcon: ({ color }) => <TabBarIcon name="file" color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Add'
        component={todoScreen}
        options={{
          title: 'Add New Appointment',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Profile'
        component={todoScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}