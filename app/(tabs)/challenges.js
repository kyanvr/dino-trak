import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ViewContainer from "@components/design/ViewContainer";
import Title from "@components/design/Title";
import ChallengeCard from "@components/design/ChallengeCard";
import ExpandableCard from "../components/ExpandableCard";
import { useQuery, useRealm } from "@realm/react";
import useLevelSystem from "@hooks/useLevelSystem";

export default function Challenges() {
    const { userLevel, userXP, awardXP } = useLevelSystem();
    const [level, setLevel] = useState(userLevel);
    const [xp, setXP] = useState(userXP);

    const realm = useRealm();
    const challenges = useQuery("Challenges");
    const buddy = useQuery("Buddy")[0];


    
    return (
        <ViewContainer>
            <Title text="Challenges" />
            <Text style={styles.text}>Your level: {buddy.level}</Text>
            <Text style={styles.text}>Your XP: {buddy.xp}</Text>
            <View style={styles.container}>
                {challenges.map((challenge, index) => {
                    return (
                        <ExpandableCard
                            key={index}
                            title={challenge.challenge_name}
                            completed={challenge.completed}
                            xp={challenge.xp}
                            description={challenge.challenge_description}
                            duration={challenge.duration}
                            target={challenge.challenge_goal}
                            onPress={() => {
                                awardXP(challenge.xp);
                                realm.write(() => {
                                    challenge.completed = true;
                                });
                            }}
                        />
                    );
                })}
            </View>
        </ViewContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
