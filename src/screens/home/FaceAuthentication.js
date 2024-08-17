import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

const { width } = Dimensions.get("window");

const FaceAuthentication = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
    if (faces.length > 0) {
      setIsFaceDetected(true);
      setProgress((prevProgress) => Math.min(prevProgress + 0.1, 1));
    } else {
      setIsFaceDetected(false);
      setProgress(0);
    }
  };

  const getCircleStyle = () => ({
    ...styles.faceCircle,
    borderColor: isFaceDetected ? "green" : "red",
    borderWidth: progress * 10, // Adjust this value to control the circle's thickness
  });

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          type={Camera.Constants.Type.front} // Use the front camera
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
        <View style={getCircleStyle()} />
        {!isFaceDetected && (
          <Text style={styles.instructionText}>Put your face in the box</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937", // bg-gray-900
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    width: width * 0.6, // 60% of screen width
    height: width * 0.6, // Make it circular
    borderRadius: (width * 0.6) / 2, // Half of width/height for a circle
    overflow: "hidden",
    backgroundColor: "black", // Black background to fill behind the camera
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  faceCircle: {
    width: "80%", // Smaller circle size
    height: "80%",
    borderRadius: (width * 0.6) / 2,
    position: "absolute",
    borderWidth: 2,
  },
  instructionText: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
});

export default FaceAuthentication;
