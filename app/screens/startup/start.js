import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import icon from "@assets/icon.png";
import colors from "@constants/colors";
import { AntDesign } from "@expo/vector-icons";
import ViewContainer from "@components/design/ViewContainer";
import { router } from "expo-router";
import { useQuery, useRealm } from "@realm/react";
import { User } from "../../models/User";

export default function Start() {
	const realm = useRealm();
    const user = useQuery("User");

    useEffect(() => {
        if (user.length > 0) {
            router.push("/home");
        }
    }, []);

	function handlePress() {
		realm.write(() => {
			const user = new User(realm, "", "", "", "", false);

			return user;
		});

		router.push("/screens/startup/start2");
	}

	return (
		<ViewContainer style={styles.container}>
			<Image source={icon} style={styles.image} />
			<View style={styles.innerContainer}>
				<Text style={styles.text}>Start your journey!</Text>
				<TouchableOpacity style={styles.button} onPress={() => handlePress()}>
					<AntDesign
						name="arrowright"
						size={32}
						color={colors.black}
					/>
				</TouchableOpacity>
			</View>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
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
		backgroundColor: colors['green-400'],
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
		color: colors["grey-100"],
		fontSize: 20,
	},
});
