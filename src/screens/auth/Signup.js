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
import { signupRequest } from "../../requests/authRequests";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
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
      const response = await signupRequest(email, password, firstName);
      console.log("Signup successful:", response);
      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: "Welcome to our app!",
      });
      navigation.navigate("Home");
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
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 py-10">
        <TouchableOpacity className="mb-8" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-1 justify-center">
          <Text className="text-white text-3xl font-bold mb-8">
            Create Account
          </Text>

          <Text className="text-gray-400 mb-6">
            Join us to experience advanced face recognition technology.
          </Text>

          <View className="bg-gray-800 rounded-lg p-4 mb-4">
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#999"
              className="text-white"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

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

          <View className="bg-gray-800 rounded-lg p-4 mb-4">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              className="text-white"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View className="bg-gray-800 rounded-lg p-4 mb-6">
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              className="text-white"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity
            className="bg-purple-600 rounded-lg p-4 items-center mb-4"
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold">Sign up</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-400">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-purple-600 font-bold">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
