import { useQuery, useRealm } from "@realm/react";
import { Link, router } from "expo-router";
import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import useImagePicker from "../../hooks/useImagePicker";


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
		<Pressable
			onPress={() => router.push("/profile")}
			style={[styles.avatarContainer, getSizeStyles(), style]}
		>
			<Image source={{uri: avatar}} style={styles.avatarImage} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	avatarContainer: {
		borderRadius: 999,
		overflow: "hidden",
		width: 44,
		height: 44,
	},
	avatarImage: {
		flex: 1,
		width: null,
		height: null,
	},
});

export default Avatar;
