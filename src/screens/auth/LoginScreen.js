import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { loginRequest } from "../../requests/authRequests";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginRequest(email, password);
      console.log("Login successful:", response);
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });
      navigation.navigate("Home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "An error occurred during login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 py-10">
        <TouchableOpacity className="mb-8">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-1 justify-center">
          <Text className="text-white text-3xl font-bold mb-8">
            Face Recognition
          </Text>

          <Text className="text-gray-400 mb-6">
           Final Project For Facial Recognition
          </Text>

          <View className="bg-gray-800 rounded-lg p-4 mb-4">
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              className="text-white"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="bg-gray-800 rounded-lg p-4 mb-6">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              className="text-white"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className="bg-purple-600 rounded-lg p-4 items-center mb-4"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold">Log in</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-purple-600 rounded-lg p-4 items-center"
            onPress={() => navigation.navigate("Signup")}
          >
            <Text className="text-purple-600 font-bold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
