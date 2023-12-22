import { useQuery, useRealm } from "@realm/react";
import challenges from "@constants/challenges";
import { Challenges } from "../models/Challenges";

export default async function populateChallenges() {
	try {
		const realm = useRealm();
		const challengesDB = useQuery("Challenges");

		if (challengesDB.length > 0) {
			console.log("Challenges already populated");
            return;
		}

		challenges.forEach((challenge) => {
			realm.write(() => {
				const newChallenge = new Challenges(
					realm,
					challenge.challenge_name,
					challenge.xp,
					challenge.completed,
					challenge.challenge_description,
					challenge.challenge_goal,
                    challenge.duration
				);

				return newChallenge;
			});
		});

		console.log("Challenges populated successfully!");
	} catch (error) {
		console.error("Error populating challenges:", error);
	}
}
