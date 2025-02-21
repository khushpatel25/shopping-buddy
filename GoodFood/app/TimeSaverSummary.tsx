import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  useNavigation,
  useRoute,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import BottomNavigation from "./BottomNavigation";

// Define types for navigation
type RootStackParamList = {
  TimeSaverPage: undefined;
  TimeSaverSummary: { timeLimit: string; startTime: string };
  BillScanning: { timeLimit: string; startTime: string };
  MinutesLeaderBoard: undefined;
};

type TimeSaverSummaryNavigationProp = NavigationProp<
  RootStackParamList,
  "TimeSaverSummary",
  "MinutesLeaderBoard"
>;

type TimeSaverSummaryRouteProp = RouteProp<
  RootStackParamList,
  "TimeSaverSummary"
>;

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
        <Text style={styles.title}>Shopping Started</Text>
        <Text style={styles.title}>Want to earn points?</Text>
        <Image
          source={require("../assets/images/timesaverimage.png")}
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
     <BottomNavigation leaderboardNavigate="MinutesLeaderBoard"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  header: {
    backgroundColor: "#53A0FF",
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#DDD",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    paddingVertical: 15,
    borderTopWidth: 2,
    borderTopColor: "#CCC",
    backgroundColor: "#FFFFFF",
  },
  navButton: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 10,
  },
  navText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: "#53A0FF",
  },
});

export default TimeSaverSummary;
