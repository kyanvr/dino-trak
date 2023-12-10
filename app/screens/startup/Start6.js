import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Title from '../../components/design/Title';
import { Button } from '../../components/design/Button';

const Start6 = () => {
    return (
		<View style={styles.container}>
			<Title text={"That's it!"} />
			<Button title="Start your journey" onPress={() => {}} />
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center", 
    },
});

export default Start6;