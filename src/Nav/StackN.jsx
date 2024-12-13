import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../Screen/Onboarding";
import ProfileScreen from "../Screen/ProfileScreen";
import Login from "../Screen/Login";
import SignUp from "../Screen/SignUp";
import ForgotPassword from "../Screen/ForgotPassword";
import SettingsScreen from "../Screen/SettingScreen";

const Stack = createStackNavigator()

const StackN = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen name="SettingScreen" component={SettingsScreen}/>
    </Stack.Navigator>
  )
}

export default StackN


