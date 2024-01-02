import { useQuery, useRealm } from "@realm/react";
import { useState, useEffect } from "react";
import levels from "../constants/levels";

const useLevelSystem = () => {
	const [buddyXP, setbuddyXP] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [unlockedItems, setUnlockedItems] = useState([]);
	const [unlockedLevels, setUnlockedLevels] = useState([]);
	const realm = useRealm();
	const buddy = useQuery("Buddy")[0];

	const calculateXPRequired = (level) => {
		return Math.floor(100 * Math.pow(1.2, level));
	};

	useEffect(() => {
		// This useEffect runs after each render when unlockedItems changes
		saveUnlockedItems();
	}, [unlockedItems]);

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

        setUnlockedLevels((prevLevels) => {
            return [...prevLevels, currentLevel];
        })

		// Check if the user has reached a new level
		const isNewLevel = !unlockedLevels.includes(currentLevel)

		if (isNewLevel) {
			unlockItemsForLevel(currentLevel);

			setModalVisible(true);

			setTimeout(() => {
				setModalVisible(false);
			}, 3000);
		}
	};

	const unlockItemsForLevel = (level) => {
        const modifiedLevel = level - 2;

		setUnlockedItems((prevItems) => {
			return [...prevItems, levels[modifiedLevel]]
		})
	};

	const saveUnlockedItems = () => {
        const itemsToSave = []

        for (let i = 0; i < unlockedItems.length; i++) {
            const attribute = `${unlockedItems[i].attributeCategory}_${unlockedItems[i].attribute}`

            itemsToSave.push(attribute);            
        }

        try {
        	realm.write(() => {
        		buddy.unlocked_attributes = itemsToSave.toString();
        	});
        } catch (error) {
        	console.log(error);
        }
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
	}, [buddyXP]);

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
