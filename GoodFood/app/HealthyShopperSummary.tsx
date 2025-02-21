import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import BottomNavigation from "./BottomNavigation";

// Define navigation types
type RootStackParamList = {
  ScanHealthy: undefined;
  HeartsLeaderBoard: undefined
};

type HealthyShopperSummaryNavigationProp = NavigationProp<
  RootStackParamList,
  "ScanHealthy",
  "HeartsLeaderBoard"
>;

const HealthyShopperSummary: React.FC = () => {
  const navigation = useNavigation<HealthyShopperSummaryNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Healthy Shopper</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.noteText}>
          Shopping healthy is rewarding and satisfying!
        </Text>
        <Text style={styles.title}>Want to Earn Hearts from the Basket?</Text>
        <Image
          source={require("../assets/images/healthyshopperbasket.jpg")} // Replace with the correct image path
          style={styles.basketImage}
        />
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate("ScanHealthy")} // Navigate directly to ScanBillScreen
        >
          <Text style={styles.buttonText}>Scan bill</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation leaderboardNavigate="HeartsLeaderBoard"/>
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
  basketImage: {
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

export default HealthyShopperSummary;
