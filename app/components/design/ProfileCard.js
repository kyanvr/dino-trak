import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import colors from "@constants/colors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileCard = ({ value, text, icon, loading }) => {
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
			{loading ? (
                <ActivityIndicator size="small" color={colors["grey-600"]} />
            ) : (
                <>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.text}>{text}</Text>
                </>
            )}
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		color: colors["grey-300"],
	},
	value: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors["grey-100"],
		marginVertical: 10,
	},
	card: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ProfileCard;
