import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/LoginScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import SignupScreen from "./src/screens/auth/Signup";
import Toast from "react-native-toast-message";
import FaceAuthentication from "./src/screens/home/FaceAuthentication";
import EntryScreen from "./src/screens/auth/EntryScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="entry" component={EntryScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="FaceAuthentication"
            component={FaceAuthentication}
          />

          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
