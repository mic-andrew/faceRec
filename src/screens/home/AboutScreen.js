import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-6 py-10">
        <TouchableOpacity className="mb-8" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mb-8">
          About Our Project
        </Text>

        <Text className="text-gray-400 mb-6">
          Welcome to our Facial Recognition Final Year Project. Our system
          leverages cutting-edge technology to provide accurate and efficient
          facial recognition capabilities.
        </Text>

        <Text className="text-white text-xl font-semibold mb-4">
          Key Features:
        </Text>

        <View className="mb-6">
          <Text className="text-purple-500 font-semibold mb-2">
            • Face Detection
          </Text>
          <Text className="text-gray-400">
            Accurately locate and isolate faces within images or video streams.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-purple-500 font-semibold mb-2">
            • Face Recognition
          </Text>
          <Text className="text-gray-400">
            Match detected faces against a database of known individuals.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-purple-500 font-semibold mb-2">
            • Liveness Detection
          </Text>
          <Text className="text-gray-400">
            Ensure the system is interacting with a real person, not a photo or
            video.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-purple-500 font-semibold mb-2">
            • ID Card Recognition
          </Text>
          <Text className="text-gray-400">
            Extract and verify information from official identification cards.
          </Text>
        </View>

        <Text className="text-white text-xl font-semibold mb-4">
          Technology Stack:
        </Text>

        <Text className="text-gray-400 mb-6">
          Our project utilizes state-of-the-art machine learning algorithms,
          computer vision techniques, and mobile development frameworks to
          deliver a robust and user-friendly facial recognition solution.
        </Text>

        <Text className="text-white text-xl font-semibold mb-4">Team:</Text>

        <Text className="text-gray-400 mb-6">
          This project is developed by a team of final year computer science
          students passionate about artificial intelligence and its real-world
          applications.
        </Text>

        <TouchableOpacity
          className="bg-purple-600 rounded-lg p-4 items-center mb-20"
          onPress={() => {
            /* Add action for learning more or contacting */
          }}
        >
          <Text className="text-white font-bold">Learn More</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
