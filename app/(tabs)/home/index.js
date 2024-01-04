import React, { Suspense, useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	TouchableOpacity,
	Button,
} from "react-native";
import { Redirect, router } from "expo-router";
import { useQuery, useRealm } from "@realm/react";
import Avatar from "@components/app/Avatar";
import ViewContainer from "@components/design/ViewContainer";
import colors from "@constants/colors";
import Title from "@components/design/Title";
import DailyCard from "@components/app/DailyCard";
import Dino from "../../components/app/Dino";
import { Feather, Ionicons } from "@expo/vector-icons";
import Tooltip from "../../components/app/Tooltip";

export default function Home() {
	const [username, setUsername] = useState("");
	const realm = useRealm();
	const user = useQuery("User")[0];

	if (user === undefined) {
		return <Redirect href={"/screens/startup/start"} />;
	} else if (!user.onboarding_completed) {
		return <Redirect href={"/screens/startup/start"} />;
	}

	user.addListener((updatedUser) => {
		setUsername(updatedUser.username);
	});

	useEffect(() => {
		setUsername(user.username);
	}, [user]);

	return (
		<ViewContainer>
			<Pressable
				onPress={() => router.push("/home/homeSettings")}
				style={styles.settings}
			>
				<Ionicons
					name="ios-settings-sharp"
					size={24}
					color={colors["green-200"]}
				/>
			</Pressable>
			<Tooltip text={"This is a tooltip"} />
			<Avatar
				size={"small"}
				style={{ position: "absolute", top: 50, right: 30 }}
			/>

			<View style={{ flex: 1 }}>
				<Title text={"Hello there,"} subtitle={username} />
			</View>

			<View
				style={{
					flex: 2,
					alignSelf: "stretch",
					marginHorizontal: 20,
					marginBottom: 50,
				}}
			>
				<DailyCard />
			</View>

			<View style={{ flex: 3, alignSelf: "stretch" }}>
				<TouchableOpacity
					onPress={() => router.push("/home/modal")}
					style={{
						position: "absolute",
						top: 0,
						right: 20,
						width: 44,
						height: 44,
					}}
				>
					<Feather
						name="edit"
						size={24}
						color={colors["green-200"]}
					/>
				</TouchableOpacity>
				<Dino screen={"home"} />
			</View>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	settings: {
		position: "absolute",
		top: 50,
		left: 20,
		width: 40,
		height: 40,
	},
});
