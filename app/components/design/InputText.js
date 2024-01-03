import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "@constants/colors";

const InputText = ({ placeholder, ...props }) => {
	return (
		<TextInput
			placeholderTextColor={colors["grey-500"]}
			style={styles.input}
			placeholder={placeholder}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 10,
		backgroundColor: colors["grey-700"],
		color: colors["grey-100"],
		fontSize: 16,
		alignSelf: "stretch",
	},
});

export default InputText;
