import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "@constants/colors";
import { router } from "expo-router";

const BackButton = ({ title }) => {
	return (
		<Pressable onPress={() => router.back()} style={styles.button}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
        button: {
        borderBottomColor: colors.green,
        paddingHorizontal: 10,
        paddingBottom: 10,
        marginTop: 50,
        // alignSelf: "stretch",
        alignItems: "center",
        borderBottomWidth: 2,

    },
    text: {
        fontSize: 16,
        color: colors.lightGrey,
        fontWeight: "regular",
    },
});

export default BackButton;
