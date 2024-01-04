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
import BackButton from "@components/design/BackButton";
import { useToast } from "react-native-toast-notifications";

const Start4 = () => {
    const realm = useRealm();
	const buddyNameRef = useRef("");
    const toast = useToast();

	function handlePress() {
		if (buddyNameRef.current === "") {
            toast.show("Enter a name for your buddy", {
                type: "warning",
                placement: "bottom",
                duration: 3000,
                offset: 50,
                animationType: "slide-in",
            });

            return;
        }

        realm.write(() => {
			const buddy = new Buddy(realm, buddyNameRef.current, 1, 0, "", "");

			return buddy;
		});

		router.push("/screens/startup/start5");
	}

	return (
		<ViewContainer style={styles.container}>
			<Title text="This will be your dinosaur buddy!" />
			<ScrollView style={styles.scroll}>
				<View style={styles.innerContainer}>
					<Image source={dino} style={styles.image} />
					<InputText
						placeholder="Buddy"
						onChangeText={(text) => {
							buddyNameRef.current = text;
						}}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						onPress={() => {
							handlePress();
						}}
						title="Continue"
					/>
					<BackButton title="Back" onPress={() => router.back()} />
				</View>
			</ScrollView>
		</ViewContainer>
	);
};

const styles = StyleSheet.create({
	container: {
        paddingTop: 50,
        paddingHorizontal: 20,
	},
    innerContainer: {
        alignSelf: "stretch",
        marginBottom: 50,
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
    },
    buttonContainer: {
        alignSelf: "stretch",
        alignItems: "center",
        gap: 20,
    },
});

export default Start4;
