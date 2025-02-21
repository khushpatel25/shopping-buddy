import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
    useNavigation,
} from "@react-navigation/native";

const BottomNavigation: React.FC<{ leaderboardNavigate: string }> = ({ leaderboardNavigate }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.navigationContainer}>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.reset({index:0, routes:[{name:"SelectStylePage" as never}]})}
            >
                <Text style={styles.navText}>🏠 Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.navButton, styles.activeButton]}
                onPress={() => navigation.navigate(leaderboardNavigate as never)}
            >
                <Text style={styles.navText}>📊 Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate("AccountDetailsPage" as never)}
            >
                <Text style={styles.navText}>👤 Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navigationContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
        borderTopWidth: 2,
        borderTopColor: "#CCC",
        backgroundColor: "#FFFFFF",
    },
    navButton: {
        alignItems: "center",
        flex: 1,
        paddingVertical: 10,
    },
    navText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
    },
    activeButton: {
        borderBottomWidth: 3,
        borderBottomColor: "#53A0FF",
    },
});

export default BottomNavigation;