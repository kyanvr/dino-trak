import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import Title from "@components/design/Title";
import colors from "@constants/colors";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useQuery, useRealm } from "@realm/react";
import { useEffect, useRef, useState } from "react";
import InputText from "@components/design/InputText";
import Button from "@components/design/Button";
import useImagePicker from "../../hooks/useImagePicker";
import ImagePicker from "@components/design/ImagePicker";
import { useToast } from "react-native-toast-notifications";
import { openHealthConnectSettings } from "react-native-health-connect";
import ViewContainer from "../../components/design/ViewContainer";
import BackButton from "../../components/design/BackButton";

export default function Settings() {
	const [focused, setFocused] = useState(false);
	const [changesMade, setChangesMade] = useState(0);
	const realm = useRealm();
	const user = useQuery("User");
	const buddy = useQuery("Buddy");
	const usernameRef = useRef("");
	const buddyNameRef = useRef("");
	const { selectedImage, pickImageAsync, saveImage, getSavedImage } = useImagePicker();
	const toast = useToast();

	async function handlePress() {
		try {
			// check if user changed username
			if (usernameRef.current !== "") {
				realm.write(() => {
					user[0].username = usernameRef.current;
				});
			}

			// check if user changed buddy name
			if (buddyNameRef.current !== "") {
				realm.write(() => {
					buddy[0].buddy_name = buddyNameRef.current;
				});
			}

			// check if user changed avatar
			if (selectedImage) {
                await saveImage();
                const savedImage = await getSavedImage();
				realm.write(() => {
					user[0].avatar = savedImage;
				});
			}

            setChangesMade(0);

            router.back();

			toast.show("Saved data!", {
				type: "success",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});
		} catch (error) {
			toast.show("Error saving data!", {
				type: "danger",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});
		}
	}

	const handleBack = () => {
		if (changesMade > 0) {
			toast.show("You have unsaved changes!", {
				type: "warning",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});

			return;
		}

		router.back();
	};

	return (
		<ViewContainer>
			<Title text="Settings" />
			<ScrollView
				style={styles.settings}
				contentContainerStyle={{ alignItems: "flex-start" }}
			>
				<View style={styles.saveData}>
					<BackButton title={"Back"} onPress={() => handleBack()} />
					<Button title="Save data" onPress={() => handlePress()}>
						<FontAwesome5
							name="save"
							size={24}
							color={colors.black}
							style={{ marginLeft: 10 }}
						/>
					</Button>
				</View>
				<View style={styles.settingsBlock}>
					<Text style={styles.text}>Change username</Text>
					<InputText
						placeholder={user[0].username}
						onChangeText={(text) => {
							usernameRef.current = text;
						}}
						onFocus={() =>
							setChangesMade((changesMade) => changesMade + 1)
						}
					/>
				</View>
				<View style={styles.settingsBlock}>
					<Text style={styles.text}>Change buddy name</Text>
					<InputText
						placeholder={buddy[0].buddy_name}
						onChangeText={(text) => {
							buddyNameRef.current = text;
						}}
					/>
				</View>
				<View style={styles.settingsBlock}>
					<Text style={styles.text}>Change avatar</Text>
					<ImagePicker
						onPress={() => {pickImageAsync(); setChangesMade((changesMade) => changesMade + 1)}}
						image={selectedImage ? selectedImage : user[0].avatar}
					/>
				</View>
				<View style={styles.settingsBlock}>
					<Text style={styles.text}>
						Open Health Connect settings
					</Text>
					<Button
						title="Open settings"
						onPress={openHealthConnectSettings}
					/>
				</View>
			</ScrollView>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 20,
		backgroundColor: colors.black,
		alignItems: "center",
		position: "relative",
	},
	back: {
		position: "absolute",
		top: 50,
		left: 20,
		width: 40,
		height: 40,
	},
	settings: {
		alignSelf: "stretch",
		flexDirection: "column",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors["grey-100"],
		marginBottom: 20,
	},
	saveData: {
		alignSelf: "stretch",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	settingsBlock: {
		marginBottom: 20,
		alignSelf: "stretch",
	},
});
