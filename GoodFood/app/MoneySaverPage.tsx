import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import BottomNavigation from "./BottomNavigation";


type RootStackParamList = {
  MoneySaverPage: undefined;
  MoneySaverSummary: { budget: string };
  PointsLeaderBoard: undefined
};

type MoneySaverPageNavigationProps = NavigationProp<
  RootStackParamList,
  "PointsLeaderBoard"
  >;
const MoneySaverPage: React.FC = () => {

  const navigation = useNavigation<MoneySaverPageNavigationProps>();
  
  const placeholderColor = useThemeColor({}, 'placeholder');
  
  const [budget, setBudget] = useState(""); // State to store the budget input
  const [shoppingStarted, setShoppingStarted] = useState(false); // State to track shopping session
  const [timer, setTimer] = useState(0); // State to track the timer (in seconds)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    // If shopping started, start the timer
    if (shoppingStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000); // Increment the timer by 1 second
    }

    // Clean up the interval when shopping stops or component unmounts
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [shoppingStarted]);

  const handleStartShopping = () => {
    setShoppingStarted(true);
    setTimer(0); // Reset the timer to 0 when starting
  };

  const handleEndShopping = () => {
    setShoppingStarted(false);
    // Navigate directly to MoneySaverSummary without showing an alert
    navigation.navigate("MoneySaverSummary", { budget });
  };

  // Convert timer seconds to hh:mm:ss format
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Money Saver</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>How much is your budget for the day?</Text>
        <Image
          source={require("../assets/images/moneysaverpig.jpg")} // Add a piggy bank image in your assets
          style={styles.piggyImage}
        />

        {/* TextInput for the user to enter budget */}
        <TextInput
          style={styles.budgetInput}
          placeholder="Enter your budget"
          keyboardType="numeric"
            value={budget}
            placeholderTextColor={placeholderColor}
          onChangeText={(text) => setBudget(text)} // Set the entered budget
        />

        {/* Display budget value */}
        {budget ? (
          <Text style={styles.budgetDisplay}>Your budget: ${budget}</Text>
        ) : null}

        {/* Timer Display */}
        {shoppingStarted && (
          <Text style={styles.timerText}>
            Shopping Time: {formatTime(timer)}
          </Text>
        )}

        {/* Start Shopping Button */}
        <TouchableOpacity
          style={[styles.startButton, shoppingStarted && styles.disabledButton]} // Disable button when shopping has started
          onPress={handleStartShopping}
          disabled={shoppingStarted} // Disable button if shopping has started
        >
          <Text style={styles.buttonText}>Start Shopping</Text>
        </TouchableOpacity>

        {/* End Shopping Button */}
        <TouchableOpacity style={styles.endButton} onPress={handleEndShopping}>
          <Text style={styles.buttonText}>End Shopping</Text>
        </TouchableOpacity>

        {/* Note displayed when shopping starts */}
        {shoppingStarted && (
          <Text style={styles.noteText}>
            Click on "End Shopping" to upload the receipt and earn points.
          </Text>
        )}
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation leaderboardNavigate="PointsLeaderBoard"/>
      </View>
      </TouchableWithoutFeedback>
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
  budgetInput: {
    borderWidth: 2,
    borderColor: "#D053FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "80%",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  budgetDisplay: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D053FF",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#CCC",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
  },
  endButton: {
    backgroundColor: "#E57373",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: "#888", // Change the button color when disabled
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  noteText: {
    marginTop: 10,
    fontSize: 14,
    color: "#D053FF",
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

export default MoneySaverPage;
