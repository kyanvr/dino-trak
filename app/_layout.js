import { RealmProvider, createRealmContext } from "@realm/react";
import { Stack } from "expo-router";
import React from "react";
import { schemas } from "./models";
import { User } from "./models/User";
import { Buddy } from "./models/Buddy";

export default function StackLayout() {
    const config = {
        schema: [User, Buddy],
		schemaVersion: 0,
		deleteRealmIfMigrationNeeded: true,
	};

    // const { RealmProvider} = createRealmContext(config);

	return (
		<RealmProvider schema={schemas}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
			</Stack>
		</RealmProvider>
	);
}
