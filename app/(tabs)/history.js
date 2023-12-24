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
import { useQuery, useRealm } from "@realm/react";
import StepsGoal from "../components/StepsGoal";
import progressFormat from "../utils/progressFormat";
import Avatar from "../components/Avatar";

export default function App() {
	const [date, setDate] = useState(new Date());
	const { healthData, loading, error } = useHealthData(
		new Date(),
		false,
		false
	);

    // console.log(steps, flights, distance, calories);

    const realm = useRealm();
    const user = useQuery("User")[0];
    const stepsGoal = user.daily_steps;

    const progress = progressFormat(healthData.steps, stepsGoal);

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
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 30 }}
			/>
			<ScrollView style={styles.container}>
				<View style={styles.datePicker}>
					<AntDesign
						onPress={() => changeDate(-1)}
						name="left"
						size={20}
						color={colors.lightGrey}
					/>
					<Pressable
						onPress={showDatepicker}
						style={styles.datePressable}
					>
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
					progress={progress}
				/>

				<View>
					<StepsGoal />
				</View>

				<View style={styles.values}>
					<Value label="Steps" value={healthData.steps.toString()} />
					<Value
						label="Distance"
						value={`${healthData.distance.toString()} km`}
					/>
					<Value label="Flights Climbed" value={healthData.flights.toString()} />
					<Value label="Kcal" value={healthData.calories} />
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
		marginTop: 50,
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
