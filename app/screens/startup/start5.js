import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Title from "@components/design/Title";
import Button from "@components/design/Button";
import ViewContainer from "@components/design/ViewContainer";
import { router } from "expo-router";
import ExpandableCard from "@components/app/ExpandableCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "@constants/colors";
import BackButton from "@components/design/BackButton";

export default function Start5() {
	const data = {
		steps: 10,
		floors: 10,
		distance: 10,
		calories: 10,
	};

	function handlePress() {
		router.push("/screens/startup/start6");
	}

	return (
		<ViewContainer style={styles.container}>
			<Title text={"Complete challenges to evolve your buddy!"} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					alignSelf: "stretch",
				}}
			>
				<MaterialCommunityIcons
					name="arrow-down-left"
					size={24}
					color={colors["green-200"]}
				/>
				<Text style={{ color: colors["green-200"] }}>Expand me</Text>
			</View>
			<ScrollView contentContainerStyle={styles.innerContainer}>
				<ExpandableCard
					title={"Challenge 1"}
					description={"Take 1000 steps"}
					xp={50}
					completed={false}
					duration={"day"}
					target={100}
					onPress={() => {}}
					type={"steps"}
					healthData={data}
					loading={false}
				/>
				<ExpandableCard
					title={"Challenge 2"}
					description={"Take 10 steps"}
					xp={50}
					completed={false}
					duration={"day"}
					target={10}
					onPress={() => {}}
					type={"steps"}
					healthData={data}
					loading={false}
				/>
				<ExpandableCard
					title={"Challenge 3"}
					description={"Take 20 steps"}
					xp={50}
					completed={false}
					duration={"day"}
					target={20}
					onPress={() => {}}
					type={"steps"}
					healthData={data}
					loading={false}
				/>
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Button
					onPress={() => {
						handlePress();
					}}
					title="Continue"
				/>
				<BackButton title="Back" onPress={() => router.back()} />
			</View>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingHorizontal: 20,
	},
	innerContainer: {
		alignItems: "center",
		alignSelf: "stretch",
		width: "100%",
		gap: 10,
	},
	buttonContainer: {
		alignSelf: "stretch",
		alignItems: "center",
		gap: 20,
		marginBottom: 50,
	},
});
