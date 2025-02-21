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
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles/CreateProfilePage";
import { Picker } from "@react-native-picker/picker";
import { api } from "@/constants/api";
import { useThemeColor } from "@/hooks/useThemeColor";
import { uriToBlob } from "@/utils/uriToBlob";
import { getUserId } from "@/utils/storage";

export default function CreateProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [age, setAge] = useState("");
  const [shoppingDays, setShoppingDays] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const placeholderColor = useThemeColor({}, "placeholder");

  let number = 1;

  const router = useRouter();
  const route = useNavigation();
  const { email } = route.params || {};

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);

      const localUri = result.assets[0].uri;
      const filename = `profile-${Date.now()}.jpg`;

      const formData = new FormData();
      formData.append("image", {
        uri: localUri,
        name: filename,
        type: "image/jpeg",
      } as any);

      try {
        console.log("Uploading image to server...");
        const response = await fetch(`${api}/api/auth/upload-image`, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = await response.json();
        console.log("Server Response:", data);

        if (data.imageUrl) {
          setProfileImage(data.imageUrl);
          console.log("Image uploaded successfully:", data.imageUrl);
        } else {
          Alert.alert("Upload Failed", "Could not upload image.");
        }
      } catch (error) {
        console.error("Upload Error:", error);
        Alert.alert("Upload Failed", "An error occurred while uploading.");
      }
    }
  }


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
      const userId = await getUserId();

      console.log({userId})

      const response = await fetch(`${api}/api/users/update-profile`, {
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
          profileImage
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert("Success", "Profile created successfully!");
        router.replace("/SelectStylePage");
      } else {
        Alert.alert("Error", data.message || "Profile creation failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating the profile.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Create Profile</Text>
            <Text style={styles.title}>
              Let's create your shopping buddy profile
            </Text>

            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={handleImageUpload}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.profileImage}
                  />
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
              placeholderTextColor={placeholderColor}
              accessibilityLabel="First Name"
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name (Optional)"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={placeholderColor}
              accessibilityLabel="Last Name"
            />

            <TextInput
              style={styles.input}
              placeholder="Height (in cms) *"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              placeholderTextColor={placeholderColor}
              accessibilityLabel="Height"
            />

            <TextInput
              style={styles.input}
              placeholder="Weight (in lbs) *"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholderTextColor={placeholderColor}
              accessibilityLabel="Weight"
            />

            <TextInput
              style={[styles.input, { zIndex: 1 }]}
              placeholder="Age *"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholderTextColor={placeholderColor}
              accessibilityLabel="Age"
            />

            <Picker
              selectedValue={gender}
              style={styles.picker}
              onValueChange={(itemValue) => setGender(itemValue)}
              mode="dropdown"
              dropdownIconColor="#800080"
            >
              <Picker.Item label="Select Gender" value="Select Gender" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
              <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Shopping Days in a Week *"
              value={shoppingDays}
              placeholderTextColor={placeholderColor}
              onChangeText={setShoppingDays}
              keyboardType="numeric"
              accessibilityLabel="Shopping Days"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

