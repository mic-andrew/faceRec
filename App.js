import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/LoginScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import SignupScreen from "./src/screens/auth/Signup";
import Toast from "react-native-toast-message";
import AboutScreen from "./src/screens/home/AboutScreen";
import EmotionRecognition from "./src/screens/home/EmotionRecognition";
import EmotionGallery from "./src/screens/home/EmotionGallery";

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
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="EmotionRecognition"
            component={EmotionRecognition}
          />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Gallery" component={EmotionGallery} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
