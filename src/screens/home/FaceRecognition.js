import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { uploadImageRequest } from "../../requests/faceRecRequests";
import Toast from "react-native-toast-message";

const FaceRecognition = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faces, setFaces] = useState([]);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    setIsFaceDetected(faces.length > 0);

    if (faces.length > 0 && !isProcessing) {
      takePictureAndProcess();
    }
  };

  const takePictureAndProcess = async () => {
    if (isProcessing || !cameraRef.current) return;

    setIsProcessing(true);
    setIsModalVisible(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      const result = await uploadImageRequest(photo.uri);
      console.log("Recognition result:", result);

      setIsModalVisible(false);

      Toast.show({
        type: "success",
        text1: "Face Recognized",
        text2: `Result: ${JSON.stringify(result)}`,
      });

      timeoutRef.current = setTimeout(() => {
        setIsProcessing(false);
      }, 10000);
    } catch (error) {
      console.error("Error processing image:", error);
      setIsModalVisible(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to process image",
      });
      setIsProcessing(false);
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
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.modalText}>Processing image...</Text>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default FaceRecognition;
