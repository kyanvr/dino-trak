import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function History() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome to the History screen!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
