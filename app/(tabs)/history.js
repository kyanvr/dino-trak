import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import RingProgress from "../components/design/RingProgress";
import useHealthData from "../hooks/useHealthData";
import Value from "../components/design/Value";
import colors from "../constants/colors";
import ViewContainer from "../components/design/ViewContainer";
import Title from "../components/design/Title";
import { formatDate } from "../utils/dateFormat";

const STEPS_GOAL = 10000;

export default function App() {
	const [date, setDate] = useState(new Date());
	const { steps, flights, distance, calories } = useHealthData(date);

	const changeDate = (numDays) => {
		const currentDate = new Date(date); // Create a copy of the current date
		// Update the date by adding/subtracting the number of days
		currentDate.setDate(currentDate.getDate() + numDays);

		setDate(currentDate); // Update the state variable
	};

	return (
		<ViewContainer>
			<Title text="History" />
			<ScrollView style={styles.container}>
				<View style={styles.datePicker}>
					<AntDesign
						onPress={() => changeDate(-1)}
						name="left"
						size={20}
						color={colors.green}
					/>
					<Text style={styles.date}>{formatDate(date)}</Text>

					<AntDesign
						onPress={() => changeDate(1)}
						name="right"
						size={20}
						color={colors.green}
					/>
				</View>

				<RingProgress
					radius={150}
					strokeWidth={50}
					progress={(steps / STEPS_GOAL) * 100}
				/>

				<View style={styles.values}>
					<Value label="Steps" value={steps.toString()} />
					<Value
						label="Distance"
						value={`${(distance / 1000).toFixed(2)} km`}
					/>
					<Value label="Flights Climbed" value={flights.toString()} />
					<Value label="Kcal" value={`${(calories).toFixed()}`} />
				</View>
			</ScrollView>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	values: {
		flexDirection: "row",
		gap: 25,
		flexWrap: "wrap",
		marginTop: 100,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	datePicker: {
		alignItems: "center",
		padding: 20,
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
	},
	date: {
		color: "white",
		fontWeight: "500",
		fontSize: 20,
		marginHorizontal: 20,
	},
});
