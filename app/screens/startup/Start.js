import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import icon from "../../../assets/icon.png";
import colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons"; 

const Start = () => {
	return (
		<View style={styles.container}>
			<Image source={icon} style={styles.image} />
			<View style={styles.innerContainer}>
				<Text style={styles.text}>Start your journey!</Text>
				<Pressable style={styles.button}  onPress={() => {}}>
					<AntDesign name="arrowright" size={32} color={colors.black} />
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems: "center",
		backgroundColor: colors.black ,
	},
    innerContainer: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 150,
    },
    button: {
        backgroundColor: colors.green,
        borderRadius: 50,
        padding: 5,
        marginTop: 50,
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: colors.white,
        fontSize: 20,
    },
});

export default Start;
