import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Home () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Home screen!</Text>
            {/* <Link href={"screens/Settings"}>
                <Text>Go to the Settings screen</Text>
            </Link> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
