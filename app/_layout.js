import { RealmProvider, createRealmContext, useRealm } from "@realm/react";
import { Stack } from "expo-router";
import React from "react";
import { schemas } from "./models";
import { User } from "./models/User";
import { Buddy } from "./models/Buddy";
import colors from "@constants/colors";
import { ToastProvider } from "react-native-toast-notifications";
import "react-native-get-random-values";
import { CombinationProvider } from "./hooks/useCombination";

export default function StackLayout() {
	const config = {
		schema: [User, Buddy],
		schemaVersion: 0,
		deleteRealmIfMigrationNeeded: true,
	};

	// uncomment this line to skip the migration if needed
	// const { RealmProvider} = createRealmContext(config);

	return (
		<ToastProvider
			placement="bottom | top"
			duration={5000}
			animationType="slide-in | zoom-in"
			animationDuration={250}
			successColor={colors["green-300"]}
			dangerColor={colors.danger}
			warningColor={colors.warning}
			normalColor="gray"
			textStyle={{
				fontSize: 16,
				color: colors["grey-900"],
				fontWeight: "bold",
			}}
			offset={50} // offset for both top and bottom toasts
			offsetTop={30}
			offsetBottom={40}
			swipeEnabled={true}
		>
			<RealmProvider schema={schemas}>
				<CombinationProvider>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="(tabs)" />
					</Stack>
				</CombinationProvider>
			</RealmProvider>
		</ToastProvider>
	);
}
