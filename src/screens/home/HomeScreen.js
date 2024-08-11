import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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

  // write a function below to show toast message

  const commingSoonMessageHandler = () => {
    Toast.show({
      type: "success",
      text1: "Coming Soon",
      text2: "This feature is under development",
    });
  };

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl mb-4">Face Recognition</Text>

      <View className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-white">
          We offer SDKs for face recognition, liveness detection, and ID card
          recognition.
        </Text>
      </View>

      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          className="bg-purple-600 rounded-lg py-2 px-4 w-[48%] flex-row items-center justify-center"
          onPress={commingSoonMessageHandler}
        >
          <Ionicons name="person-add" size={24} color="white" />
          <Text className="text-white text-center ml-2">Enroll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FaceRecognition")}
          className="bg-purple-600 rounded-lg py-2 px-4 w-[48%] flex-row items-center justify-center"
        >
          <Ionicons name="search" size={24} color="white" />
          <Text className="text-white text-center ml-2">Identify</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity
          className="bg-purple-600 rounded-lg py-2 px-4 w-[48%] flex-row items-center justify-center"
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text className="text-white text-center ml-2">Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("About")}
          className="bg-purple-600 rounded-lg py-2 px-4 w-[48%] flex-row items-center justify-center"
        >
          <Ionicons name="information-circle" size={24} color="white" />
          <Text className="text-white text-center ml-2">About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
