import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Redirect, StyleSheet } from "react-native";
import { useQuery, useRealm } from "@realm/react";
import { Feather } from "@expo/vector-icons";
import ViewContainer from "@components/design/ViewContainer";
import colors from "@constants/colors";
import Title from "@components/design/Title";
import DailyCard from "@components/app/DailyCard";
import Dino from "@components/app/Dino";
import Tooltip from "@components/app/Tooltip";
import Avatar from "@components/app/Avatar";
import { router } from "expo-router";

export default function Home() {
	const [username, setUsername] = useState("");
	const realm = useRealm();
	const user = useQuery("User")[0];

	// Redirect if user is not defined or onboarding is not completed
	if (user === undefined || !user.onboarding_completed) {
		return <Redirect href={"/screens/startup/start"} />;
	}

	// Update the username when user data changes
	user.addListener((updatedUser) => {
		setUsername(updatedUser.username);
	});

	// Update the username on component mount or when user changes
	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	return (
		<ViewContainer>
			{/* Settings button, only for development purposes */}
			{/* <Pressable
				onPress={() => router.push("/home/homeSettings")}
				style={styles.settings}
			>
				<Ionicons
					name="ios-settings-sharp"
					size={24}
					color={colors["green-200"]}
				/>
			</Pressable> */}

			{/* Tooltip component */}
			<Tooltip />

			{/* Avatar component */}
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 20 }}
			/>

			{/* Welcome message */}
			<View style={{ flex: 1 }}>
				<Title text={"Welcome back,"} subtitle={username} />
			</View>

			{/* DailyCard component */}
			<View
				style={{
					flex: 2,
					alignSelf: "stretch",
					marginHorizontal: 20,
					marginBottom: 50,
				}}
			>
				<DailyCard />
			</View>

			{/* Edit button and Dino component */}
			<View
				style={{ flex: 3, alignSelf: "stretch", alignItems: "center" }}
			>
				<TouchableOpacity
					onPress={() => router.push("/home/modal")}
					style={{
						position: "absolute",
						top: 0,
						right: 20,
						width: 44,
						height: 44,
					}}
				>
					<Feather
						name="edit"
						size={24}
						color={colors["green-200"]}
					/>
				</TouchableOpacity>
				<Dino screen={"home"} />
			</View>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	settings: {
		position: "absolute",
		top: 50,
		left: 20,
		width: 40,
		height: 40,
	},
});
