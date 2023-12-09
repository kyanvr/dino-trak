import React from 'react';
import { View, Text, StyleSheet, Image, ProgressBarAndroidComponent, Pressable } from 'react-native';
import Title from '../../components/design/Title';
import colors from '../../constants/colors';
import ChallengeCard from '../../components/design/ChallengeCard';
import AbsoluteComponent from '../../components/design/AbsoluteComponent';
import { Button } from '../../components/design/Button';

const Start5 = () => {
    return (
		<View style={styles.container}>
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
				<ChallengeCard
					title={"Challenge 3"}
					description={"Description 3"}
					progress={"0/2"}
					completed={false}
				/>
			</View>
			<Button title="Continue" onPress={() => {}} />
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
    }
});

export default Start5;
