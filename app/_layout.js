import { RealmProvider } from "@realm/react";
import { Stack } from "expo-router";
import React from "react";
import { schemas } from "./models";

export default function StackLayout() {
	return (
		<RealmProvider schema={schemas}>
			<Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)"/>
			</Stack>
		</RealmProvider>
	);
}
