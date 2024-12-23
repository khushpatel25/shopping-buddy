import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// Define types for navigation
type RootStackParamList = {
  HealthyShopperSummary: undefined;
  ScanHealthy: undefined;
};

type ScanHealthyNavigationProp = NavigationProp<
  RootStackParamList,
  "ScanHealthy"
>;

type ScanHealthyRouteProp = RouteProp<RootStackParamList, "ScanHealthy">;

const ScanHealthy: React.FC = () => {
  const navigation = useNavigation<ScanHealthyNavigationProp>();
  const route = useRoute<ScanHealthyRouteProp>();

  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProductHealthiness = async () => {
    if (!photo) {
      alert("Please select or take a photo of the receipt first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: photo,
        name: "receipt.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(
        "http://192.168.2.93:5000/api/check_healthy",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const status = response.data.status;
      console.log("Healthiness Status from API:", status);
      const userId = await AsyncStorage.getItem("userId");
      let pointsChange = 0;
      if (status === "healthy") {
        pointsChange = 20;
        Alert.alert(
          "Healthiness Status",
          "Healthy! 20 hearts have been added to your profile.",
          [{ text: "OK" }]
        );
      } else if (status === "unhealthy") {
        pointsChange = -20;
        Alert.alert(
          "Healthiness Status",
          "Unhealthy! 20 hearts have been deducted from your profile.",
          [{ text: "OK" }]
        );
      } else {
        alert("Unexpected status received from API.");
      }
      await axios.post(
        "http://192.168.2.93:5000/api/users/update-hearts",
        {
          userId,
          pointsChange,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error fetching healthiness status:", error);
      alert("Failed to analyze the receipt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan Healthy</Text>
      </View>

      <View style={styles.content}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.receiptImage} />
        ) : (
          <Text style={styles.noImageText}>No image selected yet.</Text>
        )}

        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => {
            ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            }).then((result) => {
              if (!result.canceled) {
                setPhoto(result.assets[0].uri);
              }
            });
          }}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.galleryButton}
          onPress={() => {
            ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            }).then((result) => {
              if (!result.canceled) {
                setPhoto(result.assets[0].uri);
              }
            });
          }}
        >
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>

        {photo && (
          <>
            <TouchableOpacity
              style={styles.fetchButton}
              onPress={fetchProductHealthiness}
            >
              <Text style={styles.buttonText}>Fetch and Analyze</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#53D0FF" />}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#53D0FF",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  receiptImage: {
    width: 300,
    height: 400,
    resizeMode: "contain",
    marginBottom: 20,
  },
  noImageText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  cameraButton: {
    backgroundColor: "#53D0FF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  galleryButton: {
    backgroundColor: "#FFB347",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  fetchButton: {
    backgroundColor: "#53D0FF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default ScanHealthy;
