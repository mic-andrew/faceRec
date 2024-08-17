import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const FeatureCard = ({ icon, title, description }) => (
  <View style={styles.card}>
    <MaterialCommunityIcons name={icon} size={40} color="#FFD700" />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export default function Home({ navigation }) {
  const showToast = () => {
    Toast.show({
      type: "info",
      position: "top",
      text1: "Comming Soon",
      text2: " This feature is not available yet",
      visibilityTime: 3000,
      autoHide: true,
    });
  };
  return (
    <LinearGradient colors={["#1E1E1E", "#3D3D3D"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="face-recognition"
            size={60}
            color="#FFD700"
          />
          <Text style={styles.title}>Secure Face Auth</Text>
        </View>

        <Text style={styles.subtitle}>
          Welcome to the Future of Authentication
        </Text>

        <Text style={styles.description}>
          Our cutting-edge facial recognition system provides a seamless and
          secure way to authenticate users. Leverage the power of AI and
          computer vision to enhance your application's security.
        </Text>

        <View style={styles.featuresContainer}>
          <FeatureCard
            icon="shield-check"
            title="Enhanced Security"
            description="Biometric authentication adds an extra layer of protection to your app."
          />
          <FeatureCard
            icon="lightning-bolt"
            title="Fast & Efficient"
            description="Quick authentication process for a smooth user experience."
          />
          <FeatureCard
            icon="cog"
            title="Easy Integration"
            description="Simple API for seamless integration into your existing systems."
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={showToast}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFD700",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#B8B8B8",
    textAlign: "center",
    marginBottom: 30,
  },
  featuresContainer: {
    width: "100%",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 10,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#B8B8B8",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#1E1E1E",
    fontSize: 18,
    fontWeight: "bold",
  },
});
