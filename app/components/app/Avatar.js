import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const Avatar = ({ size, style }) => {
	const realm = useRealm();
	const user = useQuery("User")[0];
	const avatar = user.avatar;

	const getSizeStyles = () => {
		switch (size) {
			case "small":
				return { width: 50, height: 50 };
			case "medium":
				return { width: 75, height: 75 };
			case "large":
				return { width: 100, height: 100 };
			default:
				return { width: size || 60, height: size || 60 };
		}
	};

	return (
		<TouchableOpacity
			onPress={() => router.push("/profile")}
			style={[styles.avatarContainer, getSizeStyles(), style]}
		>
			<Image source={{ uri: avatar }} style={styles.avatarImage} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	avatarContainer: {
		borderRadius: 999,
		overflow: "hidden",
	},
	avatarImage: {
		flex: 1,
		width: null,
		height: null,
	},
});

export default Avatar;
