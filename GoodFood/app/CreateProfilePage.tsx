import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles/CreateProfilePage";
import type { PickerProps } from "@react-native-picker/picker";

let Picker: React.ComponentType<PickerProps> | undefined;
if (Platform.OS !== "web") {
  Picker = require("@react-native-picker/picker").Picker;
}

export default function CreateProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [age, setAge] = useState("");
  const [shoppingDays, setShoppingDays] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const router = useRouter();
  const route = useNavigation();
  const { email } = route.params || {}; // Access the email param safely

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setProfileImage(result.uri);
      console.log("Profile image URI set:", result.uri);
    }
  };

  const handleSubmit = async () => {
    if (
      !firstName ||
      gender === "Select Gender" ||
      !height ||
      !weight ||
      !age ||
      !shoppingDays
    ) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);
    const numericAge = parseInt(age);
    const numericShoppingDays = parseInt(shoppingDays);

    if (
      isNaN(numericHeight) ||
      isNaN(numericWeight) ||
      isNaN(numericAge) ||
      isNaN(numericShoppingDays) ||
      numericHeight <= 0 ||
      numericWeight <= 0 ||
      numericAge <= 0 ||
      numericShoppingDays <= 0
    ) {
      Alert.alert(
        "Error",
        "Please enter valid positive numbers for height, weight, age, and shopping days."
      );
      return;
    }

    try {
      const userId = await AsyncStorage.getItem("userId");

      const response = await fetch(
        "http://192.168.2.93:5000/api/users/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            email,
            firstName,
            lastName,
            height: numericHeight,
            weight: numericWeight,
            gender,
            age: numericAge,
            shoppingDays: numericShoppingDays,
            firstTimeLogin: false,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert("Success", "Profile created successfully!");
        router.push("/SelectStylePage");
      } else {
        Alert.alert("Error", data.message || "Profile creation failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating the profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      <Text style={styles.title}>Let's create your shopping buddy profile</Text>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImageUpload}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <FontAwesome name="camera" size={40} color="gray" />
            </View>
          )}
          <View style={styles.editIconContainer}>
            <FontAwesome name="pencil" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="First Name *"
        value={firstName}
        onChangeText={setFirstName}
        accessibilityLabel="First Name"
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name (Optional)"
        value={lastName}
        onChangeText={setLastName}
        accessibilityLabel="Last Name"
      />

      <TextInput
        style={styles.input}
        placeholder="Height (in cms) *"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        accessibilityLabel="Height"
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (in lbs) *"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        accessibilityLabel="Weight"
      />

      <TextInput
        style={styles.input}
        placeholder="Age *"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        accessibilityLabel="Age"
      />

      {Platform.OS === "web" ? (
        <TextInput
          style={styles.input}
          placeholder="Gender *"
          value={gender}
          onChangeText={setGender}
          accessibilityLabel="Gender"
        />
      ) : (
        Picker && (
          <Picker
            selectedValue={gender}
            style={styles.input}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="Select Gender" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
            <Picker.Item label="Prefer not to say" value="Prefer not to say" />
          </Picker>
        )
      )}

      <TextInput
        style={styles.input}
        placeholder="Shopping Days in a Week *"
        value={shoppingDays}
        onChangeText={setShoppingDays}
        keyboardType="numeric"
        accessibilityLabel="Shopping Days"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
