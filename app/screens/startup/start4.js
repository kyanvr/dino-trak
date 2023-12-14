import React, { useRef } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from "react-native";
import Title from "@components/design/Title";
import Button from "@components/design/Button";
import InputText from "@components/design/InputText";
import ViewContainer from "@components/design/ViewContainer";
import { useQuery, useRealm } from "@realm/react";
import { router } from "expo-router";
import dino from "@assets/dino.png";
import { Buddy } from "../../models/Buddy";

const Start4 = () => {
    const realm = useRealm();
	const buddyNameRef = useRef("");

	function handlePress() {
		realm.write(() => {
			const buddy = new Buddy(realm, buddyNameRef.current, 1, "");

			return buddy;
		});

		router.push("/screens/startup/start5");
	}

	return (
        <ViewContainer style={styles.container}>
				<Title text="This will be your dinosaur buddy!" />
                <ScrollView style={styles.scroll}>
				<View style={styles.innerContainer}>
					{/* dino three.js */}
					{/* instead i'll show a picture of him */}
					<Image source={dino} style={styles.image} />
					<InputText
						placeholder="Buddy"
						onChangeText={(text) => {
							buddyNameRef.current = text;
						}}
					/>
				</View>
				<Button title="Continue" onPress={() => handlePress()} />
		</ScrollView>
			</ViewContainer>
	);
};

const styles = StyleSheet.create({
	container: {
        paddingTop: 100,
        paddingHorizontal: 20,
	},
    innerContainer: {
        alignSelf: "stretch",
    },
    image: {
        alignSelf: "center",
        width: 300,
        height: 300,
        objectFit: "contain",
        marginBottom: 50,
    },
    scroll: {
        flex: 1,
        // backgroundColor: "red",
    }
});

export default Start4;
