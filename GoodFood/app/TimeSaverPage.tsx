import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  TimeSaverPage: undefined;
  TimeSaverSummary: { timeLimit: string; startTime: string };
};
const TimeSaverPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [timeLimit, setTimeLimit] = useState(""); // State to store the time limit input
  const [shoppingStarted, setShoppingStarted] = useState(false); // State to track shopping session
  const [timer, setTimer] = useState(0); // State to track the timer (in seconds)
  const [startTime, setStartTime] = useState(""); // State to store the shopping start time

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
    setTimer(0);
    const getCurrentTime12HrFormat = (): string => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert 24-hour time to 12-hour time
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12 for 12 AM
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours}:${minutesStr} ${ampm}`;
    };

    const currentStartTime = getCurrentTime12HrFormat();
    setStartTime(currentStartTime); // Save the start time
  };

  const handleEndShopping = () => {
    setShoppingStarted(false);
    // Navigate to TimeSaverSummary with timeLimit and startTime as parameters
    navigation.navigate("TimeSaverSummary", { timeLimit, startTime });
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
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Saver</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>How much time will you spend shopping?</Text>
        <Image
          source={require("../assets/images/timesaverimage.png")} // Add a clock image in your assets
          style={styles.clockImage}
        />

        {/* TextInput for the user to enter time limit */}
        <TextInput
          style={styles.timeInput}
          placeholder="Enter time limit in minutes"
          keyboardType="numeric"
          value={timeLimit}
          onChangeText={(text) => setTimeLimit(text)} // Set the entered time limit
        />

        {/* Display time limit value */}
        {timeLimit ? (
          <Text style={styles.timeDisplay}>
            Your time limit: {timeLimit} minutes
          </Text>
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
  timeInput: {
    borderWidth: 2,
    borderColor: "#53A0FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "80%",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  timeDisplay: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#53A0FF",
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
    color: "#53A0FF",
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

export default TimeSaverPage;
