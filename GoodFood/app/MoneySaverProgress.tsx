import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import BottomNavigation from "./BottomNavigation";

type RootStackParamList = {
  MoneySaverPage: undefined;
  MoneySaverSummary: { budget: string };
  ScanBillScreen: { budget: string };
  WalletScreen: undefined;
  PointsLeaderBoard: undefined
};

type NavigationPropType = NavigationProp<RootStackParamList, "WalletScreen", "PointsLeaderBoard">;

const MoneySaverProgress: React.FC = () => {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Buddy Progress</Text>
      </View>

      {/* Points Section */}
      <View style={styles.pointsSection}>
        <Text style={styles.pointsTitle}>Points</Text>
        {/* Progress Indicator */}
        <View style={styles.circleContainer}>
          <Text style={styles.pointsText}>120 Coins Left</Text>
        </View>
      </View>

      {/* Congratulations Message */}
      <View style={styles.congratsSection}>
        <Text style={styles.congratsText}>Congratulations!</Text>
        {/* <Image
          source={require("../assets/images/congrats-image.png")} // Replace with the actual image path
          style={styles.congratsImage}
        /> */}
        <Text style={styles.congratsMessage}>
          You are within the budget limit.{"\n"}20 coins added to your wallet.
        </Text>
      </View>

      {/* Wallet Button */}
      <TouchableOpacity
        style={styles.walletButton}
        onPress={() => navigation.navigate("WalletScreen")}
      >
        <Text style={styles.walletButtonText}>Go to My Wallet</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNavigation leaderboardNavigate="PointsLeaderBoard"/>
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
  pointsSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  pointsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: "#53D0FF",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  pointsText: {
    fontSize: 16,
    color: "#555",
  },
  congratsSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  congratsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  congratsImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  congratsMessage: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 20,
  },
  walletButton: {
    backgroundColor: "#D053FF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "center",
    marginVertical: 20,
  },
  walletButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
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

export default MoneySaverProgress;
