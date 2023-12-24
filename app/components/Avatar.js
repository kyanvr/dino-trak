import { useQuery, useRealm } from "@realm/react";
import React from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";

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
		<SafeAreaView style={[styles.avatarContainer, getSizeStyles(), style]}>
			<Image source={{uri: avatar}} style={styles.avatarImage} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	avatarContainer: {
		borderRadius: 999, // Use a large value for a circular shape
		overflow: "hidden",
	},
	avatarImage: {
		flex: 1,
		width: null,
		height: null,
	},
});

export default Avatar;