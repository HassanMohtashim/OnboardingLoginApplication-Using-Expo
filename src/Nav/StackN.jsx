import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../Screen/Onboarding";
import Home from "../Screen/Home";
import Login from "../Screen/Login";
import SignUp from "../Screen/SignUp";
import ForgotPassword from "../Screen/ForgotPassword";

const Stack = createStackNavigator()

const StackN = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
    </Stack.Navigator>
  )
}

export default StackN


