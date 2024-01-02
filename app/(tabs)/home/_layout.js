import { Stack } from "expo-router";

export default function _layout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				// tabBarStyle: { display: "none" },
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="homeSettings" />
			<Stack.Screen
				name="modal"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
