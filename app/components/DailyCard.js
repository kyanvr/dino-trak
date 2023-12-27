import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "@constants/colors";
import { useState, useEffect } from "react";
import useHealthData from "@hooks/useHealthData";

const DailyCard = () => {
	const [date, setDate] = useState(new Date());
	const [steps, setSteps] = useState(0);
	const [flights, setFlights] = useState(0);
	const [distance, setDistance] = useState(0);
	const [calories, setCalories] = useState(0);

	const { healthData, loading, error } = useHealthData(date, false, false);

	useEffect(() => {
		if (!loading && !error) {
			setSteps(healthData.steps);
			setFlights(healthData.flights);
			setDistance(healthData.distance);
			setCalories(healthData.calories);
		} else {
			console.log(error);
		}
	}, [loading, error, date]);

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<FontAwesome5
					name="walking"
					size={60}
					color={colors["green-400"]}
				/>
				<View style={styles.topTextContainer}>
					<Text style={styles.valueText}>Track your steps</Text>
					{!loading && !error ? (
                        <Text style={styles.value}>{steps} steps</Text>
                    ) : (
                        <ActivityIndicator size="large" color={colors["grey-100"]} />
                    )}
				</View>
			</View>
			<View style={styles.bottom}>
				<View
					style={[
						styles.valueBottomContainer,
						{ alignItems: "flex-start" },
					]}
				>
					<Text style={styles.valueTextBottom}>Flights climbed</Text>
					{!loading && !error ? (
                        <Text style={styles.valueBottom}>{flights}</Text>
                    ) : (
                        <ActivityIndicator size="large" color={colors["grey-100"]} />
                    )}
				</View>
				<View
					style={[
						styles.valueBottomContainer,
						{ alignItems: "center" },
					]}
				>
					<Text style={styles.valueTextBottom}>Distance</Text>
					{!loading && !error ? (
                        <Text style={styles.valueBottom}>{distance} km</Text>
                    ) : (
                        <ActivityIndicator size="large" color={colors["grey-100"]} />
                    )}
				</View>
				<View
					style={[
						styles.valueBottomContainer,
						{ alignItems: "flex-end" },
					]}
				>
					<Text style={styles.valueTextBottom}>Calories</Text>
					{!loading && !error ? (
                        <Text style={styles.valueBottom}>{calories} kcal</Text>
                    ) : (
                        <ActivityIndicator size="large" color={colors["grey-100"]} />
                    )}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		borderColor: colors["grey-600"],
		borderWidth: 2,
		alignSelf: "stretch",
		marginHorizontal: 40,
		padding: 20,
		borderRadius: 10,
	},
	top: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		alignSelf: "stretch",
	},
	topTextContainer: {
		flexDirection: "column",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	valueText: {
		fontSize: 16,
		color: colors["grey-400"],
	},
	valueTextBottom: {
		fontSize: 14,
		color: colors["grey-400"],
		marginBottom: 10,
	},
	value: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors["grey-100"],
		marginVertical: 10,
	},
	valueBottom: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors["grey-100"],
	},
	bottom: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 20,
		alignSelf: "stretch",
	},
	valueBottomContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default DailyCard;
