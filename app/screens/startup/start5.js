import React from 'react';
import { View, Text, StyleSheet, Image, ProgressBarAndroidComponent, Pressable } from 'react-native';
import Title from '@components/design/Title';
import ChallengeCard from '@components/design/ChallengeCard';
import Button from '@components/design/Button';
import ViewContainer from '@components/design/ViewContainer';
import { router } from 'expo-router';

export default function Start5 () {

    function handlePress() {
        router.push("/screens/startup/start6");
    }

    return (
		<ViewContainer style={styles.container}>
			<Title text={"Complete challenges to evolve your buddy!"} />
			<View style={styles.innerContainer}>
				<ChallengeCard
					title={"Challenge 1"}
					description={"Description 1"}
					progress={"0/2"}
					completed={true}
				/>
				<ChallengeCard
					title={"Challenge 2"}
					description={"Description 2"}
					progress={"0/2"}
					completed={false}
				/>
			</View>
			<Button title="Continue" onPress={() => handlePress()} />
		</ViewContainer>
	);
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 20,
    },
    innerContainer: {
        // flex: 1,
        alignItems: 'center',
        gap: 20,
    }
});
