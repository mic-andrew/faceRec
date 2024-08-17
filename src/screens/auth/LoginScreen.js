import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.8;

const FaceLogin = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    setIsFaceDetected(faces.length > 0);
  };

  const recognizeFace = async () => {
    if (cameraRef.current && isFaceDetected) {
      setIsRecognizing(true);
      // Simulating face recognition process
      setTimeout(() => {
        setIsRecognizing(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login Successful!",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        navigation.navigate("Home");
      }, 2000);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="camera-off" size={50} color="#FFD700" />
        <Text style={styles.errorText}>No access to camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#1E1E1E", "#3D3D3D"]} style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="chevron-left" size={30} color="#FFD700" />
      </TouchableOpacity>

      <Text style={styles.title}>Face Login</Text>

      <View style={styles.cameraWrapper}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            type={Camera.Constants.Type.front}
            style={styles.camera}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
          />
        </View>
        <View style={styles.outlineContainer}>
          <View
            style={[
              styles.faceDetectionOutline,
              {
                borderColor: isFaceDetected ? "#FFD700" : "#B8B8B8",
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.textContainer}>
        {isFaceDetected ? (
          <MaterialCommunityIcons
            name="face-recognition"
            size={50}
            color="#FFD700"
          />
        ) : (
          <Text style={styles.noFaceText}>
            Position your face in the circle
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { opacity: isFaceDetected && !isRecognizing ? 1 : 0.5 },
        ]}
        onPress={recognizeFace}
        disabled={!isFaceDetected || isRecognizing}
      >
        {isRecognizing ? (
          <ActivityIndicator color="#1E1E1E" />
        ) : (
          <Text style={styles.buttonText}>Login with Face</Text>
        )}
      </TouchableOpacity>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  loadingText: {
    color: "#B8B8B8",
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  errorText: {
    color: "#B8B8B8",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 30,
    textAlign: "center",
  },
  cameraWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    position: "relative",
  },
  cameraContainer: {
    width: "100%",
    height: "100%",
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  outlineContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  faceDetectionOutline: {
    width: CIRCLE_SIZE - 6,
    height: CIRCLE_SIZE - 6,
    borderRadius: (CIRCLE_SIZE - 6) / 2,
    borderWidth: 3,
    position: "absolute",
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  noFaceText: {
    color: "#B8B8B8",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: "#1E1E1E",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FaceLogin;
