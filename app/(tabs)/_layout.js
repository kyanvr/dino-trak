import { Tabs, router } from "expo-router";
import React from "react";
import {
	Ionicons,
	FontAwesome,
	Feather,
	MaterialIcons,
} from "@expo/vector-icons";
import colors from "@constants/colors";

export default function _layout() {
    return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: colors["grey-900"], borderTopColor: colors['grey-600'], height: 60,  },
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
							color={focused ? colors['green-400'] :colors['grey-600']}
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
							color={focused ? colors['green-400'] : colors['grey-600']}
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
							color={focused ? colors['green-400'] : colors['grey-600']}
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
							color={focused ? colors['green-400'] : colors['grey-600']}
						/>
					),
				}}
			/>
		</Tabs>
	);
}