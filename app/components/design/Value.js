import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

const Value = ({ label, value }) => (
	<View>
		<Text style={styles.label}>{label}</Text>
		<Text style={styles.value}>{value}</Text>
	</View>
);

const styles = StyleSheet.create({
	label: {
		color: colors.lightGrey,
		fontSize: 20,
	},
	value: {
		fontSize: 45,
		color: colors.white,
		fontWeight: "500",
	},
});

export default Value;
