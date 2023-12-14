import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "@constants/colors";
import Button from "@components/design/Button";
import ViewContainer from "@components/design/ViewContainer";
import InputText from "@components/design/InputText";
import Title from "@components/design/Title";
import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";

export default function Start3() {
	const realm = useRealm();
    const user = useQuery("User");
	const usernameRef = useRef("");

	function handlePress() {
		realm.write(() => {
			user[0].username = usernameRef.current;
		});

		router.push("/screens/startup/start4");
	}

	return (
		<ViewContainer style={styles.container}>
			<Title text="Choose a username and an avatar" />
			<View style={styles.innerContainer}>
				<InputText
					placeholder="Username"
					onChangeText={(text) => {
						usernameRef.current = text;
					}}
				/>
			</View>
			<Button title="Continue" onPress={() => handlePress()} />
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 100,
		paddingHorizontal: 20,
	},
	innerContainer: {
		alignSelf: "stretch",
	},
});
