import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles/RegistrationPage"; // Adjust the path if necessary
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/constants/api";
import { storeUserId } from "@/utils/storage";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";


const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const placeholderColor = useThemeColor({}, 'placeholder');
  
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Email and both password fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${api}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      await storeUserId(data.userId)
      // await AsyncStorage.setItem("userId", data.userId);
      // localStorage.setItem("userId", data.userId);

      if (response.ok) {
        Alert.alert("Success", "Registration complete!");
        // Optionally, navigate to the login page
        router.replace("/LoginPage");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up to Shopping Buddy</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={placeholderColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={placeholderColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor={placeholderColor}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/LoginPage")}>
          <Text style={styles.loginLink}>
            Already have an account? <Text style={styles.loginText}>Login</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/ScanHealthy")}>
          <Text style={styles.loginLink}>
            Go to <Text style={styles.loginText}>Scan Bill</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={20} color="black" />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationPage;
