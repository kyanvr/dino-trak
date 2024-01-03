import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const ChallengeCard = ({ title, description }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		backgroundColor: colors["grey-800"],
		borderRadius: 10,
		padding: 20,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors["grey-100"],
	},
	description: {
		fontSize: 16,
		color: colors["grey-300"],
	},
	rewardTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors["grey-900"],
	},
});

export default ChallengeCard;
