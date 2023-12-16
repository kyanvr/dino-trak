import { View, Text, StyleSheet } from "react-native";
import colors from "@constants/colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileCard = ({ value, text, icon }) => {
	return (
		<View style={styles.card}>
			{icon === "stairs" ? (
				<MaterialCommunityIcons
					name={icon}
					size={40}
					color={colors.green}
				/>
			) : (
				<FontAwesome5 name={icon} size={40} color={colors.green} />
			)}
			<Text style={styles.value}>{value}</Text>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		color: colors.lightGrey,
	},
	value: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.white,
		marginVertical: 10,
	},
	card: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ProfileCard;
