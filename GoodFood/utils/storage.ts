import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores the user ID in AsyncStorage
 * @param userId - The user ID to be stored (string)
 */
export const storeUserId = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('user_id', userId);
    console.log("User ID saved successfully!");
  } catch (error) {
    console.error("Error saving user ID:", error);
  }
};

/**
 * Retrieves the user ID from AsyncStorage
 * @returns A promise that resolves to the stored user ID or null if not found
 */
export const getUserId = async (): Promise<string | null> => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    return userId; // Returns null if not found
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return null;
  }
};

/**
 * Removes the user ID from AsyncStorage
 */
export const removeUserId = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('user_id');
    console.log("User ID removed!");
  } catch (error) {
    console.error("Error removing user ID:", error);
  }
};
