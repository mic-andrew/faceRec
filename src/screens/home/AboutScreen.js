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
    <SafeAreaView className="flex-1 bg-indigo-900">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-6 py-10">
        <TouchableOpacity className="mb-8" onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mb-8">
          About Emotion Insight
        </Text>

        <Text className="text-indigo-200 mb-6">
          Welcome to Emotion Insight, an advanced emotion recognition project.
          Our system uses cutting-edge AI technology to analyze facial
          expressions and identify emotions in real-time.
        </Text>

        <Text className="text-white text-xl font-semibold mb-4">
          Key Features:
        </Text>

        <View className="mb-6">
          <Text className="text-indigo-300 font-semibold mb-2">
            • Real-time Emotion Detection
          </Text>
          <Text className="text-indigo-200">
            Instantly analyze facial expressions to identify emotions.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-indigo-300 font-semibold mb-2">
            • Multi-emotion Recognition
          </Text>
          <Text className="text-indigo-200">
            Detect a wide range of emotions including joy, sadness, anger,
            surprise, and more.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-indigo-300 font-semibold mb-2">
            • Emotion History Tracking
          </Text>
          <Text className="text-indigo-200">
            Keep a record of detected emotions over time for personal insights.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-indigo-300 font-semibold mb-2">
            • User-friendly Interface
          </Text>
          <Text className="text-indigo-200">
            Easy-to-use mobile application for seamless emotion recognition.
          </Text>
        </View>

        <Text className="text-white text-xl font-semibold mb-4">
          Technology Stack:
        </Text>

        <Text className="text-indigo-200 mb-6">
          Our project utilizes state-of-the-art machine learning algorithms,
          computer vision techniques, and React Native for a robust and
          user-friendly emotion recognition solution.
        </Text>

        <Text className="text-white text-xl font-semibold mb-4">Team:</Text>

        <Text className="text-indigo-200 mb-6">
          Developed by a team of final year computer science students passionate
          about AI and its applications in understanding human emotions.
        </Text>

        <TouchableOpacity
          className="bg-indigo-500 rounded-lg p-4 items-center mb-20"
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
