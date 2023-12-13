import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Title from "../../components/design/Title";
import { Button } from "../../components/design/Button";
import colors from "../../constants/colors";
import InputText from "../../components/design/InputText";

const Start4 = () => {
	return (
		<View>
			<Title text="This will be your dinosaur buddy! Give him a name" />
			<View>
				{/* dino three.js */} 
				<InputText placeholder="Buddy" />
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
});

export default Start4;
