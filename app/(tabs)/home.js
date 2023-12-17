import { useQuery, useRealm } from "@realm/react";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { schemas } from "../models";
import { Redirect } from "expo-router";

export default function Home() {
	const [username, setUsername] = useState("");
	const [avatar, setAvatar] = useState("");
    const [buddy_name, setBuddyName] = useState("");

	const realm = useRealm();

	const user = useQuery("User")[0];
	const buddy = useQuery("Buddy")[0];

	user.addListener((user) => {
		setUsername(user.username);
		setAvatar(user.avatar);
	});

    buddy.addListener((buddy) => {
        setBuddyName(buddy.buddy_name);
    });

	useEffect(() => {
		setUsername(user.username);
		setAvatar(user.avatar);
        setBuddyName(buddy.buddy_name);
	}, []);

	const deleteAllData = () => {
		realm.write(() => {
			realm.deleteAll();
		});

		console.log("Deleted all data");
	};

	if (user.length === 0) {
		return <Redirect href={"/screens/startup/start"} />;
	} else if (user.onboarding_completed === false) {
		<Redirect href={"/screens/startup/start"} />;
	}

	return (
		<View style={styles.container}>
			<Image source={{ uri: avatar }} style={styles.image} />
			<Text style={styles.text}>{username}</Text>
			<Text style={styles.text}>{buddy_name}</Text>
			{/* <Text style={styles.text}>Welcome to the Home screen!</Text> */}
			<Button title="Delete all data" onPress={() => deleteAllData()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 100,
		marginBottom: 16,
	},
});
