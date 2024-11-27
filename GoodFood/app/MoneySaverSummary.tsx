// Import necessary modules
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";

// Define types for navigation
type RootStackParamList = {
  MoneySaverPage: undefined;
  MoneySaverSummary: { budget: string };
  ScanBillScreen: { budget: string }; // Add ScanBillScreen to the route parameters
};

type RouteParams = {
  budget: string;
};
type MoneySaverSummaryNavigationProp = NavigationProp<
  RootStackParamList,
  "MoneySaverSummary"
>;

const MoneySaverSummary: React.FC = () => {
  const navigation = useNavigation<MoneySaverSummaryNavigationProp>();
  const route = useRoute();
  const { budget } = route.params as RouteParams;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Money Saver</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.noteText}>
          Uhhh, I know it was tough to shop with a budget!!
        </Text>
        <Text style={styles.title}>Your Budget: ${budget}</Text>
        {/* Display the budget here */}
        <Text style={styles.title}>Want to Earn Points from Piggy?</Text>
        <Image
          source={require("../assets/images/moneysaverpig.jpg")}
          style={styles.piggyImage}
        />
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate("ScanBillScreen", { budget })} // Navigate on button press
        >
          <Text style={styles.buttonText}>Scan bill</Text>
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  piggyImage: {
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
    color: "#D053FF",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center align the text
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

export default MoneySaverSummary;
