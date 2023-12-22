import { useQuery, useRealm } from "@realm/react";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { Redirect } from "expo-router";
import populateChallenges from "../database/seedChallenges";
import Avatar from "../components/design/Avatar";
import ViewContainer from "../components/design/ViewContainer";

export default function Home() {
	const [username, setUsername] = useState("");
	const [avatar, setAvatar] = useState("");
    const [buddy_name, setBuddyName] = useState("");

	const realm = useRealm();
	const user = useQuery("User")[0];
	const buddy = useQuery("Buddy")[0];

    populateChallenges();

    if (user === undefined || buddy === undefined) {
        return <Redirect href={"/screens/startup/start"} />;
    } else if (user.onboarding_completed === false) {
        <Redirect href={"/screens/startup/start"} />;
    }

	user.addListener((user) => {
		setUsername(user.username);
		setAvatar(user.avatar);
	});

    buddy.addListener((buddy) => {
        setBuddyName(buddy.buddy_name);
    });

	useEffect(() => {
		setUsername(user.username);
		setAvatar(user.avatar);
        setBuddyName(buddy.buddy_name);
	}, []);

	const deleteAllData = () => {
		realm.write(() => {
			realm.deleteAll();
		});

		console.log("Deleted all data");
	};

    const deleteChallenges = () => {
        realm.write(() => {
            realm.delete(realm.objects("Challenges"));
        });

        console.log("Deleted challenges");
    }

    const clearBuddyLevelAndXP = () => {
        realm.write(() => {
            buddy.level = 1;
            buddy.xp = 0;
        });

        console.log("Cleared buddy level and XP");
    }

	return (
		<ViewContainer style={styles.container}>
			<Avatar source={{ uri: avatar }} size={"small"} style={{position: "absolute", top: 50, right: 30}} />
			<Text style={styles.text}>{username}</Text>
			<Text style={styles.text}>{buddy_name}</Text>
			{/* <Text style={styles.text}>Welcome to the Home screen!</Text> */}
			<Button title="Delete all data" onPress={() => deleteAllData()} />
            <Button title="Delete challenges" onPress={() => deleteChallenges()} />
            <Button title="Clear buddy level and XP" onPress={() => clearBuddyLevelAndXP()} />
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
        color: "white",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 100,
		marginBottom: 16,
	},
});
