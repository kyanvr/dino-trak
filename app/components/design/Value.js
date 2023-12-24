import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

const Value = ({ label, value, loading }) => (
	<View>
		<Text style={styles.label}>{label}</Text>
		{loading ? (
			<ActivityIndicator size="small" color={colors["grey-600"]} />
		) : (
			<Text style={styles.value}>{value}</Text>
		)}
	</View>
);

const styles = StyleSheet.create({
	label: {
		color: colors["grey-300"],
		fontSize: 20,
	},
	value: {
		fontSize: 45,
		color: colors["grey-100"],
		fontWeight: "500",
	},
});

export default Value;
