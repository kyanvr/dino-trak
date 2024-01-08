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
import ExpandableCard from "@components/app/ExpandableCard";
import { useQuery, useRealm } from "@realm/react";
import useLevelSystem from "@hooks/useLevelSystem";
import Avatar from "@components/app/Avatar";
import useHealthData from "@hooks/useHealthData";
import colors from "@constants/colors";
import LevelUpModal from "@components/app/LevelUpModal";
import demo_challenges from "@constants/demo_challenges";

export default function Challenges() {
	const [date, setDate] = useState(new Date());
	const [demoUser, setDemoUser] = useState(false);
    const [demoData, setDemoData] = useState({
        "steps": 10,
        "floors": 10,
        "distance": 10,
        "calories": 10,
    });
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [showRealChallenges, setShowRealChallenges] = useState(false);
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

	user.addListener((updatedUser) => {
		if (
			updatedUser.username === "Artevelde" ||
			updatedUser.username === "artevelde"
		) {
			setDemoUser(true);
		} else {
			setDemoUser(false);
		}
	});

	const handleFilterChange = (filter) => {
		setSelectedFilter(filter.toLowerCase());
	};

	const toggleShowRealChallenges = () => {
		setShowRealChallenges(!showRealChallenges);
	};

	return (
		<ViewContainer>
			{/* Challenges title */}
			<Title text="Challenges" />

			{/* Avatar for the user */}
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 20 }}
			/>

			{/* Level Up Modal */}
			<LevelUpModal visible={modalVisible} currentLevel={buddy.level} />

			{/* Filter buttons for Day, Week, Month */}
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

			{/* Challenges content */}
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
						{/* Render demo challenges for demo user */}
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
										healthData={demoData}
										loading={loading}
									/>
								);
							})}

						{/* Show option to view real challenges for demo user */}
						{demoUser && (
							<TouchableOpacity
								onPress={toggleShowRealChallenges}
							>
								<Text
									style={{
										color: colors["grey-300"],
										marginVertical: 40,
									}}
								>
									Show real challenges
								</Text>
							</TouchableOpacity>
						)}

						{/* Render real challenges based on selected filter for non-demo user */}
						{showRealChallenges &&
							challenges.map((challenge, index) => {
								const shouldInclude =
									selectedFilter === "all" ||
									challenge.duration.toLowerCase() ===
										selectedFilter;

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

						{/* Render challenges for non-demo user */}
						{!demoUser &&
							challenges.map((challenge, index) => {
								const shouldInclude =
									selectedFilter === "all" ||
									challenge.duration.toLowerCase() ===
										selectedFilter;

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
				// Loading indicator while data is loading
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
