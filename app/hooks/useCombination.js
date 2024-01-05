import React, { createContext, useContext, useState } from "react";

// Create a context for managing combinations
const CombinationContext = createContext();

// Create a provider component to wrap around the app and provide combination-related functionality
export const CombinationProvider = ({ children }) => {
	// State to track selected accessory paths
	const [accessoryPaths, setAccessoryPaths] = useState([]);
	// State to track unlocked accessory paths
	const [unlockedPaths, setUnlockedPaths] = useState([]);

	// Toggle an accessory's selection status
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

	// Unlock an accessory
	const unlockAccessory = (accessoryPath) => {
		setUnlockedPaths((prevPaths) => {
			// Only add the unlocked item if it's not already present
			if (!prevPaths.includes(accessoryPath)) {
				return [...prevPaths, accessoryPath];
			}
			return prevPaths;
		});
	};

	// Clear all selected accessories
	const clearAccessories = () => {
		setAccessoryPaths([]);
	};

	// Context value to be provided to the entire app
	const contextValue = {
		accessoryPaths,
		toggleAccessory,
		unlockedPaths,
		unlockAccessory,
		clearAccessories,
	};

	return (
		<CombinationContext.Provider value={contextValue}>
			{children}
		</CombinationContext.Provider>
	);
};

// Custom hook to access combination context
export const useCombination = () => {
	const context = useContext(CombinationContext);
	if (!context) {
		throw new Error(
			"useCombination must be used within a CombinationProvider"
		);
	}
	return context;
};
