import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
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
    // const [progress, setProgress] = useState(0);
	const { healthData, loading, error } = useHealthData(date, false, false);
	const realm = useRealm();
	const user = useQuery("User")[0];
	const [stepsGoal, setStepsGoal] = useState(0);
    // const stepsGoal = user.daily_steps;
    const progress = progressFormat(healthData.steps, stepsGoal);
    console.log(progress);

    // useEffect(() => {
    //     updateProgress();
    // }, [stepsGoal, date]);

    // const updateProgress = () => {
    //     const progress = progressFormat(healthData.steps, stepsGoal);
    //     setProgress(progress);
    // }

    user.addListener((user) => {
		setStepsGoal(user.daily_steps);
	});

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
			<View style={styles.datePicker}>
				<Pressable
					style={{
						justifyContent: "center",
                        alignItems: "flex-start",
                        width: 44,
                        height: 44,
					}}
					onPress={() => changeDate(-1)}
				>
					<AntDesign
						name="left"
						size={20}
						color={colors["grey-300"]}
					/>
				</Pressable>

				<Pressable
					onPress={showDatepicker}
					style={styles.datePressable}
				>
					<Text style={styles.date}>{formatDate(date)}</Text>
					<MaterialIcons
						name="date-range"
						size={24}
						color={colors["green-200"]}
                        style={{ marginLeft: 10 }}
					/>
				</Pressable>

				<Pressable
					onPress={() => changeDate(1)}
					style={{ justifyContent: "center", width: 44, height: 44, alignItems: "flex-end" }}
				>
					<AntDesign
						name="right"
						size={20}
						color={colors["grey-300"]}
					/>
				</Pressable>
			</View>
			<ScrollView style={styles.container}>
				<RingProgress
					radius={150}
					strokeWidth={50}
					progress={progress}
				/>

				<View>
					<StepsGoal />
				</View>

				<View style={styles.values}>
					<Value label="Steps" value={healthData.steps} loading={loading} />
					<Value
						label="Distance"
						value={`${healthData.distance} km`}
						loading={loading}
					/>
					<Value
						label="Flights Climbed"
						value={healthData.flights}
						loading={loading}
					/>
					<Value
						label="Kcal"
						value={healthData.calories}
						loading={loading}
					/>
				</View>
			</ScrollView>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
	},
	values: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 25,
		flexWrap: "wrap",
		marginTop: 50,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	datePicker: {
		alignItems: "stretch",
		justifyContent: "center",
		flexDirection: "row",
		marginBottom: 20,
		paddingHorizontal: 20,
		justifyContent: "center",
	},
	date: {
		color: colors["grey-100"],
		fontWeight: "500",
		fontSize: 20,
	},
	datePressable: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		backgroundColor: colors["grey-800"],
        borderRadius: 10,
	},
});
