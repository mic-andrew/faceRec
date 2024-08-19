import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { getAllEmotionsRequest } from "../../requests/faceRecRequests";
import { API_BASE_URL } from "../../utils/constants";

const EmotionGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getAllEmotionsRequest();
      setImages(data);
    } catch (err) {
      console.error("Error fetching emotions:", err);
      setError("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderEmotionList = (emotions) => {
    return Object.entries(emotions).map(([emotion, confidence], index) => (
      <Text key={index} style={styles.modalEmotionText}>
        {emotion}: {(confidence * 100).toFixed(2)}%
      </Text>
    ));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  console.log(`${API_BASE_URL}${selectedImage?.imageUrl}`)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Emotion Gallery</Text>
      {images.length === 0 ? (
        <Text style={styles.noImagesText}>No images found.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {images.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.imageContainer}
              onPress={() => setSelectedImage(item)}
            >
              <Image
                source={{ uri: `${API_BASE_URL}${item.imageUrl}` }}
                style={styles.image}
              />
              <Text style={styles.emotionText}>{item.dominantEmotion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: `${API_BASE_URL}${selectedImage?.imageUrl}`,
              }}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Detected Emotions:</Text>
            {selectedImage && renderEmotionList(selectedImage.emotions)}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    padding: 16,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 8,
  },
  imageContainer: {
    width: "45%",
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#374151",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  emotionText: {
    color: "white",
    padding: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  noImagesText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#2C3E50",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalEmotionText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#3498DB",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EmotionGallery;
