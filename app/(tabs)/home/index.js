import { useQuery, useRealm } from "@realm/react";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { Redirect, router } from "expo-router";
import Avatar from "@components/Avatar";
import ViewContainer from "@components/design/ViewContainer";
import { Ionicons } from "@expo/vector-icons";
import colors from "@constants/colors";

import Title from "@components/design/Title";
import DailyCard from "../../components/DailyCard";

export default function Home() {
	const [username, setUsername] = useState("");
	const [buddy_name, setBuddyName] = useState("");
	const realm = useRealm();
	const user = useQuery("User")[0];
	const buddy = useQuery("Buddy")[0];

	if (user === undefined || buddy === undefined) {
		return <Redirect href={"/screens/startup/start"} />;
	} else if (user.onboarding_completed === false) {
		<Redirect href={"/screens/startup/start"} />;
	}

	user.addListener((user) => {
		setUsername(user.username);
	});

	buddy.addListener((buddy) => {
		setBuddyName(buddy.buddy_name);
	});

	useEffect(() => {
		setUsername(user.username);
		setBuddyName(buddy.buddy_name);
	}, []);

	return (
		<ViewContainer>
			<Pressable
				onPress={() => router.push("/home/homeSettings")}
				style={styles.settings}
			>
				<Ionicons
					name="ios-settings-sharp"
					size={24}
					color={colors.lightGrey}
				/>
			</Pressable>
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 30 }}
			/>

			<View>
				<Title text={"Hello there,"} subtitle={username}/>
			</View>

            <DailyCard />
			
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
        paddingTop: 100,
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 100,
		marginBottom: 16,
	},
	settings: {
		position: "absolute",
		top: 50,
		left: 20,
		width: 40,
		height: 40,
	},
});
