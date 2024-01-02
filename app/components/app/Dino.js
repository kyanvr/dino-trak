import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import dino from "@assets/dino.png";
import { useCombination } from "@hooks/useCombination";
import accessories from "@constants/accessories";
import { useQuery, useRealm } from "@realm/react";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "@constants/colors";
import Button from "@components/design/Button";
import BackButton from "@components/design/BackButton";
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";

const Dino = ({ screen }) => {
	// Local state to track changes made by the user
	const [changesMade, setChangesMade] = useState(false);
	const { accessoryPaths, toggleAccessory, unlockAccessory, unlockedPaths } =
		useCombination();
	const realm = useRealm();
	const buddy = useQuery("Buddy")[0];
	const unlocked = buddy.unlocked_attributes;
	const active = buddy.active_attributes;
	const toast = useToast();

	const isAccessorySelected = (accessoryPath) => {
		// check if the accessoryPath is in the active array
		return accessoryPaths.includes(accessoryPath);
	};

	// console.log("active attr: ",active)
	// console.log("accessoryPaths: ",accessoryPaths);
	// console.log("unlockedAttributes: ", unlockedAttributes)
	// console.log("activeAttributes: ", activeAttributes)
	// console.log("unlockedPaths: ", unlockedPaths)\
	// console.log("unlockedItems: ", unlockedItems);
	// console.log("unlocked: ", unlocked);

	const handlePress = () => {
		const attributes = accessoryPaths.toString();

		try {
			realm.write(() => {
				buddy.active_attributes = attributes;
			});
			toast.show("Saved buddy!", {
				type: "success",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});

			// Reset the local state when changes are saved
			setChangesMade(false);

			// Navigate back
			router.back();
		} catch (error) {
			toast.show("Error saving buddy!", {
				type: "danger",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});
		}
	};

	const handleBack = () => {
		if (changesMade) {
			toast.show("You have unsaved changes!", {
				type: "warning",
				placement: "bottom",
				duration: 3000,
				offset: 50,
				animationType: "slide-in",
			});

			return;
		}

		// Navigate back
		router.back();
	};

	// Load unlocked with unlockedAttributes if it is not empty
	useEffect(() => {
		if (unlocked !== "") {
			const paths = unlocked.split(",");
			paths.forEach((path) => {
				const attribute = path.split("_");
				const attributeItem = attribute[1];
				// check if the accessoryPath is in the active array
				// if not, add it
				if (!unlockedPaths.includes(attributeItem)) {
					unlockAccessory(attributeItem);
				}
			});
		}
	}, [unlocked]);

	// Load accessoryPaths with activeAttributes if it is not empty
	useEffect(() => {
		if (active.length > 0) {
			const paths = active.split(",");
			paths.forEach((path) => {
				// check if the accessoryPath is in the active array
				// if not, add it
				if (!isAccessorySelected(path)) {
					toggleAccessory(path);
				}
			});
		}
	}, [active]);

	return (
		<View style={styles.container}>
			{screen !== "home" && (
				<View style={styles.top}>
					<BackButton title={"Back"} onPress={() => handleBack()} />
					<View style={styles.saveBuddy}>
						<Button
							title="Save buddy"
							onPress={() => handlePress()}
						>
							<FontAwesome5
								name="save"
								size={24}
								color={colors.black}
								style={{ marginLeft: 10 }}
							/>
						</Button>
					</View>
				</View>
			)}

			<View style={styles.dinoContainer}>
				<Image source={dino} style={styles.dino} />

				{screen !== "home"
					? accessoryPaths.map((accessoryPath, index) => (
							<Image
								key={index}
								source={accessories[accessoryPath]}
								style={styles[accessoryPath]}
							/>
					  ))
					: active.length > 0
					? active
							.split(",")
							.map((accessoryPath, index) => (
								<Image
									key={index}
									source={accessories[accessoryPath]}
									style={styles[accessoryPath]}
								/>
							))
					: null}
			</View>

			{screen !== "home" && (
				<View style={styles.items}>
					{unlockedPaths.map((accessoryPath, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => {
								toggleAccessory(accessoryPath);
								// Set the local state to indicate changes
								setChangesMade(!changesMade);
							}}
						>
							<Image
								source={accessories[accessoryPath]}
								style={[
									styles.thumbnail,
									isAccessorySelected(accessoryPath) &&
										styles.selectedThumbnail,
								]}
							/>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
	},
	dinoContainer: {
		position: "relative",
		zIndex: -1,
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "stretch",
		marginBottom: 100,
	},
	dino: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
	items: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "stretch",
		marginTop: 50,
	},
	thumbnail: {
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
		resizeMode: "contain",
		margin: 5,
	},
	selectedThumbnail: {
		borderWidth: 2,
		borderColor: colors["green-200"],
	},
	saveBuddy: {
		flexDirection: "row",
		alignItems: "center",
	},
	hat: {
		position: "absolute",
		top: -68,
		left: 100,
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	sunglasses: {
		position: "absolute",
		top: -15,
		left: 100,
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
});

export default Dino;
