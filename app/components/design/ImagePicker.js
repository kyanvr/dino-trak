import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import colors from "@constants/colors";
import placeholder from "@assets/avatar_placeholder.png";

const ImagePicker = ({ onPress, image }) => {
	return (
		<View style={styles.container}>
			<Image source={image ? {uri: image} : placeholder} style={styles.avatar} />
			<TouchableOpacity onPress={onPress} style={styles.btn}>
				<Text>Choose avatar</Text>
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
		width: 100,
		borderRadius: 10,
		backgroundColor: colors.green,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ImagePicker;
