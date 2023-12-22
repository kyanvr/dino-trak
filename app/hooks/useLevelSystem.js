import { useQuery, useRealm } from "@realm/react";
import { useState, useEffect } from "react";

const useLevelSystem = () => {
	const [userXP, setUserXP] = useState(0);
    const realm = useRealm();
    const buddy = useQuery("Buddy")[0];

	const calculateXPRequired = (level) => {
		return Math.floor(100 * Math.pow(1.2, level));
	};

	const calculateLevel = (xp) => {
		let level = 1;
		let xpRequired = calculateXPRequired(level);

		while (xp >= xpRequired) {
			xp -= xpRequired;
			level += 1;
			xpRequired = calculateXPRequired(level);
		}

		return level;
	};

	const checkLevelUp = () => {
		const currentLevel = calculateLevel(userXP);
		// Optionally, provide level-up rewards here

		// Display level-up message or update UI if needed
		console.log(`Congratulations! You reached Level ${currentLevel}`);
	};

	const awardXP = (baseXP, bonusMultiplier = 1) => {
		const totalXP = baseXP * bonusMultiplier;
        realm.write(() => {
			buddy.level = calculateLevel(buddy.xp + totalXP);
			buddy.xp += totalXP;
		});
		setUserXP((prevXP) => prevXP + totalXP);
	};

	useEffect(() => {
		checkLevelUp();
	}, [userXP]); // Run checkLevelUp whenever userXP changes

	return {
		userLevel: calculateLevel(userXP),
		userXP,
		awardXP,
	};
};

export default useLevelSystem;
