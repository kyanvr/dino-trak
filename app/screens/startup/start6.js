import React from 'react';
import { StyleSheet, View } from 'react-native';
import Title from '@components/design/Title';
import Button from '@components/design/Button';
import ViewContainer from '@components/design/ViewContainer';
import { router } from 'expo-router';
import { useQuery, useRealm } from '@realm/react';

export default function Start6 () {
    const realm = useRealm();
    const user = useQuery("User");

    function handlePress() {
        realm.write(() => {
            user[0].onboarding_completed = true;
        });

        router.push("/home");
    }

    return (
		<ViewContainer style={styles.container}>
			<Title text={"That's it!"} />
			<Button title="Start your journey" onPress={() => handlePress()} />
		</ViewContainer>
	);
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});
