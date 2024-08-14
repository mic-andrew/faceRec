import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { uploadImage } from "../../requests/faceRecRequests";

const FaceRecognition = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleFacesDetected = async ({ faces }) => {
    setFaces(faces);

    if (faces.length > 0 && cameraRef) {
      const photo = await cameraRef.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
      const photoUri = photo.uri;

      // Send image to backend
      try {
        const result = await uploadImage(photoUri);
        console.log("Recognition result:", result);
      } catch (error) {
        console.error("Error sending image to backend:", error);
      }
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
        ref={(ref) => setCameraRef(ref)}
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
          }}
        />
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
    borderColor: "red",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

export default FaceRecognition;
