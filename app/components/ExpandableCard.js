import React, { useState, useEffect, memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View, Image, Animated } from "react-native";
import colors from "../constants/colors";
import useHealthData from "@hooks/useHealthData";
import { debounce } from "lodash";
import progressFormat from "../utils/progressFormat";
import useLevelSystem from "@hooks/useLevelSystem";

const ExpandableCard = ({
	title,
	imageUrl,
	description,
	xp,
	completed,
	duration,
	target,
	onPress,
}) => {
	const [expanded, setExpanded] = useState(false);
	const [animation] = useState(new Animated.Value(0));
	const [progress, setProgress] = useState(0);
	const [weekly, setWeekly] = useState(false);
	const [monthly, setMonthly] = useState(false);
	const [stepsReached, setStepsReached] = useState(false);

	useEffect(() => {
		// Set weekly or monthly based on the challenge's duration
		switch (duration) {
			case "week":
				setWeekly(true);
				break;
			case "month":
				setMonthly(true);
				break;
			default:
				setWeekly(false);
				setMonthly(false);
				break;
		}
	}, [duration]);

	const { steps, flights, distance, calories } = useHealthData(
		new Date(),
		weekly,
		monthly
	);

	useEffect(() => {
		// Check if steps reached the target based on the duration
		switch (duration) {
			case "day":
				setStepsReached(steps >= target);
				setProgress(progressFormat(steps, target));
				break;
			case "week":
				const startOfWeek = new Date();
				startOfWeek.setDate(
					startOfWeek.getDate() - ((startOfWeek.getDay() + 6) % 7)
				);
				const endOfWeek = new Date();
				endOfWeek.setDate(
					endOfWeek.getDate() + (7 - endOfWeek.getDay())
				);
				setStepsReached(
					steps >= target &&
						steps >= 0 &&
						steps < target &&
						new Date() >= startOfWeek &&
						new Date() <= endOfWeek
				);
				setProgress(progressFormat(steps, target));
				break;
			case "month":
				const startOfMonth = new Date();
				startOfMonth.setDate(1);
				const endOfMonth = new Date(startOfMonth);
				endOfMonth.setMonth(endOfMonth.getMonth() + 1);
				endOfMonth.setDate(endOfMonth.getDate() - 1);
				setStepsReached(
					steps >= target &&
						steps >= 0 &&
						steps < target &&
						new Date() >= startOfMonth &&
						new Date() <= endOfMonth
				);
				setProgress(progressFormat(steps, target));
				break;
			default:
				setStepsReached(false);
				setProgress(0);
				break;
		}
	}, [duration, steps, target]);

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

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={toggleCard}
			style={{ paddingHorizontal: 20 }}
		>
			<Animated.View
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 16,
					marginBottom: 16,
					backgroundColor: colors["grey-800"],
					borderRadius: 8,
					overflow: "hidden",
					// height: cardHeight,
					width: "100%",
				}}
			>
				<Image
					source={require("@assets/test.png")}
					style={{
						width: 80,
						height: "100%",
						marginRight: 16,
						objectFit: "contain",
					}}
				/>
				<View style={{ flex: 1 }}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: "white",
						}}
					>
						{title}
					</Text>
					<View style={{ marginTop: 8 }}>
						<Text style={{ color: "white" }}>
							Progress: {progress}%
						</Text>
						<View
							style={{
								height: 8,
								backgroundColor: colors["grey-100"],
								borderRadius: 4,
								marginTop: 4,
							}}
						>
							<View
								style={{
									height: "100%",
									width: `${progress}%`,
									backgroundColor: colors["green-300"],
									borderRadius: 4,
								}}
							/>
						</View>
					</View>
					{expanded && (
						<View style={{ marginTop: 8 }}>
							<Text style={{ color: "white" }}>
								Description: {description}
							</Text>
							<Text style={{ color: "white" }}>XP: {xp}</Text>
							{stepsReached && (
								<TouchableOpacity
									style={{
										backgroundColor: colors["green-500"],
										padding: 8,
										borderRadius: 4,
										marginTop: 8,
									}}
									onPress={onPress}
								>
									<Text style={{ color: "white" }}>
										Claim Reward
									</Text>
								</TouchableOpacity>
							)}
						</View>
					)}
				</View>
			</Animated.View>
		</TouchableOpacity>
	);
};

export default ExpandableCard;
