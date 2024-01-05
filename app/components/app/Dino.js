import React, { useEffect, useState, useMemo } from "react";
import {
	Image,
	StyleSheet,
	View,
	TouchableOpacity,
	Text,
	ScrollView,
	Dimensions,
} from "react-native";
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

const screenWidth = Dimensions.get("window").width;

const Dino = ({ screen }) => {
	const [changesMade, setChangesMade] = useState(0);
	const [categories, setCategories] = useState([]);
	const [itemsByCategory, setItemsByCategory] = useState({});
	const { accessoryPaths, toggleAccessory, unlockAccessory, unlockedPaths } =
		useCombination();
	const realm = useRealm();
	const buddy = useQuery("Buddy")[0];
	const unlocked = buddy.unlocked_attributes;
	const active = buddy.active_attributes;
	const toast = useToast();

	const isAccessorySelected = (accessoryPath) => {
		return accessoryPaths.includes(accessoryPath);
	};

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

			setChangesMade(0);

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

	// Load unlocked with unlockedAttributes if it is not empty
	useEffect(() => {
		if (unlocked.length > 0) {
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

	// Load categories with unlocked if it is not empty
	useEffect(() => {
		if (unlocked.length > 0) {
			const paths = unlocked.split(",");
			setCategories((prevCategories) => {
				const updatedCategories = [...prevCategories];
				const updatedItemsByCategory = { ...itemsByCategory };

				paths.forEach((path) => {
					const attribute = path.split("_");
					const attributeCategory = attribute[0];

					// Update or add the category to the state
					if (!updatedCategories.includes(attributeCategory)) {
						updatedCategories.push(attributeCategory);
					}

					// Update or add the item to the respective category in the state
					if (!updatedItemsByCategory[attributeCategory]) {
						updatedItemsByCategory[attributeCategory] = [];
					}

					// Check if the item is not already in the category before adding
					if (
						!updatedItemsByCategory[attributeCategory].includes(
							attribute[1]
						)
					) {
						updatedItemsByCategory[attributeCategory].push(
							attribute[1]
						);
					}
				});

				setItemsByCategory(updatedItemsByCategory);
				return updatedCategories;
			});
		}
	}, [unlocked]);

	const Item = React.memo(
		({
			accessoryPath,
			toggleAccessory,
			isAccessorySelected,
			setChangesMade,
		}) => {
			return (
				<TouchableOpacity
					onPress={() => {
						toggleAccessory(accessoryPath);
						setChangesMade((prev) => prev + 1);
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
			);
		}
	);

	const ItemsView = ({
		categories,
		itemsByCategory,
		toggleAccessory,
		isAccessorySelected,
		setChangesMade,
	}) => {
		return useMemo(() => {
			return (
				<ScrollView contentContainerStyle={styles.items}>
					{categories.map((category, categoryIndex) => (
						<View
							key={categoryIndex}
							style={styles.categoryContainer}
						>
							<Text style={styles.categoryTitle}>{category}</Text>
							<View
								style={styles.categoryItems}
								// horizontal={true}
								// nestedScrollEnabled={true}
							>
								{(itemsByCategory[category] || []).map(
									(accessoryPath, index) => (
										<Item
											key={index}
											accessoryPath={accessoryPath}
											toggleAccessory={toggleAccessory}
											isAccessorySelected={
												isAccessorySelected
											}
											setChangesMade={setChangesMade}
										/>
									)
								)}
							</View>
						</View>
					))}
				</ScrollView>
			);
		}, [
			categories,
			itemsByCategory,
			toggleAccessory,
			isAccessorySelected,
			setChangesMade,
		]);
	};

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
								color={colors["grey-900"]}
								style={{ marginLeft: 10 }}
							/>
						</Button>
					</View>
				</View>
			)}

			<View style={styles.dinoContainer}>
				{screen === "home" && (
					<View style={styles.levelContainer}>
						<Text style={styles.buddyText}>{buddy.buddy_name}</Text>
						<Text style={styles.buddyLevel}>
							LVL {buddy.level !== 15 ? buddy.level : "MAX"}
						</Text>
					</View>
				)}
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
				<ItemsView
					categories={categories}
					itemsByCategory={itemsByCategory}
					toggleAccessory={toggleAccessory}
					isAccessorySelected={isAccessorySelected}
					setChangesMade={setChangesMade}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		width: screenWidth,
		paddingHorizontal: 20,
	},
	dinoContainer: {
		position: "relative",
		zIndex: -1,
		marginBottom: 20,
	},
	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignSelf: "stretch",
		marginBottom: 100,
	},
	levelContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: colors["green-200"],
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	buddyText: {
		color: colors["grey-900"],
		fontSize: 16,
		fontWeight: "bold",
	},
    buddyLevel: {
        color: colors["grey-900"],
        fontSize: 12,
    },
	dino: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
	items: {
		alignSelf: "stretch",
		paddingVertical: 20,
	},
	categoryContainer: {
		marginBottom: 30,
		alignSelf: "stretch",
	},
	categoryTitle: {
		fontSize: 16,
		marginBottom: 10,
		color: colors["grey-300"],
		textTransform: "capitalize",
	},
	categoryItems: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
	},
	thumbnail: {
		alignItems: "center",
		justifyContent: "center",
		width: 75,
		height: 75,
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
		top: -50,
		left: 100,
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	sunglasses: {
		position: "absolute",
		top: -40,
		left: 80,
		width: 140,
		height: 140,
		resizeMode: "contain",
	},
	shield: {
		position: "absolute",
		top: 165,
		right: 40,
		width: 120,
		height: 120,
		resizeMode: "contain",
	},
	sword: {
		position: "absolute",
		top: 175,
		left: 70,
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	wand: {
		position: "absolute",
		top: 105,
		left: -5,
		width: 200,
		height: 200,
		resizeMode: "contain",
		transform: [{ rotate: "-30deg" }],
	},
	armor: {
		position: "absolute",
		top: 85,
		left: 60,
		width: 180,
		height: 180,
		resizeMode: "contain",
	},
	castleBackground: {
		position: "absolute",
		top: -20,
		left: -10,
		width: 320,
		height: 320,
		resizeMode: "cover",
		zIndex: -1,
		borderRadius: 10,
	},
	scarf: {
		position: "absolute",
		top: 60,
		left: 68,
		width: 160,
		height: 160,
		resizeMode: "contain",
		zIndex: 100,
	},
	forestBackground: {
		position: "absolute",
		top: -20,
		left: -10,
		width: 320,
		height: 320,
		resizeMode: "cover",
		zIndex: -1,
		borderRadius: 10,
	},
	aviator: {
		position: "absolute",
		top: -30,
		left: 90,
		width: 120,
		height: 120,
		resizeMode: "contain",
	},
	volcanoBackground: {
		position: "absolute",
		top: -20,
		left: -10,
		width: 320,
		height: 320,
		resizeMode: "cover",
		zIndex: -1,
		borderRadius: 10,
	},
	blueTop: {
		position: "absolute",
		top: 100,
		left: 70,
		width: 160,
		height: 160,
		resizeMode: "contain",
	},
	redTop: {
		position: "absolute",
		top: 100,
		left: 70,
		width: 160,
		height: 160,
		resizeMode: "contain",
	},
	pinkTop: {
		position: "absolute",
		top: 100,
		left: 70,
		width: 160,
		height: 160,
		resizeMode: "contain",
	},
	jungleBackground: {
		position: "absolute",
		top: -20,
		left: -10,
		width: 320,
		height: 320,
		resizeMode: "cover",
		zIndex: -1,
		borderRadius: 10,
	},
});

export default Dino;
