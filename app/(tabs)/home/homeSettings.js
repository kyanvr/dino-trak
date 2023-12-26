import { useQuery, useRealm } from '@realm/react';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BackButton from '@components/design/BackButton';

const HomeSettings = () => {

    const realm = useRealm();
    const user = useQuery("User")[0];
    const buddy = useQuery("Buddy")[0];

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
	};

	const clearBuddyLevelAndXP = () => {
		realm.write(() => {
			buddy.level = 1;
			buddy.xp = 0;
		});

		console.log("Cleared buddy level and XP");
	};

    return (
		<View style={styles.container}>
            <BackButton title={'back'} />
			{/* Add your settings components here */}
			<View style={{ gap: 20 }}>
				<Button
					title="Delete all data"
					onPress={() => deleteAllData()}
				/>
				<Button
					title="Delete challenges"
					onPress={() => deleteChallenges()}
					style={{ marginTop: 10 }}
				/>
				<Button
					title="Clear buddy level and XP"
					onPress={() => clearBuddyLevelAndXP()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default HomeSettings;
