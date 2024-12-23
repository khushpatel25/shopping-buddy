import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./styles/LoginPage"; // Adjust the path if necessary
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    try {
      // Make a POST request to login endpoint
      const response = await fetch("http://192.168.2.93:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        // Check if the user is logging in for the first time based on the flag from the backend
        if (data.firstTimeLogin) {
          Alert.alert(
            "Welcome",
            "First-time login! Please complete your profile."
          );
          await AsyncStorage.setItem("userId", data.userId);
          console.log(data.userId);
          // Navigate to CreateProfilePage and pass email
          router.push("/CreateProfilePage");
        } else {
          console.log("at 41");
          Alert.alert("Success", "Login successful!");
          console.log("at 43");

          // Navigate to home page for returning users
          router.replace("/SelectStylePage");
        }
      } else {
        Alert.alert("Error", data.message || "Login failed.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Shopping Buddy</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/RegistrationPage")}>
        <Text style={styles.signupLink}>
          Don't have an account? <Text style={styles.signupText}>Signup</Text>
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
  );
}
