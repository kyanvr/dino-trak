import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "@constants/colors";

const BackButton = ({ title, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
        button: {
        borderBottomColor: colors["grey-500"],
        paddingHorizontal: 10,
        paddingBottom: 10,
        alignItems: "center",
        borderBottomWidth: 2,

    },
    text: {
        fontSize: 16,
        color: colors["grey-500"],
    },
});

export default BackButton;
