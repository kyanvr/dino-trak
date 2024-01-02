import { useQuery, useRealm } from "@realm/react";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import InputText from "../design/InputText";
import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const StepsGoal = () => {
	const [isEditing, setEditing] = useState(false);
	const [stepsGoal, setStepsGoal] = useState("10000"); // Initial steps goal
	const realm = useRealm();
	const user = useQuery("User")[0];
	
    useEffect(() => {
        setStepsGoal(user.daily_steps);
    }, [user.daily_steps]);

	const handleEditPress = () => {
		setEditing(true);
	};

	const handleSavePress = () => {
		setEditing(false);

		realm.write(() => {
			user.daily_steps = stepsGoal;
		});
	};

	return (
		<View style={styles.container}>
			{isEditing ? (
				<InputText
					keyboardType="numeric"
					value={stepsGoal}
					onChangeText={(text) => setStepsGoal(text)}
				/>
			) : (
				<Text style={{ color: colors["grey-100"] }}>
					{stepsGoal} steps
				</Text>
			)}

			{isEditing ? (
				<TouchableOpacity onPress={handleSavePress}>
					<FontAwesome
						name="save"
						size={24}
						color={colors["green-200"]}
						style={{ marginLeft: 10 }}
					/>
				</TouchableOpacity>
			) : (
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
