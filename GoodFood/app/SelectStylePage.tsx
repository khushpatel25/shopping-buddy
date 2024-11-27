import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Import NavigationProp

type RootStackParamList = {
  MoneySaverPage: undefined;
  TimeSaverPage: undefined;
  HealthyShopperPage: undefined;
  NextScreen: undefined;
};

// Define types for the component props
interface CharacterButtonProps {
  text: string;
  icon: ImageSourcePropType;
  style: object;
  onPress: () => void; // Add onPress prop for navigation action
}

const CharacterButton: React.FC<CharacterButtonProps> = ({
  text,
  icon,
  style,
  onPress,
}) => (
  <TouchableOpacity style={[styles.characterButton, style]} onPress={onPress}>
    <Text style={styles.characterText}>{text}</Text>
    <Image source={icon} style={styles.characterIcon} />
  </TouchableOpacity>
);

const SelectStylePage: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with username and profile image */}
      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>Hey Miko,</Text>
        <Text style={styles.subText}>Let's Go Shopping!</Text>
        <Image
          source={{ uri: "https://yourimageurl.com" }} // Replace with actual user profile image
          style={styles.profileImage}
        />
      </View>

      {/* Selection section */}
      <Text style={styles.selectionText}>Pick a style</Text>

      {/* Character buttons */}
      <View style={styles.characterContainer}>
        <CharacterButton
          text="Money Saver"
          icon={require("../assets/images/character1.png")} // Local image asset
          style={styles.character1}
          onPress={() => navigation.navigate("MoneySaverPage")} // Navigate to MoneySaverPage
        />
        <CharacterButton
          text="Time Saver"
          icon={require("../assets/images/character2.jpeg")} // Local image asset
          style={styles.character2}
          onPress={() => navigation.navigate("TimeSaverPage")} // Navigate to HealthyShopperPage
        />
        <CharacterButton
          text="Healthy Shopper"
          icon={require("../assets/images/character3.jpg")} // Local image asset
          style={styles.character3}
          onPress={() => navigation.navigate("HealthyShopperPage")} // Navigate to HealthyShopperPage
        />
      </View>

      {/* Continue button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("NextScreen")} // Replace with actual navigation route
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 18,
    color: "#666",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectionText: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: "bold",
  },
  characterContainer: {
    flexDirection: "column", // Change this to 'column'
    alignItems: "center", // Center items horizontally (optional)
    marginTop: 20,
  },
  characterButton: {
    width: "45%",
    backgroundColor: "#EEE",
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  characterText: {
    fontSize: 16,
    marginBottom: 8,
  },
  characterIcon: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  continueButton: {
    marginTop: 40,
    paddingVertical: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  character1: {
    backgroundColor: "#F0F0F0", // Example styling for Character 1
  },
  character2: {
    backgroundColor: "#E0E0E0", // Example styling for Character 2
  },
  character3: {
    backgroundColor: "#E0E0E0", // Example styling for Character 2
  },
});

export default SelectStylePage;
