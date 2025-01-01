// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ImageSourcePropType,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type RootStackParamList = {
//   MoneySaverPage: undefined;
//   TimeSaverPage: undefined;
//   HealthyShopperPage: undefined;
//   NextScreen: undefined;
// };

// // Define types for the component props
// interface CharacterButtonProps {
//   text: string;
//   icon: ImageSourcePropType;
//   style: object;
//   onPress: () => void;
// }

// const CharacterButton: React.FC<CharacterButtonProps> = ({
//   text,
//   icon,
//   style,
//   onPress,
// }) => (
//   <TouchableOpacity style={[styles.characterButton, style]} onPress={onPress}>
//     <Text style={styles.characterText}>{text}</Text>
//     <Image source={icon} style={styles.characterIcon} />
//   </TouchableOpacity>
// );

// const SelectStylePage: React.FC = () => {
//   const navigation = useNavigation();
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = await AsyncStorage.getItem("userId");
//         if (userId) {
//           const response = await fetch(
//             `http://192.168.2.93:5000/api/users/find-user/${userId}`
//           );
//           const userData = await response.json();
//           console.log(userData);
//           if (response.ok) {
//             const { firstName, lastName } = userData;
//             setUserName(`${firstName} ${lastName}`);
//           } else {
//             console.error("Failed to fetch user data:", userData.message);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Header with username and profile image */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.subText}>
//           {userName ? `Hey ${userName},` : "Hey,"}
//         </Text>
//         <Text style={styles.subText}> let's Go Shopping!</Text>
//         <Image
//           source={{ uri: "https://yourimageurl.com" }} // Replace with actual user profile image
//           style={styles.profileImage}
//         />
//       </View>

//       {/* Selection section */}
//       <Text style={styles.selectionText}>Pick a style</Text>

//       {/* Character buttons */}
//       <View style={styles.characterContainer}>
//         <CharacterButton
//           text="Money Saver"
//           icon={require("../assets/images/character1.png")} // Local image asset
//           style={styles.character1}
//           onPress={() => navigation.navigate("MoneySaverPage")}
//         />
//         <CharacterButton
//           text="Time Saver"
//           icon={require("../assets/images/character2.jpeg")} // Local image asset
//           style={styles.character2}
//           onPress={() => navigation.navigate("TimeSaverPage")}
//         />
//         <CharacterButton
//           text="Healthy Shopper"
//           icon={require("../assets/images/character3.jpg")} // Local image asset
//           style={styles.character3}
//           onPress={() => navigation.navigate("HealthyShopperSummary")}
//         />
//       </View>

//       {/* Continue button */}
//       <TouchableOpacity
//         style={styles.continueButton}
//         onPress={() => navigation.navigate("NextScreen")}
//       >
//         <Text style={styles.continueButtonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     padding: 16,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   greetingText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subText: {
//     fontSize: 18,
//     color: "#666",
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   selectionText: {
//     marginTop: 24,
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   characterContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   characterButton: {
//     width: "45%",
//     backgroundColor: "#EEE",
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   characterText: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   characterIcon: {
//     width: 80,
//     height: 80,
//     resizeMode: "contain",
//   },
//   continueButton: {
//     marginTop: 40,
//     paddingVertical: 16,
//     backgroundColor: "#4CAF50",
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   continueButtonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   character1: {
//     backgroundColor: "#F0F0F0",
//   },
//   character2: {
//     backgroundColor: "#E0E0E0",
//   },
//   character3: {
//     backgroundColor: "#E0E0E0",
//   },
// });

// export default SelectStylePage;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  MoneySaverPage: undefined;
  TimeSaverPage: undefined;
  HealthyShopperPage: undefined;
  NextScreen: undefined;
};

interface CharacterButtonProps {
  text: string;
  icon: ImageSourcePropType;
  style: object;
  onPress: () => void;
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
  const [userName, setUserName] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await fetch(
            `http://192.168.2.93:5000/api/users/find-user/${userId}`
          );
          const userData = await response.json();
          console.log(userData);
          if (response.ok) {
            const { firstName, lastName, points, hearts, minutes } = userData;
            setUserName(`${firstName} ${lastName}`);
            setPoints(points || 0);
            setHearts(hearts || 0);
            setMinutes(minutes || 0);
          } else {
            console.error("Failed to fetch user data:", userData.message);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with username and profile image */}
      <View style={styles.headerContainer}>
        <Text style={styles.subText}>
          {userName ? `Hey ${userName},` : "Hey,"}
        </Text>
        <Text style={styles.subText}> let's Go Shopping!</Text>
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
          onPress={() => navigation.navigate("MoneySaverPage")}
        />
        <CharacterButton
          text="Time Saver"
          icon={require("../assets/images/character2.jpeg")} // Local image asset
          style={styles.character2}
          onPress={() => navigation.navigate("TimeSaverPage")}
        />
        <CharacterButton
          text="Healthy Shopper"
          icon={require("../assets/images/character3.jpg")} // Local image asset
          style={styles.character3}
          onPress={() => navigation.navigate("HealthyShopperSummary")}
        />
      </View>

      {/* Footer with coins, hearts, and minutes */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Coins</Text>
          <Text style={styles.footerValue}>{points}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Hearts</Text>
          <Text style={styles.footerValue}>{hearts}</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Minutes</Text>
          <Text style={styles.footerValue}>{minutes}</Text>
        </View>
      </View>
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
    flexDirection: "column",
    alignItems: "center",
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  footerText: {
    fontSize: 16,
    color: "#333",
  },

  footerItem: {
    alignItems: "center",
    flex: 1,
  },
  footerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  footerValue: {
    fontSize: 20,
    color: "#4CAF50",
    marginTop: 4,
  },
});

export default SelectStylePage;
