import { useQuery, useRealm } from "@realm/react";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import InputText from "../design/InputText";
import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const StepsGoal = () => {
	// State to manage editing mode
	const [isEditing, setEditing] = useState(false);
	// State to store the steps goal
	const [stepsGoal, setStepsGoal] = useState("10000"); // Initial steps goal
	const realm = useRealm();
	const user = useQuery("User")[0];

	// Update the steps goal when the user's daily_steps change
	useEffect(() => {
		setStepsGoal(user.daily_steps);
	}, [user.daily_steps]);

	// Handle press event for the edit button
	const handleEditPress = () => {
		setEditing(true);
	};

	// Handle press event for the save button
	const handleSavePress = () => {
		setEditing(false);

		// Update user's daily_steps in the realm
		realm.write(() => {
			user.daily_steps = stepsGoal;
		});
	};

	return (
		<View style={styles.container}>
			{isEditing ? (
				// Input field for editing steps goal
				<InputText
					keyboardType="numeric"
					value={stepsGoal}
					onChangeText={(text) => setStepsGoal(text)}
				/>
			) : (
				// Display current steps goal
				<Text style={{ color: colors["grey-100"] }}>
					{stepsGoal} steps
				</Text>
			)}

			{isEditing ? (
				// Save button during editing mode
				<TouchableOpacity onPress={handleSavePress}>
					<FontAwesome
						name="save"
						size={24}
						color={colors["green-200"]}
						style={{ marginLeft: 10 }}
					/>
				</TouchableOpacity>
			) : (
				// Edit button during normal mode
				<TouchableOpacity onPress={handleEditPress}>
					<Feather
						name="edit"
						size={24}
						color={colors["green-200"]}
						style={{ marginLeft: 10 }}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
});

export default StepsGoal;
