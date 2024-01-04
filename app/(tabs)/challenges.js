import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
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

export default function Challenges() {
	const [data, setData] = useState([]);
	const [date, setDate] = useState(new Date());
	const [demoUser, setDemoUser] = useState(false);
	const { awardXP, modalVisible } = useLevelSystem();
	const realm = useRealm();
	const challenges = useQuery("Challenges");
	const buddy = useQuery("Buddy")[0];
	const user = useQuery("User")[0];
	const username = user.username;

	const { healthData, loading, error } = useHealthData(date, false, false);

	useEffect(() => {
		if (!loading && !error) {
			setData(healthData);
		} else if (error) {
			console.log(error);
		}
	}, [loading, error, date]);

	useEffect(() => {
		if (username === "Artevelde") {
			setDemoUser(true);
		}
	}),
		[username];

	return (
		<ViewContainer>
			<Title text="Challenges" />
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 30 }}
			/>
			<View
				style={{
					alignItems: "flex-start",
					alignSelf: "stretch",
					marginBottom: 20,
				}}
			>
				<Text style={styles.text}>
					Your buddy's level: {buddy.level}
				</Text>
				<Text style={styles.text}>Your buddy's XP: {buddy.xp}</Text>
			</View>
			<LevelUpModal visible={modalVisible} currentLevel={buddy.level} />

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
										healthData={data}
										loading={loading}
									/>
								);
							})}

						{challenges.map((challenge, index) => {
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
									healthData={data}
									loading={loading}
								/>
							);
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
});
