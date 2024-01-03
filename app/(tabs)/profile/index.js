import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import useHealthData from "../../hooks/useHealthData";
import { useQuery, useRealm } from "@realm/react";
import colors from "@constants/colors";
import ProfileCard from "@components/design/ProfileCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Avatar from "../../components/app/Avatar";
import ChallengeCard from "../../components/design/ChallengeCard";

export default function Profile() {
	const [username, setUsername] = useState("");
	const [data, setData] = useState([
		{
			steps: 0,
			flights: 0,
			distance: 0,
			calories: 0,
		},
	]);
	const [date, setDate] = useState(new Date());
	const { healthData, loading, error } = useHealthData(date, false, true);
	const realm = useRealm();
	const user = useQuery("User")[0];
	const challenges = useQuery("Challenges");
	const completedChallenges = challenges.filter(
		(challenge) => challenge.completed === true
	);

	useEffect(() => {
		if (!loading && !error) {
			setData(healthData);
		} else if (error) {
			console.log(error);
		}
	}, [loading, error, date]);

	user.addListener((user) => {
		setUsername(user.username);
	});

	return (
		<ViewContainer style={styles.container}>
			<Pressable
				onPress={() => router.push("/profile/settings")}
				style={styles.settings}
			>
				<Ionicons
					name="ios-settings-sharp"
					size={24}
					color={colors["grey-300"]}
				/>
			</Pressable>
			<Title text="Profile" />
			<ScrollView contentContainerStyle={{ alignItems: "center", alignSelf: 'stretch' }} showsVerticalScrollIndicator={false}>
				<View style={styles.userContainer}>
					<Avatar size={"large"} style={{ marginBottom: 20 }} />
					<Text style={styles.username}>{username}</Text>
				</View>
				<View style={styles.innerContainer}>
					<ProfileCard
						value={loading ? 0 : data.steps}
						text="Total steps"
						icon="walking"
						loading={loading}
					/>
					<ProfileCard
						value={loading ? 0 : data.calories}
						text="Calories burned"
						icon="fire"
						loading={loading}
					/>
					<ProfileCard
						value={loading ? 0 : `${data.distance} km`}
						text="Total distance"
						icon="map-marked-alt"
						loading={loading}
					/>
					<ProfileCard
						value={loading ? 0 : data.floors}
						text="Flights climbed"
						icon="stairs"
						loading={loading}
					/>
				</View>
				{completedChallenges.length > 0 && (
					<View style={styles.challengesContainer}>
						<Text
							style={{
								color: colors["grey-300"],
								textAlign: "flex-start",
							}}
						>
							Completed challenges:
						</Text>
						<Text
							style={{
								color: colors["grey-100"],
								textAlign: "center",
							}}
						>
							{completedChallenges.length}
						</Text>
						<View style={styles.challenges}>
							{completedChallenges.map((challenge, index) => {
								return (
									<ChallengeCard
										title={challenge.challenge_name}
										description={
											challenge.challenge_description
										}
										key={index}
									/>
								);
							})}
						</View>
					</View>
				)}
			</ScrollView>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	username: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors["grey-100"],
	},
	text: {
		fontSize: 16,
		color: colors["grey-300"],
	},
	value: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors["grey-100"],
	},
	innerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 40,
		paddingHorizontal: 20,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 16,
	},
	userContainer: {
		alignItems: "center",
		marginBottom: 50,
	},
	settings: {
		position: "absolute",
		top: 50,
		right: 20,
		width: 40,
		height: 40,
	},
	challengesContainer: {
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "center",
		marginVertical: 20,
		borderTopWidth: 2,
		borderColor: colors["grey-600"],
		paddingVertical: 20,
	},
	challenges: {
		gap: 20,
		marginVertical: 20,
	},
});
