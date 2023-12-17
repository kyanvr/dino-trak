import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import RingProgress from "../components/design/RingProgress";
import useHealthData from "../hooks/useHealthData";
import Value from "../components/design/Value";
import colors from "../constants/colors";
import ViewContainer from "../components/design/ViewContainer";
import Title from "../components/design/Title";
import { formatDate } from "../utils/dateFormat";
import { Button } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const STEPS_GOAL = 10000;

export default function App() {
	const [date, setDate] = useState(new Date());
	const { steps, flights, distance, calories } = useHealthData(date, false);

	const changeDate = (numDays) => {
		const currentDate = new Date(date); // Create a copy of the current date
		// Update the date by adding/subtracting the number of days
		currentDate.setDate(currentDate.getDate() + numDays);

		setDate(currentDate); // Update the state variable
	};

    const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			onChange,
			mode: currentMode,
			is24Hour: true,
		});
	};

	const showDatepicker = () => {
		showMode("date");
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
						color={colors.lightGrey}
					/>
					<Pressable onPress={showDatepicker} style={styles.datePressable}>
						<Text style={styles.date}>{formatDate(date)}</Text>
						<MaterialIcons
							name="date-range"
							size={24}
							color={colors.green}
						/>
					</Pressable>

					<AntDesign
						onPress={() => changeDate(1)}
						name="right"
						size={20}
						color={colors.lightGrey}
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
						value={`${distance.toString()} km`}
					/>
					<Value label="Flights Climbed" value={flights.toString()} />
					<Value label="Kcal" value={calories} />
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
		justifyContent: "space-around",
		marginBottom: 20,
	},
	date: {
		color: "white",
		fontWeight: "500",
		fontSize: 20,
		marginHorizontal: 20,
	},
    datePressable: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});
