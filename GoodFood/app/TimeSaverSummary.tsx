import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";

// Define types for navigation
type RootStackParamList = {
  TimeSaverPage: undefined;
  TimeSaverSummary: { timeLimit: string; startTime: string };
  BillScanning: { timeLimit: string; startTime: string };
};

type TimeSaverSummaryNavigationProp = NavigationProp<
  RootStackParamList,
  "TimeSaverSummary"
>;

type TimeSaverSummaryRouteProp = RouteProp<
  RootStackParamList,
  "TimeSaverSummary"
>;

// Helper function to format time in HH:mm (24-hour) format
const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const TimeSaverSummary: React.FC = () => {
  const navigation = useNavigation<TimeSaverSummaryNavigationProp>();
  const route = useRoute<TimeSaverSummaryRouteProp>();
  const { timeLimit, startTime } = route.params;
  console.log(timeLimit, startTime);
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Saver</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.noteText}>
          Great job shopping with a time limit!
        </Text>
        <Text style={styles.title}>Your Time Limit: {timeLimit} minutes</Text>
        <Text style={styles.title}>
          Shopping Started At: {formatTime(startTime)}
        </Text>
        <Text style={styles.title}>Want to earn points?</Text>
        <Image
          source={require("../assets/images/timesaverimage.png")} // Replace with your clock image
          style={styles.clockImage}
        />
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() =>
            navigation.navigate("BillScanning", { timeLimit, startTime })
          }
        >
          <Text style={styles.buttonText}>Scan Bill</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#53A0FF",
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  clockImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  scanButton: {
    backgroundColor: "#53D0FF",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
  },
  noteText: {
    marginTop: 10,
    fontSize: 14,
    color: "#53A0FF",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#555",
  },
});

export default TimeSaverSummary;
