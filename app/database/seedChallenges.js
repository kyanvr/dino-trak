import { useQuery, useRealm } from "@realm/react";
import challenges from "@constants/challenges";
import { Challenges } from "../models/Challenges";

export default async function populateChallenges() {
	try {
		const realm = useRealm();
		const challengesDB = useQuery("Challenges");

		if (challengesDB.length > 0) {
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
                    challenge.duration,
                    challenge.type
				);

				return newChallenge;
			});
		});
	} catch (error) {
		throw new Error(error);
	}
}
