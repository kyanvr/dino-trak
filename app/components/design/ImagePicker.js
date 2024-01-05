import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import colors from "@constants/colors";

const ImagePicker = ({ onPress, image }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: image }} style={styles.avatar} />
			<TouchableOpacity onPress={onPress} style={styles.btn}>
				<Text style={styles.text}>Choose avatar</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		alignSelf: "stretch",
	},
	avatar: {
		height: 200,
		width: 200,
		borderRadius: 100,
		marginBottom: 20,
		objectFit: "cover",
	},
	btn: {
		height: 40,
		borderRadius: 10,
		backgroundColor: colors["grey-700"],
		paddingVertical: 10,
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: colors["grey-300"],
	},
});

export default ImagePicker;
