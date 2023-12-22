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
import Avatar from "../../components/design/Avatar";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");

	const date = new Date();

	const { steps, flights, distance, calories } = useHealthData(date, false, true);

	const realm = useRealm();
	const user = realm.objects("User")[0];

    user.addListener((user) => {
        setUsername(user.username);
        setAvatar(user.avatar);
    });

    useEffect(() => {
        setUsername(user.username);
        setAvatar(user.avatar);
    }
    , []);

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
				<Avatar
					source={{ uri: avatar }}
					size={"large"}
                    style={{marginBottom: 20}}
				/>
				<Text style={styles.username}>{username}</Text>
			</View>
			<View style={styles.innerContainer}>
				<ProfileCard
					value={formatNumber(steps)}
					text="Total steps"
					icon="walking"
				/>
				<ProfileCard
					value={formatNumber(calories)}
					text="Calories burned"
					icon="fire"
				/>
				<ProfileCard
					value={`${distance} km`}
					text="Total distance"
					icon="map-marked-alt"
				/>
				<ProfileCard
					value={flights}
					text="Flights climbed"
					icon="stairs"
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
