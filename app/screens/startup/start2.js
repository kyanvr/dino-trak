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
import { useToast } from "react-native-toast-notifications";

export default function Start2() {
	const [selectedGoals, setSelectedGoals] = useState([]);
	const realm = useRealm();
	const user = useQuery("User");
	const toast = useToast();
	const [dailySteps, setDailySteps] = useState("");

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
		if (selectedGoals.length === 0) {
			toast.show("Select at least one goal", {
				type: "warning",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});

			return;
		}

		if (dailySteps === "" || dailySteps === "0") {
			toast.show("Enter a daily step target above 0", {
				type: "warning",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});

            return;
		}

		realm.write(() => {
			user[0].personal_goals = getSelectedTitlesString(selectedGoals);
            user[0].daily_steps = dailySteps;
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
							setDailySteps(text);
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						onPress={() => {
							handlePress();
						}}
						title="Continue"
					/>
					<BackButton title="Back" onPress={() => router.back()} />
				</View>
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
		backgroundColor: colors["green-200"],
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
	},
	goals: {
		borderColor: colors["grey-200"],
		paddingHorizontal: 18,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 2,
	},
	text: {
		fontSize: 16,
		color: colors["grey-300"],
	},
	selectedText: {
		fontSize: 16,
		color: colors["grey-900"],
	},
	buttonContainer: {
		alignSelf: "stretch",
		alignItems: "center",
		gap: 20,
	},
});
