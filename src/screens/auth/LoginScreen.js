import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
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
    <SafeAreaView className="flex-1 bg-indigo-900">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 py-10">
          <TouchableOpacity
            className="mb-8"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>

          <View className="flex-1 justify-center">
            <View className="items-center mb-10">
              <Ionicons name="happy-outline" size={80} color="white" />
              <Text className="text-white text-3xl font-bold mt-4">
                Emotion Sense
              </Text>
              <Text className="text-indigo-200 text-lg mt-2">
                Recognize emotions, understand yourself
              </Text>
            </View>

            <View className="bg-indigo-800 rounded-2xl p-4 mb-4 flex-row items-center">
              <Ionicons
                name="mail-outline"
                size={24}
                color="#94a3b8"
                className="mr-2"
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                className="text-white flex-1 ml-2"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="bg-indigo-800 rounded-2xl p-4 mb-6 flex-row items-center">
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#94a3b8"
                className="mr-2"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                className="text-white flex-1 ml-2"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity
              className="bg-indigo-500 rounded-2xl p-4 items-center mb-4"
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Log in</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-indigo-400 rounded-2xl p-4 items-center"
              onPress={() => navigation.navigate("Signup")}
            >
              <Text className="text-indigo-300 font-bold text-lg">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
