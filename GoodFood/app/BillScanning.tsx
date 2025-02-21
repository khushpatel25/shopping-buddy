import React, { useState, useEffect, useId } from "react";
import { api } from "@/constants/api";
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
import { getUserId } from "@/utils/storage";

// Define types for navigation
type RootStackParamList = {
  TimeSaverPage: undefined;
  TimeSaverSummary: { timeLimit: string; startTime: string };
  BillScanning: { timeLimit: string; startTime: string };
};

type BillScanningNavigationProp = NavigationProp<
  RootStackParamList,
  "BillScanning"
>;
type BillScanningRouteProp = RouteProp<RootStackParamList, "BillScanning">;

const BillScanning: React.FC = () => {
  const navigation = useNavigation<BillScanningNavigationProp>();
  const route = useRoute<BillScanningRouteProp>();
  const { timeLimit, startTime } = route.params;

  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch userId from AsyncStorage on component mount
  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     const storedUserId = await AsyncStorage.getItem("userId");
  //     setUserId(storedUserId);
  //   };
  //   fetchUserId();
  // }, []);

  const updatePoints = async (pointsChange: number) => {

    const userId = await getUserId();
    console.log({useId})

    try {
      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }
      const response = await axios.post(
        `${api}/api/users/update-minutes/`,
        {
          userId,
          pointsChange,
        }
      );
      console.log("Points updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating points:", error);
      alert("Failed to update points. Please try again.");
    }
  };

  const fetchReceiptTime = async () => {
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
        `${api}/api/extract_time`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const receiptTime = response.data.time;
      console.log("Receipt Time from API:", receiptTime);
      // Compare times and calculate the result
      checkTimeDifference(receiptTime);
    } catch (error) {
      console.error("Error fetching receipt time:", error);
      alert("Failed to fetch the receipt time. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkTimeDifference = async (receiptTime: string) => {
    try {
      const parseTime = (time: string) => {
        const [timeStr, meridian] = time.split(" ");
        const [hours, minutes] = timeStr.split(":").map(Number);
        let adjustedHours = hours;

        // Adjust hours based on AM/PM
        if (meridian === "PM" && hours !== 12) {
          adjustedHours += 12; // Convert PM hours to 24-hour format
        } else if (meridian === "AM" && hours === 12) {
          adjustedHours = 0; // Midnight case (12 AM -> 00:00)
        }

        const now = new Date();
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          adjustedHours,
          minutes
        );
      };

      const start = parseTime(startTime);
      const receipt = parseTime(receiptTime);

      const timeDifference =
        Math.abs(receipt.getTime() - start.getTime()) / 60000; // Difference in minutes

      console.log("Time Difference (minutes):", timeDifference);

      if (timeDifference <= parseFloat(timeLimit)) {
        await updatePoints(20); // Add 20 points for success
        Alert.alert(
          "Congratulations!",
          `You won 20 points! The time difference was ${timeDifference.toFixed(
            2
          )} minutes.`
        );
      } else {
        await updatePoints(-20); // Deduct 20 points for failure
        Alert.alert(
          "Better Luck Next Time!",
          `You lost 20 points!
          Start Time: ${startTime}
          Parsed Start Time: ${start.toLocaleTimeString()}
          Receipt Time: ${receiptTime}
          Parsed Receipt Time: ${receipt.toLocaleTimeString()}
          Time Difference: ${timeDifference.toFixed(2)} minutes.`
        );
      }
    } catch (error) {
      console.error("Error comparing times:", error);
      alert("Failed to compare times. Please check your inputs.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bill Scanner</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.infoText}>
          Your Time Limit: {timeLimit} minutes
        </Text>
        <Text style={styles.infoText}>Shopping Started At: {startTime}</Text>

        {photo ? (
          <Image source={{ uri: photo }} style={styles.billImage} />
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
              onPress={fetchReceiptTime}
            >
              <Text style={styles.buttonText}>Fetch and Compare Time</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#D053FF" />}
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

export default BillScanning;
