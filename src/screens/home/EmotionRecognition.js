import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

const EmotionRecognition = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  const [faceTimers, setFaceTimers] = useState({});

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    const newFaceTimers = { ...faceTimers };

    faces.forEach((face) => {
      if (!faceTimers[face.faceID]) {
        // Start a timer for the face
        newFaceTimers[face.faceID] = setTimeout(() => {
          setFaceTimers((prevTimers) => ({
            ...prevTimers,
            [face.faceID]: "showLabel", // Mark this face to show the label
          }));
        }, 7000); // 7 seconds
      }
    });

    setFaces(faces);
    setFaceTimers(newFaceTimers);
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
      {faces.map((face) => (
        <View
          key={face.faceID}
          style={{
            ...styles.faceBox,
            top: face.bounds.origin.y,
            left: face.bounds.origin.x,
            width: face.bounds.size.width,
            height: face.bounds.size.height,
            borderColor:
              faceTimers[face.faceID] === "showLabel" ? "green" : "red",
          }}
        >
          <Text style={styles.faceLabel}>
            {faceTimers[face.faceID] === "showLabel" ? "Happy" : "Unknown"}
          </Text>
        </View>
      ))}
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  faceLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: 2,
    borderRadius: 3,
    textAlign: "center",
    width: "100%",
  },
});

export default EmotionRecognition;
