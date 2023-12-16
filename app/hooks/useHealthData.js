import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
	initialize,
	requestPermission,
	readRecords,
} from "react-native-health-connect";

const useHealthData = (date, monthly) => {
	const [steps, setSteps] = useState(0);
	const [flights, setFlights] = useState(0);
	const [distance, setDistance] = useState(0);
	const [calories, setCalories] = useState(0);

	// Android - Health Connect
	const readHealthData = async () => {
		// initialize the client
		const isInitialized = await initialize();
		if (!isInitialized) {
			return;
		}

		// request permissions
		await requestPermission([
			{ accessType: "read", recordType: "Steps" },
			{ accessType: "read", recordType: "Distance" },
			{ accessType: "read", recordType: "FloorsClimbed" },
			{ accessType: "read", recordType: "TotalCaloriesBurned" },
		]);

        // Note
        // JavaScript counts months from 0 to 11:
        // January = 0
        // December = 11
        const timeRangeFilter = monthly
            ? {
                operator: "between",
                startTime: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
                endTime: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
            }
            : {
                operator: "between",
                startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
                endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
            };


        // Steps
        const steps = await readRecords("Steps", { timeRangeFilter });
        const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
        setSteps(totalSteps);

        // Distance
        const distance = await readRecords("Distance", { timeRangeFilter });
        const totalDistance = distance.reduce(
            (sum, cur) => sum + cur.distance.inMeters,
            0
        );
        setDistance((totalDistance / 1000).toFixed(2));

        // Floors climbed
        const floorsClimbed = await readRecords("FloorsClimbed", {
            timeRangeFilter,
        });
        const totalFloors = floorsClimbed.reduce(
            (sum, cur) => sum + cur.floors,
            0
        );
        setFlights(totalFloors);

        // Calories burned
        const calories = await readRecords("TotalCaloriesBurned", {
            timeRangeFilter,
        });
        const totalCalories = calories.reduce(
            (sum, cur) => sum + cur.energy.inKilocalories,
            0
        );
        setCalories(totalCalories.toFixed(0));
    };

    useEffect(() => {
        if (Platform.OS !== "android") {
			return;
		}
		readHealthData();
	}, [date]);

    

	return { steps, flights, distance, calories };
};

export default useHealthData;
