import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import RingProgress from "@components/design/RingProgress";
import useHealthData from "@hooks/useHealthData";
import Value from "@components/design/Value";
import colors from "@constants/colors";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import { formatDate } from "@utils/dateFormat";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useQuery, useRealm } from "@realm/react";
import StepsGoal from "@components/app/StepsGoal";
import progressFormat from "@utils/progressFormat";
import Avatar from "@components/app/Avatar";
import isObjectEmpty from "@utils/isObjectEmpty";
import ProgressModal from "@components/app/ProgressModal";

export default function App() {
	const [date, setDate] = useState(new Date());
	const [progress, setProgress] = useState(0);
	const [stepsGoal, setStepsGoal] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const { dailyData, loading, error } = useHealthData(date);
	const realm = useRealm();
	const user = useQuery("User")[0];

	// Update progress when daily data changes
	useEffect(() => {
		if (!loading && !isObjectEmpty(dailyData)) {
			return setProgress(progressFormat(dailyData.steps, stepsGoal));
		}
	}, [dailyData, loading, stepsGoal]);

	// Set initial steps goal
	useEffect(() => {
		setStepsGoal(user.daily_steps);
	}, [user]);

	// Update steps goal when user data changes
	user.addListener((user) => {
		setStepsGoal(user.daily_steps);
	});

	// Handle progress completion
	const onProgressComplete = () => {
		if (progress === 100) {
			setModalVisible(true);
			setTimeout(() => {
				setModalVisible(false);
			}, 3000);
		}
	};

	// Change date by a specified number of days
	const changeDate = (numDays) => {
		const currentDate = new Date(date);
		currentDate.setDate(currentDate.getDate() + numDays);
		setDate(currentDate);
	};

	// Handle date change
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
	};

	// Show date picker
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
			{/* Title and Avatar */}
			<Title text="History" />
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 20 }}
			/>

			{/* Date Picker */}
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
					style={{
						justifyContent: "center",
						width: 44,
						height: 44,
						alignItems: "flex-end",
					}}
				>
					<AntDesign
						name="right"
						size={20}
						color={colors["grey-300"]}
					/>
				</Pressable>
			</View>

			{/* Progress Modal */}
			<ProgressModal visible={modalVisible} />

			{/* Health Data */}
			<ScrollView
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}
			>
				{/* Ring Progress */}
				<RingProgress
					radius={150}
					strokeWidth={50}
					progress={progress}
					onAnimationComplete={onProgressComplete}
				/>

				{/* Steps Goal */}
				<View style={{ marginTop: 20 }}>
					<StepsGoal />
				</View>

				{/* Health Data Values */}
				<View style={styles.values}>
					<Value
						label="Steps"
						value={dailyData.steps}
						loading={loading}
					/>
					<Value
						label="Distance"
						value={`${dailyData.distance} km`}
						loading={loading}
					/>
					<Value
						label="Floors Climbed"
						value={dailyData.floors}
						loading={loading}
					/>
					<Value
						label="Kcal"
						value={dailyData.calories}
						loading={loading}
					/>
				</View>
			</ScrollView>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
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
