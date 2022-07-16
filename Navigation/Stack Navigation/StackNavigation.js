import React from 'react'
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Login from '../../Screens/Login/Login';
import SignUp from '../../Screens/Sign up/SignUp';
import Dashboard from '../../Screens/Dashboard/Dashboard';
import NeedyForm from '../../Screens/NeedyForm.js/NeedyForm';
import PendingScr from '../../Screens/PendingScr/PendingScr';

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false
                  }}
                >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="NeedyForm" component={NeedyForm} />
                <Stack.Screen name="PendingScr" component={PendingScr} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation
