import { Tabs, router } from "expo-router";
import React from "react";
import { Button } from "react-native";
import {
	Ionicons,
	FontAwesome,
	Feather,
	MaterialIcons,
} from "@expo/vector-icons";
import colors from "../constants/colors";

export default function _layout() {
    return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: colors.black },
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					tabBarLabelStyle: { display: "none" },
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name="dashboard"
							size={24}
							color={focused ? colors.green : colors.grey}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="challenges"
				options={{
					tabBarLabelStyle: { display: "none" },
					tabBarIcon: ({ focused }) => (
						<Feather
							name="target"
							size={24}
							color={focused ? colors.green : colors.grey}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					tabBarLabelStyle: { display: "none" },
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="stats-chart"
							size={24}
							color={focused ? colors.green : colors.grey}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarLabelStyle: { display: "none" },
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name="user"
							size={24}
							color={focused ? colors.green : colors.grey}
						/>
					),
				}}
			/>
		</Tabs>
	);
}