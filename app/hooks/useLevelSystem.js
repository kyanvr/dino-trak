import { useQuery, useRealm } from "@realm/react";
import { useState, useEffect } from "react";
import LevelUpModal from "../components/LevelUpModal";

const useLevelSystem = () => {
	const [buddyXP, setbuddyXP] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
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
		const currentLevel = calculateLevel(buddyXP);

        if (currentLevel === 1) return;

        setModalVisible(true);

		// You might want to close the modal after a certain duration
		setTimeout(() => {
			setModalVisible(false);
		}, 3000);
	};

	const awardXP = (baseXP, bonusMultiplier = 1) => {
		const totalXP = baseXP * bonusMultiplier;
        realm.write(() => {
			buddy.level = calculateLevel(buddy.xp + totalXP);
			buddy.xp += totalXP;
		});
		setbuddyXP((prevXP) => prevXP + totalXP);
	};

	useEffect(() => {
		checkLevelUp();
	}, [buddyXP]); // Run checkLevelUp whenever buddyXP changes

	return {
		buddyLevel: calculateLevel(buddyXP),
		buddyXP,
		awardXP,
        modalVisible,
        setModalVisible,
	};
};

export default useLevelSystem;
