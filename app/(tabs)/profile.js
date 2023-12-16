import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import useHealthData from "../hooks/useHealthData";
import { useRealm } from "@realm/react";
import colors from "../constants/colors";
import ProfileCard from "@components/design/ProfileCard";

export default function Profle() {
    const [date, setDate] = useState(new Date());
	const { steps, flights, distance, calories } = useHealthData(date, true);

    const realm = useRealm();
    const user = realm.objects("User")[0];
    const username = user.username;

	return (
		<ViewContainer style={styles.container}>
			{/* Avatar */}
			<Text style={styles.title}>{username}</Text>
			<View style={styles.innerContainer}>
				<ProfileCard value={steps} text="Total steps" icon="walking" />
				<ProfileCard value={calories} text="Calories burned" icon="fire" />
				<ProfileCard value={distance} text="Total distance" icon="map-marked-alt" />
				<ProfileCard value={flights} text="Flights climbed" icon="stairs" />
			</View>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
        color: "white",
	},
    text: {
        fontSize: 16,
        color: colors.lightGrey,
    },
    value: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.white,
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 40,
        paddingHorizontal: 40,
    },
});
