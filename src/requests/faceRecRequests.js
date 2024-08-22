// utils/api.js
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import * as FileSystem from "expo-file-system";

const url = `${API_BASE_URL}/face-recognition`;

export const uploadImageRequest = async (data) => {
  const { image, latitude, longitude, timestamp } = data;
  try {
    // Read the image as a Base64 string
    const photoBase64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });

    // Create a FormData object
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "face.jpg",
      data: photoBase64,
    });

    // Append location data if available
    if (latitude || latitude) {
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
    }

    // Append timestamp
    formData.append("timestamp", timestamp);

    // Send the image to the backend
    const response = await axios.post(`${url}/recognize`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error sending image to backend:", error);
    throw error.response ? error.response.data : error.message;
  }
};
