import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "@constants/colors";

const Button = ({ onPress, title, children }) => {
	return (
		<Pressable onPress={onPress} style={styles.button}>
			<Text style={styles.text}>{title}</Text>
            {children}
		</Pressable>
	);
};

const styles = StyleSheet.create({
        button: {
        backgroundColor: colors.green,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        alignSelf: "stretch",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
});

export default Button;
