import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { uploadImageRequest } from "../../requests/faceRecRequests";
import Toast from "react-native-toast-message";

const EmotionRecognition = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
    if (faces.length > 0 && !isFaceDetected) {
      setIsFaceDetected(true);
      timeoutRef.current = setTimeout(() => {
        takePictureAndProcess();
      }, 5000);
    } else if (faces.length === 0) {
      setIsFaceDetected(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  const takePictureAndProcess = async () => {
    if (isProcessing || !cameraRef.current) return;

    setIsProcessing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      const result = await uploadImageRequest(photo.uri);
      console.log("Recognition result:", result);

      Toast.show({
        type: "success",
        text1: "Emotion Recognized",
        text2: `Result: ${JSON.stringify(result)}`,
      });

      setTimeout(() => {
        setIsProcessing(false);
        setIsFaceDetected(false);
      }, 3000);
    } catch (error) {
      console.error("Error processing image:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to process image",
      });
      setIsProcessing(false);
      setIsFaceDetected(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        type={Camera.Constants.Type.front}
        style={styles.camera}
        ref={cameraRef}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      {faces.map((face) => (
        <View
          key={face.faceID}
          style={[
            styles.faceBox,
            {
              top: face.bounds.origin.y,
              left: face.bounds.origin.x,
              width: face.bounds.size.width,
              height: face.bounds.size.height,
              borderColor: isFaceDetected ? "green" : "red",
            },
          ]}
        />
      ))}
      {isProcessing && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  faceBox: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 2,
  },
  spinnerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default EmotionRecognition;
