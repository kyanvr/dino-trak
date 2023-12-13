import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import ImagePickerExample from "../../components/design/ImagePicker";
import { Button } from "../../components/design/Button";

const Start3 = () => {
	return (
		<View>
			<Text style={styles.title}>Choose a username and an avatar</Text>
			<View>
				<TextInput placeholder="Username" placeholderTextColor={colors.lightGrey} style={styles.input} />
                {/* <ImagePickerExample /> */}
			</View>
            <Button title="Continue" onPress={() => {}} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 50,
		color: colors.white,
	},
	input: {
		height: 40,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		backgroundColor: colors.grey,
		color: colors.lightGrey,
		fontSize: 16,
	},
});

export default Start3;
