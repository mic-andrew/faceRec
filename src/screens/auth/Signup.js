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
import { signupRequest } from "../../requests/authRequests";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Mismatch",
        text2: "Passwords do not match",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await signupRequest(name, email, password);
      console.log("Signup successful:", response);
      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: "Welcome to Emotion Sense!",
      });
      navigation.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: error.message || "An error occurred during signup",
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
                Join Emotion Sense
              </Text>
              <Text className="text-indigo-200 text-lg mt-2">
                Create an account to get started
              </Text>
            </View>

            <View className="bg-indigo-800 rounded-2xl p-4 mb-4 flex-row items-center">
              <Ionicons
                name="person-outline"
                size={24}
                color="#94a3b8"
                className="mr-2"
              />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#94a3b8"
                className="text-white flex-1 ml-2"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
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

            <View className="bg-indigo-800 rounded-2xl p-4 mb-4 flex-row items-center">
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

            <View className="bg-indigo-800 rounded-2xl p-4 mb-6 flex-row items-center">
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#94a3b8"
                className="mr-2"
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                className="text-white flex-1 ml-2"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity
              className="bg-indigo-500 rounded-2xl p-4 items-center mb-4"
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-indigo-400 rounded-2xl p-4 items-center"
              onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-indigo-300 font-bold text-lg">
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
