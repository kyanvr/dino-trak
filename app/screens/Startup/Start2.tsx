import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import goals from '../../constants/goals';
import colors from '../../constants/colors';

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
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.textBtn}>Continue</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
        backgroundColor: colors.primary,
        paddingBottom: 10,
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
    button: {
        backgroundColor: colors.primary,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        marginTop: 150,
        alignSelf: "stretch",
        alignItems: "center",
    },
    textBtn: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
    },
});

export default Start2;
