import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import colors from "@constants/colors";
import Button from "@components/design/Button";
import ViewContainer from "@components/design/ViewContainer";
import InputText from "@components/design/InputText";
import Title from "@components/design/Title";
import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";
import ImagePicker from "@components/design/ImagePicker";
import useImagePicker from "../../hooks/useImagePicker";

export default function Start3() {
	const realm = useRealm();
    const user = useQuery("User");
	const usernameRef = useRef("");

    // selectedImage is the image that will be cached to show the user
    const { selectedImage, pickImageAsync, saveImage, getSavedImage } = useImagePicker();

	async function handlePress() {
		await saveImage();
		// savedImage is the image that will be saved to the database for later use
		const savedImage = await getSavedImage();

		realm.write(() => {
			user[0].username = usernameRef.current;
			user[0].avatar = savedImage;
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
				<ImagePicker onPress={pickImageAsync} image={selectedImage} />
			</View>
			<Button title="Continue" onPress={() => handlePress()} />
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingHorizontal: 20,
	},
	innerContainer: {
		alignSelf: "stretch",
		flexDirection: "column",
		alignItems: "center",
        gap: 50,
        marginBottom: 50,
	},
	image: {
		width: 100,
		height: 100,
		marginBottom: 16,
		borderRadius: 50,
	},
});
