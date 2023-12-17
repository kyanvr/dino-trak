import { RealmProvider, createRealmContext } from "@realm/react";
import { Stack } from "expo-router";
import React from "react";
import { schemas } from "./models";
import { User } from "./models/User";
import { Buddy } from "./models/Buddy";
import colors from "@constants/colors";
import { ToastProvider } from "react-native-toast-notifications";

export default function StackLayout() {
	const config = {
		schema: [User, Buddy],
		schemaVersion: 0,
		deleteRealmIfMigrationNeeded: true,
	};

	// const { RealmProvider} = createRealmContext(config);

	return (
		<ToastProvider
			placement="bottom | top"
			duration={5000}
			animationType="slide-in | zoom-in"
			animationDuration={250}
			successColor={colors.green}
			dangerColor="red"
			warningColor="orange"
			normalColor="gray"
			// icon={<Icon />}
			// successIcon={<SuccessIcon />}
			// dangerIcon={<DangerIcon />}
			// warningIcon={<WarningIcon />}
			textStyle={{
				fontSize: 16,
				color: colors.black,
				fontWeight: "bold",
			}}
			offset={50} // offset for both top and bottom toasts
			offsetTop={30}
			offsetBottom={40}
			swipeEnabled={true}
		>
			<RealmProvider schema={schemas}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(tabs)" />
				</Stack>
			</RealmProvider>
		</ToastProvider>
	);
}
