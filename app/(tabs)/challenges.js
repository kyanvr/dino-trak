import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import ExpandableCard from "../components/ExpandableCard";
import { useQuery, useRealm } from "@realm/react";
import useLevelSystem from "@hooks/useLevelSystem";
import Avatar from "../components/Avatar";
import useHealthData from "../hooks/useHealthData";
import colors from "../constants/colors";
import LevelUpModal from "../components/LevelUpModal";

export default function Challenges() {
	const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
	const { userLevel, userXP, awardXP, modalVisible } = useLevelSystem();
	const realm = useRealm();
	const challenges = useQuery("Challenges");
	const buddy = useQuery("Buddy")[0];
	const user = useQuery("User")[0];

	const { healthData, loading, error } = useHealthData(
		date,
		false,
		false
	);

	useEffect(() => {
		// Fetch initial health data on component mount
		if (!loading && !error) {
			// You can access healthData.steps, healthData.flights, etc. here
			setData(healthData);
		} else if (error) {
            console.log(error);
        }
	}, [loading, error, date]);

	return (
		<ViewContainer>
			<Title text="Challenges" />
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 30 }}
			/>
			<Text style={styles.text}>Your level: {buddy.level}</Text>
			<Text style={styles.text}>Your XP: {buddy.xp}</Text>
            <LevelUpModal visible={modalVisible} currentLevel={buddy.level} />
            
			{!loading ? (
				<ScrollView
					contentContainerStyle={{
						width: "100%",
						alignItems: "center",
						paddingVertical: 20,
					}}
				>
					<View style={styles.container}>
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
									healthData={data} // Pass healthData as a prop to ExpandableCard
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
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
});
