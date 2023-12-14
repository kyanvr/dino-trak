import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import colors from "./constants/colors";
import { useFonts, OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import StackLayout from "./_layout";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function AppWrapper() {
	let [fontsLoaded, fontError] = useFonts({
		OpenSans: OpenSans_400Regular,
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<SafeAreaView style={styles.screen} onLayout={onLayoutRootView}>
			<StackLayout />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.black,
		fontFamily: "OpenSans",
	},
});
