import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Tooltip = () => {
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const tooltipRef = useRef(null);

	const toggleTooltip = () => {
		setTooltipVisible(!tooltipVisible);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleTooltip} ref={tooltipRef}>
				{tooltipVisible ? (
					<Ionicons
						name="ios-information-circle"
						size={32}
						color={colors["green-200"]}
					/>
				) : (
					<Ionicons
						name="ios-information-circle-outline"
						size={32}
						color={colors["green-200"]}
					/>
				)}
			</TouchableOpacity>

			{tooltipVisible && (
				<View style={styles.tooltipContainer}>
					<Text style={styles.tooltipText}>
						Grafische en Digitale Media
					</Text>
					<Text>@ Arteveldehogeschool</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
        alignSelf: "flex-start",
        zIndex: 100,
        top: 75,
        left: 20,
	},
	tooltipContainer: {
		position: "absolute",
		backgroundColor: colors["green-200"],
		padding: 8,
		borderRadius: 4,
		top: -8,
		left: 50,
        width: 200,
        alignItems: "center"
	},
	tooltipText: {
		color: colors["grey-900"],
	},
});

export default Tooltip;
