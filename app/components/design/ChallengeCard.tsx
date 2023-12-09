import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import colors from '../../constants/colors';
import AbsoluteComponent from './AbsoluteComponent';

const ChallengeCard = ({ title , description , progress, completed }) => {
  return (
		<View style={styles.container}>
			<AbsoluteComponent>
				<Pressable style={completed ? styles.btnCompleted : styles.btnNotCompleted}>
					<Text style={styles.rewardTitle}>Earn reward</Text>
				</Pressable>
			</AbsoluteComponent>
			<View style={completed ? styles.completed : styles.cardContainer}>
				<Image
					source={require("../../../assets/test.png")}
					style={styles.image}
				/>
				<View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
					<Text style={styles.description}>{progress}</Text>
				</View>
			</View>
			
		</View>
  );
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
	},
	image: {
		width: 100,
		height: 100,
		objectFit: "cover",
	},
	cardContainer: {
		width: 300,
		// height: 150,
		backgroundColor: colors.darkGrey,
		borderRadius: 10,
		padding: 20,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.white,
	},
	description: {
		fontSize: 16,
		color: colors.white,
	},
	rewardTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.black,
	},
    completed: {
        width: 300,
        height: 150,
        backgroundColor: colors.darkGrey,
        borderRadius: 10,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        opacity: 0.5,
    },
    btnCompleted: {
        // position: "absolute",
        alignItems: "center",
		justifyContent: "center",
        zIndex: 999,
        width: 150,
        height: 50,
        backgroundColor: colors.green,
        borderRadius: 10,
        padding: 10,
        opacity: 1,
    },
    btnNotCompleted: {
       display: "none",
    }
});

export default ChallengeCard;
