import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";

export const Button = ({ onPress, title }) => {
	return (
		<Pressable onPress={onPress} style={styles.button}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
        button: {
        backgroundColor: colors.primary,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        marginTop: 150,
        alignSelf: "stretch",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
});
