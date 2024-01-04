import React, { useRef } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import Button from "@components/design/Button";
import ViewContainer from "@components/design/ViewContainer";
import InputText from "@components/design/InputText";
import Title from "@components/design/Title";
import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";
import ImagePicker from "@components/design/ImagePicker";
import useImagePicker from "@hooks/useImagePicker";
import { useToast } from "react-native-toast-notifications";
import BackButton from "@components/design/BackButton";

export default function Start3() {
	const realm = useRealm();
	const user = useQuery("User");
	const usernameRef = useRef("");
	const toast = useToast();

	const { selectedImage, pickImageAsync, saveImage, getSavedImage } =
		useImagePicker();

	async function handlePress() {
		await saveImage();
		const savedImage = await getSavedImage();

		if (usernameRef.current !== "") {
			realm.write(() => {
				user[0].username = usernameRef.current;
			});
		} else {
			toast.show("Please enter a username", {
				type: "warning",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});

			return;
		}

		if (savedImage !== undefined) {
			realm.write(() => {
				user[0].avatar = savedImage;
			});
		} else {
			toast.show("Please select an avatar", {
                type: "warning",
                placement: "bottom",
                duration: 3000,
                offset: 50,
                animationType: "slide-in",
            });

            return;
		}

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
	buttonContainer: {
		alignSelf: "stretch",
		alignItems: "center",
		gap: 20,
	},
});
