import { useQuery, useRealm } from "@realm/react";
import { useState, useEffect } from "react";
import levels from "@constants/levels";

const useLevelSystem = () => {
	// State for buddy XP, modal visibility, unlocked items, and unlocked levels
	const [buddyXP, setBuddyXP] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [unlockedItems, setUnlockedItems] = useState([]);
	const [unlockedLevels, setUnlockedLevels] = useState([]);
	const realm = useRealm();
	const buddy = useQuery("Buddy")[0];

	// Function to calculate XP required for a specific level
	const calculateXPRequired = (level) => {
		return Math.floor(100 * Math.pow(1.2, level));
	};

	// useEffect to save unlocked items whenever the unlockedItems state changes
	useEffect(() => {
		saveUnlockedItems();
	}, [unlockedItems]);

	// Function to calculate the buddy's level based on XP
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

	// Function to check for a level-up and trigger related actions
	const checkLevelUp = () => {
		const currentLevel = calculateLevel(buddyXP);

		if (currentLevel === 1) return;

		setUnlockedLevels((prevLevels) => [...prevLevels, currentLevel]);

		const isNewLevel = !unlockedLevels.includes(currentLevel);

		if (isNewLevel) {
			unlockItemsForLevel(currentLevel);
			setModalVisible(true);

			setTimeout(() => {
				setModalVisible(false);
			}, 3000);
		}
	};

	// Function to unlock items for a specific level
	const unlockItemsForLevel = (level) => {
		const modifiedLevel = level - 2;

		setUnlockedItems((prevItems) => [...prevItems, levels[modifiedLevel]]);
	};

	// Function to save unlocked items to the realm database
	const saveUnlockedItems = () => {
		const itemsToSave = unlockedItems.map(
			(item) => `${item.attributeCategory}_${item.attribute}`
		);

		try {
			realm.write(() => {
				buddy.unlocked_attributes = itemsToSave.join(",");
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Function to award XP to the buddy
	const awardXP = (baseXP, bonusMultiplier = 1) => {
		const totalXP = baseXP * bonusMultiplier;
		realm.write(() => {
			buddy.level = calculateLevel(buddy.xp + totalXP);
			buddy.xp += totalXP;
		});
		setBuddyXP((prevXP) => prevXP + totalXP);
	};

	// useEffect to check for level-up whenever the buddyXP changes
	useEffect(() => {
		checkLevelUp();
	}, [buddyXP]);

	// Return relevant values and functions for external usage
	return {
		buddyLevel: calculateLevel(buddyXP),
		buddyXP,
		awardXP,
		modalVisible,
		setModalVisible,
		unlockedItems,
	};
};

export default useLevelSystem;
