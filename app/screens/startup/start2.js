import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import goals from "@constants/goals";
import colors from "@constants/colors";
import Button from "@components/design/Button";
import BackButton from "@components/design/BackButton";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import InputText from "@components/design/InputText";
import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";

export default function Start2() {
	const [selectedGoals, setSelectedGoals] = useState([]);

	const realm = useRealm();
	const user = useQuery("User");

	function handleSelect(goal) {
		// Check if the goal is already selected
		const isSelected = selectedGoals.includes(goal);

		// If selected, remove it from the array; otherwise, add it
		if (isSelected) {
			setSelectedGoals(
				selectedGoals.filter((selectedGoal) => selectedGoal !== goal)
			);
		} else {
			setSelectedGoals([...selectedGoals, goal]);
		}
	}

	function getSelectedTitlesString(selectedGoals) {
		return selectedGoals.map((goal) => goal.title).join(", ");
	}

	function handlePress() {
		realm.write(() => {
			user[0].personal_goals = getSelectedTitlesString(selectedGoals);
		});

		router.push("/screens/startup/start3");
	}

	return (
		<ViewContainer style={styles.container}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<Title text="What is your ultimate goal?" />
				<View style={styles.goalsContainer}>
					{goals.map((goal) => (
						<Pressable
							key={goal.id}
							onPress={() => {
								handleSelect(goal);
							}}
							style={
								selectedGoals.includes(goal)
									? styles.selectedGoals
									: styles.goals
							}
						>
							<Text
								style={
									selectedGoals.includes(goal)
										? styles.selectedText
										: styles.text
								}
							>
								{goal.title}
							</Text>
						</Pressable>
					))}
				</View>
				<Title text="Set a daily step target!" />
				<View style={styles.inputContainer}>
					<InputText
						placeholder="Daily step target"
						keyboardType="numeric"
						onChangeText={(text) => {
							realm.write(() => {
								user[0].daily_steps = text;
							});
						}}
					/>
				</View>
				<Button
					onPress={() => {
						handlePress();
					}}
					title="Continue"
				/>
				<BackButton title="Back" />
			</ScrollView>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingHorizontal: 20,
	},
	goalsContainer: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		gap: 10,
		marginBottom: 50,
	},
	inputContainer: {
		marginBottom: 50,
        alignSelf: "flex-start",
	},
	selectedGoals: {
		backgroundColor: colors.green,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
	},
	goals: {
		borderColor: colors.lightGrey,
		paddingHorizontal: 18,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 2,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 50,
		color: colors.white,
	},
	text: {
		fontSize: 16,
		color: colors.lightGrey,
	},
	selectedText: {
		fontSize: 16,
		color: colors.black,
	},
});
