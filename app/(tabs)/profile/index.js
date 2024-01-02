import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import useHealthData from "../../hooks/useHealthData";
import { useRealm } from "@realm/react";
import colors from "@constants/colors";
import ProfileCard from "@components/design/ProfileCard";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import formatNumber from "../../utils/numberFormat";
import Avatar from "../../components/app/Avatar";

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
	const date = new Date();
	const { healthData, loading, error } = useHealthData(date, false, true);
	const realm = useRealm();
	const user = realm.objects("User")[0];

	useEffect(() => {
		if (!loading && !error) {
			setData(healthData);
		} else if (error) {
			console.log(error);
		}
	}, [loading, error]);

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
					color={colors.lightGrey}
				/>
			</Pressable>
			<Title text="Profile" />
			<View style={styles.userContainer}>
				<Avatar size={"large"} style={{ marginBottom: 20 }} />
				<Text style={styles.username}>{username}</Text>
			</View>
			<View style={styles.innerContainer}>
				<ProfileCard
					value={data.steps}
					text="Total steps"
					icon="walking"
					loading={data !== "undefined" ? false : true}
				/>
				<ProfileCard
					value={data.calories}
					text="Calories burned"
					icon="fire"
					loading={data !== "undefined" ? false : true}
				/>
				<ProfileCard
					value={`${data.distance} km`}
					text="Total distance"
					icon="map-marked-alt"
					loading={data !== "undefined" ? false : true}
				/>
				<ProfileCard
					value={data.flights}
					text="Flights climbed"
					icon="stairs"
					loading={data !== "undefined" ? false : true}
				/>
			</View>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.white,
	},
	text: {
		fontSize: 16,
		color: colors.lightGrey,
	},
	value: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.white,
	},
	innerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 40,
		paddingHorizontal: 40,
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
});
