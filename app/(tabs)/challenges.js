import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import ExpandableCard from "../components/app/ExpandableCard";
import { useQuery, useRealm } from "@realm/react";
import useLevelSystem from "@hooks/useLevelSystem";
import Avatar from "../components/app/Avatar";
import useHealthData from "../hooks/useHealthData";
import colors from "../constants/colors";
import LevelUpModal from "../components/app/LevelUpModal";
import demo_challenges from "../constants/demo_challenges";
import DropDownPicker from "react-native-dropdown-picker";
import { Feather } from "@expo/vector-icons";

export default function Challenges() {
	const [date, setDate] = useState(new Date());
	const [demoUser, setDemoUser] = useState(false);
	const [selectedFilter, setSelectedFilter] = useState("all");
	const realm = useRealm();
	const challenges = useQuery("Challenges");
	const buddy = useQuery("Buddy")[0];
	const user = useQuery("User")[0];
	const username = user.username;
	const { awardXP, modalVisible } = useLevelSystem();
	const { dailyData, weeklyData, monthlyData, loading, error } =
		useHealthData(date);

	useEffect(() => {
		if (username === "Artevelde" || username === "artevelde") {
			setDemoUser(true);
		}
	}, [username]);

	const handleFilterChange = (filter) => {
		setSelectedFilter(filter.toLowerCase());
	};

	return (
		<ViewContainer>
			<Title text="Challenges" />
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 30 }}
			/>
			<LevelUpModal visible={modalVisible} currentLevel={buddy.level} />
			<View style={styles.filterContainer}>
				<TouchableOpacity
					style={[
						styles.filterButton,
						selectedFilter === "all" && styles.selectedFilter,
					]}
					onPress={() => handleFilterChange("all")}
				>
					<Text
						style={[
							styles.filterButtonText,
							selectedFilter === "all" && styles.selectedText,
						]}
					>
						All
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.filterButton,
						selectedFilter === "day" && styles.selectedFilter,
					]}
					onPress={() => handleFilterChange("day")}
				>
					<Text
						style={[
							styles.filterButtonText,
							selectedFilter === "day" && styles.selectedText,
						]}
					>
						Day
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.filterButton,
						selectedFilter === "week" && styles.selectedFilter,
					]}
					onPress={() => handleFilterChange("week")}
				>
					<Text
						style={[
							styles.filterButtonText,
							selectedFilter === "week" && styles.selectedText,
						]}
					>
						Week
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.filterButton,
						selectedFilter === "month" && styles.selectedFilter,
					]}
					onPress={() => handleFilterChange("month")}
				>
					<Text
						style={[
							styles.filterButtonText,
							selectedFilter === "month" && styles.selectedText,
						]}
					>
						Month
					</Text>
				</TouchableOpacity>
			</View>
			{!loading ? (
				<ScrollView
					contentContainerStyle={{
						width: "100%",
						alignItems: "center",
						paddingVertical: 20,
					}}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.container}>
						{demoUser &&
							demo_challenges.map((challenge, index) => {
								return (
									<ExpandableCard
										key={index}
										title={challenge.challenge_name}
										completed={challenge.completed}
										xp={challenge.xp}
										description={
											challenge.challenge_description
										}
										duration={challenge.duration}
										target={challenge.challenge_goal}
										onPress={() => {
											awardXP(challenge.xp);
											realm.write(() => {
												challenge.completed = true;
											});
										}}
										type={challenge.type}
										healthData={dailyData}
										loading={loading}
									/>
								);
							})}

						{demoUser && (
							<Text
								style={{
									color: colors["grey-300"],
									marginVertical: 40,
								}}
							>
								Real challenges
							</Text>
						)}

						{challenges.map((challenge, index) => {
							// Check if the challenge should be included based on the selected filter
							const shouldInclude =
								selectedFilter === "all" ||
								challenge.duration.toLowerCase() ===
									selectedFilter;

							// Render the ExpandableCard only if it should be included
							return shouldInclude ? (
								<ExpandableCard
									key={index}
									title={challenge.challenge_name}
									completed={challenge.completed}
									xp={challenge.xp}
									description={
										challenge.challenge_description
									}
									duration={challenge.duration}
									target={challenge.challenge_goal}
									onPress={() => {
										awardXP(challenge.xp);
										realm.write(() => {
											challenge.completed = true;
										});
									}}
									type={challenge.type}
									healthData={
										challenge.duration.toLowerCase() ===
										"day"
											? dailyData
											: challenge.duration.toLowerCase() ===
											  "week"
											? weeklyData
											: monthlyData
									}
									loading={loading}
								/>
							) : null;
						})}
					</View>
				</ScrollView>
			) : (
				<ActivityIndicator size="large" color={colors["grey-600"]} />
			)}
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 16,
		color: colors["grey-300"],
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 10,
		gap: 10,
	},
	filterButton: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 50,
		backgroundColor: colors["grey-600"],
	},
	selectedFilter: {
		backgroundColor: colors["green-200"],
	},
	filterButtonText: {
		fontSize: 16,
		color: colors["grey-200"],
	},
	selectedText: {
		color: colors["grey-900"],
        fontWeight: "bold",
	},
});
