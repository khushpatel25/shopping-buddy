import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { api } from "@/constants/api";
import { getUserId } from "@/utils/storage";

const AccountDetailsPage: React.FC = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await getUserId();
                if (userId) {
                    const response = await fetch(`${api}/api/users/find-user/${userId}`);
                    const data = await response.json();
                    if (response.ok) {
                        setUserData(data);
                    } else {
                        Alert.alert("Error", "Failed to fetch user data.");
                    }
                }
            } catch (error) {
                Alert.alert("Error", "An error occurred while fetching user data.");
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading user details...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: userData.profileImage || "https://via.placeholder.com/100" }}
                    style={styles.profileImage}
                />
                <Text style={styles.userName}>{userData.firstName} {userData.lastName}</Text>
                <Text style={styles.email}>{userData.email}</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Personal Details</Text>
                <View style={styles.detailRow}><Text style={styles.label}>Age:</Text><Text style={styles.value}>{userData.age}</Text></View>
                <View style={styles.detailRow}><Text style={styles.label}>Gender:</Text><Text style={styles.value}>{userData.gender}</Text></View>
                <View style={styles.detailRow}><Text style={styles.label}>Height:</Text><Text style={styles.value}>{userData.height} cm</Text></View>
                <View style={styles.detailRow}><Text style={styles.label}>Weight:</Text><Text style={styles.value}>{userData.weight} lbs</Text></View>
                <View style={styles.detailRow}><Text style={styles.label}>Shopping Days:</Text><Text style={styles.value}>{userData.shoppingDays}/week</Text></View>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>User Stats</Text>
                <View style={styles.detailRow}><Text style={styles.label}>Coins:</Text><Text style={styles.value}>{userData.points}</Text></View>
                <View style={styles.detailRow}><Text style={styles.label}>Hearts:</Text><Text style={styles.value}>{userData.hearts}</Text></View>
                <View style={styles.detailRow}><Text style={styles.label}>Minutes:</Text><Text style={styles.value}>{userData.minutes}</Text></View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={() => AsyncStorage.clear().then(() => navigation.reset({ index: 0, routes: [{ name: "LoginPage" as never }]}))}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#F0F4F8",
    },
    profileHeader: {
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#800080",
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
        color: "#333",
    },
    email: {
        fontSize: 16,
        color: "#555",
    },
    infoSection: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#444",
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    value: {
        fontSize: 16,
        color: "#333",
    },
    logoutButton: {
        backgroundColor: "#E57373",
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 10,
    },
    logoutText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AccountDetailsPage;
