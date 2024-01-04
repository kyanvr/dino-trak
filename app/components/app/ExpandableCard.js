// ExpandableCard.js
import React, { useState, useEffect, memo, useCallback } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	Animated,
} from "react-native";
import colors from "../../constants/colors";
import progressFormat from "../../utils/progressFormat";
import Button from "../design/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ExpandableCard({
	title,
	description,
	xp,
	completed,
	duration,
	target,
	onPress,
	type,
	healthData,
	loading,
}) {
	const [expanded, setExpanded] = useState(false);
	const [animation] = useState(new Animated.Value(0));
	const [progress, setProgress] = useState(0);
	const [stepsReached, setStepsReached] = useState(false);
	const [weekly, setWeekly] = useState(false);
	const [monthly, setMonthly] = useState(false);
	const [steps, setSteps] = useState(0);

	useEffect(() => {
		// check if healthData is passed in
		if (healthData.steps) {
			setSteps(healthData.steps);
		}
	}, [healthData]);

	useEffect(() => {
		const [startDate, endDate] = calculateDateRange();
		setWeekly(startDate !== endDate);
		setMonthly(startDate.getMonth() !== endDate.getMonth());
		updateProgress();
	}, [duration, steps, target]);

	const calculateDateRange = () => {
		const today = new Date();
		switch (duration) {
			case "day":
				return [today, today];
			case "week":
				const startOfWeek = new Date(today);
				startOfWeek.setDate(
					today.getDate() - ((today.getDay() + 6) % 7)
				);
				const endOfWeek = new Date(today);
				endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
				return [startOfWeek, endOfWeek];
			case "month":
				const startOfMonth = new Date(today);
				startOfMonth.setDate(1);
				const endOfMonth = new Date(startOfMonth);
				endOfMonth.setMonth(endOfMonth.getMonth() + 1);
				endOfMonth.setDate(endOfMonth.getDate() - 1);
				return [startOfMonth, endOfMonth];
			default:
				return [today, today];
		}
	};

	const updateProgress = () => {
		const [startDate, endDate] = calculateDateRange();
		setStepsReached(
			steps >= target &&
				steps >= 0 &&
				startDate <= new Date() &&
				new Date() <= endDate
		);
		setProgress(progressFormat(steps, target));
	};

	const toggleCard = () => {
		const toValue = expanded ? 0 : 1;

		Animated.timing(animation, {
			toValue,
			duration: 300,
			useNativeDriver: true,
		}).start();

		setExpanded(!expanded);
	};

	if (completed) {
		return null;
	}

	if (loading) {
		return null;
	}

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={toggleCard}
			style={styles.container}
		>
			<Animated.View style={styles.card}>
				{stepsReached && (
					<View style={styles.checkmarkContainer}>
						<MaterialCommunityIcons
							name="progress-check"
							size={24}
							color={colors["grey-900"]}
						/>
					</View>
				)}
				<View style={styles.content}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.progressContainer}>
						<Text style={styles.progressText}>
							Progress: {progress}%
						</Text>
						<View style={styles.progressBar}>
							<View
								style={[
									styles.progressFill,
									{ width: `${progress}%` },
								]}
							/>
						</View>
					</View>
					{expanded && (
						<View style={styles.additionalInfo}>
							<Text style={styles.additionalText}>
								{description}
							</Text>
							<Text style={styles.additionalText}>{xp} XP</Text>
							{stepsReached && (
								<Button
									title="Complete challenge"
									onPress={onPress}
								/>
							)}
						</View>
					)}
				</View>
			</Animated.View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		marginBottom: 16,
		backgroundColor: colors["grey-800"],
		borderRadius: 8,
		overflow: "hidden",
		width: "100%",
		position: "relative",
	},
    checkmarkContainer: {
        position: "absolute",
        backgroundColor: colors["green-500"],
        borderRadius: 50,
        top: 20,
        right: 20,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
	content: {
		flex: 1,
        gap: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors["grey-100"],
	},
	progressContainer: {
		marginTop: 8,
	},
	progressText: {
		color: colors["grey-100"],
	},
	progressBar: {
		height: 8,
		backgroundColor: colors["grey-100"],
		borderRadius: 4,
		marginTop: 4,
		flexDirection: "row",
	},
	progressFill: {
		height: "100%",
		backgroundColor: colors["green-300"],
		borderRadius: 4,
	},
	additionalInfo: {
		marginTop: 8,
        gap: 8,
	},
	additionalText: {
		color: colors["grey-200"],
	},
	rewardButton: {
		backgroundColor: colors["green-500"],
		padding: 8,
		borderRadius: 4,
		marginTop: 8,
	},
	rewardButtonText: {
		color: "white",
	},
});

// export default ExpandableCard;
