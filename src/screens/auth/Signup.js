import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.8;

const FaceSignup = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (isFaceDetected) {
      Animated.timing(progressAnimation, {
        toValue: 100,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          takePicture();
        }
      });
    } else {
      progressAnimation.setValue(0);
    }
  }, [isFaceDetected]);

  useEffect(() => {
    const listener = progressAnimation.addListener(({ value }) => {
      setProgress(Math.floor(value));
    });
    return () => progressAnimation.removeListener(listener);
  }, []);

  const handleFacesDetected = ({ faces }) => {
    setIsFaceDetected(faces.length > 0);
  };

  const takePicture = async () => {
    if (cameraRef.current && progress === 100) {
      const photo = await cameraRef.current.takePictureAsync();
      await storeFace(photo.uri);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Face successfully enrolled!",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setTimeout(() => {
        navigation.navigate("Home");
      }, 2000);
    }
  };

  const storeFace = async (uri) => {
    try {
      const storedFaces = await AsyncStorage.getItem("storedFaces");
      const faces = storedFaces ? JSON.parse(storedFaces) : [];
      faces.push(uri);
      await AsyncStorage.setItem("storedFaces", JSON.stringify(faces));
    } catch (error) {
      console.error("Error storing face:", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.errorText}>No access to camera</Text>;
  }

  return (
    <LinearGradient colors={["#1E1E1E", "#3D3D3D"]} style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="chevron-left" size={30} color="#FFD700" />
      </TouchableOpacity>

      <Text style={styles.title}>Enroll Face</Text>

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
        <View style={styles.overlayContainer}>
          <Animated.View
            style={[
              styles.progressCircle,
              {
                borderColor: isFaceDetected ? "#FFD700" : "#B8B8B8",
                transform: [
                  {
                    rotate: progressAnimation.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>

      <Text style={styles.progressText}>
        {isFaceDetected ? `${progress}%` : "0%"}
      </Text>

      <Text style={styles.instructionText}>
        {isFaceDetected
          ? "Hold still, enrolling your face..."
          : "Position your face in the circle"}
      </Text>

      <TouchableOpacity
        style={[styles.button, { opacity: progress === 100 ? 1 : 0.5 }]}
        onPress={takePicture}
        disabled={progress !== 100}
      >
        <Text style={styles.buttonText}>Enroll Face</Text>
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
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 3,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    position: "absolute",
  },
  progressText: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  instructionText: {
    color: "#B8B8B8",
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
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
  errorText: {
    color: "#FFD700",
    fontSize: 18,
    textAlign: "center",
  },
});

export default FaceSignup;
