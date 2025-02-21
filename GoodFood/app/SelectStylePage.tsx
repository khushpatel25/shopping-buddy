import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { api } from "@/constants/api";
import { getUserId } from "@/utils/storage";

type RootStackParamList = {
  TimeSaverPage: undefined;
  MoneySaverPage: undefined;
  HealthyShopperSummary: undefined
};

type SelectStylePageNavigationProps = NavigationProp<
  RootStackParamList,
  "TimeSaverPage",
  "MoneySaverPage",
  "HealthyShopperSummary"
  >;

const SelectStylePage: React.FC = () => {
  const navigation = useNavigation<SelectStylePageNavigationProps>();
  const [userName, setUserName] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getUserId();
        if (userId) {
          const response = await fetch(`${api}/api/users/find-user/${userId}`);
          const userData = await response.json();
          if (response.ok) {
            const { firstName, lastName, points, hearts, minutes, profileImage } = userData;
            setUserName(`${firstName} ${lastName}`);
            setPoints(points || 0);
            setHearts(hearts || 0);
            setMinutes(minutes || 0);
            setProfileImage(profileImage || "https://via.placeholder.com/100")
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{userName ? `Hey ${userName},` : "Hey,"}</Text>
        <Text style={styles.headerText}>Let's Go Shopping!</Text>
        <Image source={{ uri: `${profileImage}`}} style={styles.profileImage} />
      </View>

      <Text style={styles.selectionText}>Pick a Style</Text>
      <View style={styles.characterContainer}>
        <TouchableOpacity style={[styles.characterButton, styles.character1]} onPress={() => navigation.navigate("MoneySaverPage")}>
          <Text style={styles.characterText}>Money Saver</Text>
          <Image source={require("../assets/images/character1.png")} style={styles.characterIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.characterButton, styles.character2]} onPress={() => navigation.navigate("TimeSaverPage")}>
          <Text style={styles.characterText}>Time Saver</Text>
          <Image source={require("../assets/images/character2.jpeg")} style={styles.characterIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.characterButton, styles.character3]} onPress={() => navigation.navigate("HealthyShopperSummary")}>
          <Text style={styles.characterText}>Healthy Shopper</Text>
          <Image source={require("../assets/images/character3.jpg")} style={styles.characterIcon} />
        </TouchableOpacity>
      </View>

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
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#D053FF",
  },
  selectionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  characterContainer: {
    alignItems: "center",
  },
  characterButton: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  characterText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  characterIcon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#EAEAEA",
    borderTopWidth: 1,
    borderTopColor: "#CCC",
    marginTop: 10,
  },
  footerItem: {
    alignItems: "center",
  },
  footerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  footerValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D053FF",
    marginTop: 4,
  },
});

export default SelectStylePage;
