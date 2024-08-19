import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const commingSoonMessageHandler = () => {
    Toast.show({
      type: "info",
      text1: "Coming Soon",
      text2: "This feature is under development",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-indigo-900">
      <ScrollView className="flex-1 px-6 py-10">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-white text-3xl font-bold">Emotion Insight</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View className="bg-indigo-800 rounded-2xl p-6 mb-8">
          <Text className="text-white text-lg mb-2">
            Welcome to Emotion Insight
          </Text>
          <Text className="text-indigo-200">
            Analyze and understand emotions through facial expressions. Our
            advanced AI helps you gain deeper insights into emotional states.
          </Text>
        </View>

        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("EmotionRecognition")}
            className="bg-indigo-500 rounded-2xl p-4 flex-row items-center"
          >
            <Ionicons
              name="scan-outline"
              size={24}
              color="white"
              className="mr-4"
            />
            <Text className="ml-4 text-white text-lg font-semibold">
              Analyze Emotion
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Gallery")}
            className="bg-indigo-500 rounded-2xl p-4 flex-row items-center"
          >
            <Ionicons
              name="images-outline"
              size={24}
              color="white"
              className="mr-4"
            />
            <Text className="ml-4 text-white text-lg font-semibold">
              View Images
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={commingSoonMessageHandler}
            className="bg-indigo-500 rounded-2xl p-4 flex-row items-center"
          >
            <Ionicons
              name="stats-chart-outline"
              size={24}
              color="white"
              className="mr-4"
            />
            <Text className="ml-4 text-white text-lg font-semibold">
              Emotion History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("About")}
            className="bg-indigo-500 rounded-2xl p-4 flex-row items-center"
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="white"
              className="mr-4"
            />
            <Text className="ml-4 text-white text-lg font-semibold">About</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
