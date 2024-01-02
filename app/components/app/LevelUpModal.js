import React, { useEffect, useRef } from "react";
import { Modal, View, Text, StyleSheet, Animated, Image } from "react-native";
import dino from "@assets/dino.png";
import colors from "../../constants/colors";
import LottieView from "lottie-react-native";
import levelup from "@assets/lottie/levelup2.json";

const LevelUpModal = ({ visible, currentLevel }) => {
	const animatedValue = new Animated.Value(0);
	const animation = useRef(null);

    useEffect(() => {
		animation.current?.play()
	}, []);

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: visible ? 1 : 0,
			duration: 500,
			useNativeDriver: false,
		}).start();
	}, [visible]);

	return (
		<Modal transparent visible={visible} animationType="slide">
			<View style={styles.modalContainer}>
				<Image source={dino} style={styles.dino} />

				<View
					style={{
						flex: 1,
						position: "absolute",
						top: 100,
						right: "50%",
                        transform: [{ translateX: 150 }, { translateY: 150 }],
                        zIndex: -1,
					}}
				>
					<LottieView
						ref={animation}
						autoPlay
                        loop={false}
						source={levelup}
						style={{ width: 300, height: 300 }}
					/>
				</View>

				<View style={styles.modalContent}>
					<Text style={styles.modalText}>Congratulations!</Text>
					<Text style={styles.modalText}>
						Your buddy reached level{" "}
						<Text style={styles.level}>{currentLevel}</Text>
					</Text>
				</View>

				<View style={styles.triangle} />
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: colors["grey-100"],
		padding: 20,
		borderRadius: 10,
		elevation: 5,
		overflow: "hidden",
		position: "relative",
		zIndex: 1,
		height: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	modalText: {
		fontSize: 18,
		textAlign: "center",
		color: colors["grey-900"],
	},
	level: {
		fontWeight: "bold",
		color: colors["green-600"],
	},
	triangle: {
		width: 0,
		height: 0,
		borderStyle: "solid",
		borderLeftWidth: 15,
		borderRightWidth: 15,
		borderBottomWidth: 20,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderBottomColor: colors["grey-100"], // Match the modal content background color
		position: "absolute",
		bottom: 325, // Adjust the distance from the top of the card
		left: 85,
		zIndex: 2, // Ensure the triangle is above the modal content
		transform: [{ rotate: "180deg" }],
	},
	dino: {
		width: 300,
		position: "absolute",
		top: -50,
		left: -50,
		objectFit: "contain",
	},
});

export default LevelUpModal;
