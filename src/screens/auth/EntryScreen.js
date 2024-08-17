import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function EntryScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#1E1E1E", "#3D3D3D"]}
        style={{ flex: 1, padding: 20 }}
      >
        <TouchableOpacity style={{ marginTop: 20 }}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color="#FFD700"
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="face-recognition"
            size={100}
            color="#FFD700"
            style={{ marginBottom: 30 }}
          />

          <Text
            style={{
              color: "#FFD700",
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Secure Face Auth
          </Text>

          <Text
            style={{ color: "#B8B8B8", marginBottom: 40, textAlign: "center" }}
          >
            Advanced Facial Recognition Project
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#FFD700",
              borderRadius: 25,
              paddingVertical: 15,
              paddingHorizontal: 60,
              marginBottom: 20,
            }}
            onPress={() => navigation.navigate("Login")}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#1E1E1E" />
            ) : (
              <Text
                style={{ color: "#1E1E1E", fontWeight: "bold", fontSize: 18 }}
              >
                Log In
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: "#FFD700",
              borderWidth: 2,
              borderRadius: 25,
              paddingVertical: 15,
              paddingHorizontal: 60,
            }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text
              style={{ color: "#FFD700", fontWeight: "bold", fontSize: 18 }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
