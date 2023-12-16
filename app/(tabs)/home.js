import { useQuery, useRealm } from "@realm/react";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { schemas } from "../models";
import { Redirect } from "expo-router";

export default function Home() {
	const realm = useRealm();

	const user = useQuery("User");

	const deleteAllData = () => {
		realm.write(() => {
			realm.deleteAll();
		});

        console.log("Deleted all data");
	};

	if (user.length === 0) {
        return (
            <Redirect href={"/screens/startup/start"} />
        )
	} else if (user[0].onboarding_completed === false) {
        <Redirect href={"/screens/startup/start"} />
    }

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome to the Home screen!</Text>
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
});
