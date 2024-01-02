import React, { createContext, useContext, useState } from "react";

const CombinationContext = createContext();

export const CombinationProvider = ({ children }) => {
	const [baseImage, setBaseImage] = useState(require("@assets/dino.png"));
	const [accessoryPaths, setAccessoryPaths] = useState([]);
    const [unlockedPaths, setUnlockedPaths] = useState([]);

	const toggleAccessory = (accessoryPath) => {
		setAccessoryPaths((prevPaths) => {
			if (prevPaths.includes(accessoryPath)) {
				// If the accessory is already selected, remove it
				return prevPaths.filter((path) => path !== accessoryPath);
			} else {
				// If the accessory is not selected, add it
				return [...prevPaths, accessoryPath];
			}
		});
	};
    
    const unlockAccessory = (accessoryPath) => {
        setUnlockedPaths((prevPaths) => {
            // Only add the unlocked item if it's not already present
            if (!prevPaths.includes(accessoryPath)) {
                return [...prevPaths, accessoryPath];
            }
            return prevPaths
        });
    };

	const clearAccessories = () => {
		setAccessoryPaths([]);
	};


	// const saveCombination = () => {
	// 	const combination = {
	// 		accessories: accessoryPaths,
	// 	};

	// 	// Save combination to storage (e.g., AsyncStorage)
	// 	// ...

	// 	console.log("Saved Combination:", combination);
	// };

	const contextValue = {
		accessoryPaths,
		toggleAccessory,
        unlockedPaths,
        unlockAccessory,
		clearAccessories,
		// saveCombination,
	};

	return (
		<CombinationContext.Provider value={contextValue}>
			{children}
		</CombinationContext.Provider>
	);
};

export const useCombination = () => {
	const context = useContext(CombinationContext);
	if (!context) {
		throw new Error(
			"useCombination must be used within a CombinationProvider"
		);
	}
	return context;
};
