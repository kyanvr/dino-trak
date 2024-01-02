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
import { debounce } from "lodash";
import progressFormat from "../../utils/progressFormat";
import Button from "../design/Button";

export default function ExpandableCard({
	title,
	imageUrl,
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
		// Set initial health data
		setSteps(healthData.steps);
	}, [healthData.steps]);

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
				<Image
					source={require("@assets/test.png")}
					style={styles.image}
				/>
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
								Description: {description}
							</Text>
							<Text style={styles.additionalText}>XP: {xp}</Text>
							{stepsReached && (
								<Button
									title="Claim Reward"
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
	container: {
		paddingHorizontal: 20,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		marginBottom: 16,
		backgroundColor: colors["grey-800"],
		borderRadius: 8,
		overflow: "hidden",
		width: "100%",
	},
	image: {
		width: 80,
		height: "100%",
		marginRight: 16,
		objectFit: "contain",
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "white",
	},
	progressContainer: {
		marginTop: 8,
	},
	progressText: {
		color: "white",
	},
	progressBar: {
		height: 8,
		backgroundColor: colors["grey-100"],
		borderRadius: 4,
		marginTop: 4,
	},
	progressFill: {
		height: "100%",
		backgroundColor: colors["green-300"],
		borderRadius: 4,
	},
	additionalInfo: {
		marginTop: 8,
	},
	additionalText: {
		color: "white",
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
