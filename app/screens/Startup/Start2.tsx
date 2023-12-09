import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import goals from '../../constants/goals';
import colors from '../../constants/colors';
import { Button } from '../../components/design/Button';

const Start2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your ultimate goal?</Text>
      <View style={styles.innerContainer}>
          {goals.map((goal) => (
            <Pressable key={goal.id} onPress={() => {}} style={styles.goals}>
              <Text style={styles.text}>{goal.title}</Text>
            </Pressable>
        ))}
        </View>
        <Button onPress={() => {}} title="Continue" />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
        alignItems: 'center',
    },
    innerContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        width: "100%",
    },
    goals: {
        backgroundColor: colors.green,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 50,
        color: colors.white,
    },
    text: {
        fontSize: 16,
        color: colors.black,
    },
});

export default Start2;
