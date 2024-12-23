import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ScanBillScreen: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { budget } = route.params as { budget: string };

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access the media library is required!");
      }
    };
    getPermissions();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      handleCameraLaunch();
    } else {
      console.log("Camera permission denied");
    }
  };

  const handleCameraLaunch = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);

      const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
      await MediaLibrary.createAlbumAsync("BillScanner", asset, false);
      console.log("Image saved to user's photos!");
    } else {
      console.log("User cancelled camera");
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      console.log("Image selected from gallery");
    } else {
      console.log("User cancelled image selection");
    }
  };

  const fetchTotalAmount = async () => {
    if (!photo) {
      alert("Please select or take a photo of the bill first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: photo,
        name: "bill.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(
        "http://192.168.2.93:5000/api/extract_total",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fetchedAmount = response.data.total_amount;
      setTotalAmount(fetchedAmount);
      const userId = await AsyncStorage.getItem("userId");
      let pointsChange = 0;

      // Show points popup
      if (fetchedAmount <= parseFloat(budget)) {
        pointsChange = 20;
        Alert.alert(
          "Congratulations!",
          "You spent within your budget! You earned 20 points!",
          [{ text: "OK" }]
        );
      } else {
        pointsChange = -20;
        Alert.alert("Oops!", "You exceeded your budget! You lost 20 points.", [
          { text: "OK" },
        ]);
      }
      await axios.post(
        "http://192.168.2.93:5000/api/users/update-points",
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
      console.error("Error fetching total amount:", error);
      alert("Failed to fetch the total amount. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bill Scanner</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.infoText}>
          You are a Step Away to Earn Piggy Points!
        </Text>
        <Text style={styles.scanText}>Scan Bill</Text>
        <Text style={styles.budgetText}>Your Budget: ${budget}</Text>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.billImage} />
        ) : (
          <Text style={styles.noImageText}>No image selected yet.</Text>
        )}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={requestCameraPermission}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.galleryButton}
          onPress={handleImagePicker}
        >
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>

        {photo && (
          <>
            <TouchableOpacity
              style={styles.fetchButton}
              onPress={fetchTotalAmount}
            >
              <Text style={styles.buttonText}>Fetch Total Amount</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#D053FF" />}
            {totalAmount !== null && (
              <Text style={styles.totalAmountText}>Total: ${totalAmount}</Text>
            )}
          </>
        )}

        <TouchableOpacity style={styles.okButton}>
          <Text style={styles.okButtonText}>Ok</Text>
        </TouchableOpacity>
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
    backgroundColor: "#D053FF",
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
  infoText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  scanText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  billImage: {
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
  budgetText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  fetchButton: {
    backgroundColor: "#53D0FF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  okButton: {
    backgroundColor: "#53D0FF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default ScanBillScreen;
