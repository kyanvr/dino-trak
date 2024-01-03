import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
	initialize,
	requestPermission,
	readRecords,
} from "react-native-health-connect";

const useHealthData = (date, weekly, monthly) => {
	const [healthData, setHealthData] = useState({
		steps: 0,
		flights: 0,
		distance: 0,
		calories: 0,
	});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

	const fetchData = async () => {
		try {
			// initialize the client
			const isInitialized = await initialize();
			if (!isInitialized) {
				throw new Error("Health Connect initialization failed.");
			}

			// request permissions
			await requestPermission([
				{ accessType: "read", recordType: "Steps" },
				{ accessType: "read", recordType: "Distance" },
				{ accessType: "read", recordType: "FloorsClimbed" },
				{ accessType: "read", recordType: "TotalCaloriesBurned" },
			]);

			const getWeeklyTimeRangeFilter = (date) => {
				const startOfWeek = new Date(date);
				startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // Set to the first day (Monday) of the current week

				const endOfWeek = new Date(date);
				endOfWeek.setDate(date.getDate() + (7 - date.getDay())); // Set to the last day (Sunday) of the current week

				return {
					operator: "between",
					startTime: new Date(
						startOfWeek.setHours(0, 0, 0, 0)
					).toISOString(),
					endTime: new Date(
						endOfWeek.setHours(23, 59, 59, 999)
					).toISOString(),
				};
			};

			const timeRangeFilter = monthly
				? {
						operator: "between",
						startTime: new Date(
							date.getFullYear(),
							date.getMonth(),
							1
						).toISOString(),
						endTime: new Date(
							date.getFullYear(),
							date.getMonth() + 1,
							0
						).toISOString(),
				  }
				: weekly
				? getWeeklyTimeRangeFilter(date)
				: {
						operator: "between",
						startTime: new Date(
							date.setHours(0, 0, 0, 0)
						).toISOString(),
						endTime: new Date(
							date.setHours(23, 59, 59, 999)
						).toISOString(),
				  };

			// Use Promise.all to wait for all asynchronous operations
			const [steps, distance, flights, calories] = await Promise.all([
				readRecords("Steps", { timeRangeFilter }),
				readRecords("Distance", { timeRangeFilter }),
				readRecords("FloorsClimbed", { timeRangeFilter }),
				readRecords("TotalCaloriesBurned", { timeRangeFilter }),
			]);

			const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
			const totalDistance = distance.reduce(
				(sum, cur) => sum + cur.distance.inMeters,
				0
			);
			const totalFloors = flights.reduce(
				(sum, cur) => sum + cur.floors,
				0
			);
			const totalCalories = calories.reduce(
				(sum, cur) => sum + cur.energy.inKilocalories,
				0
			);

			setHealthData({
				steps: totalSteps,
				floors: totalFloors,
				distance: (totalDistance / 1000).toFixed(2),
				calories: totalCalories.toFixed(0),
			});

			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (Platform.OS !== "android") {
			return;
		}
		fetchData();
	}, [date, weekly, monthly]);

	return { healthData, loading, error };
};

export default useHealthData;
