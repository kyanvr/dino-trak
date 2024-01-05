import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
	initialize,
	requestPermission,
	readRecords,
} from "react-native-health-connect";

const useHealthData = (date) => {
	// States to store health data
	const [dailyData, setDailyData] = useState({});
	const [weeklyData, setWeeklyData] = useState({});
	const [monthlyData, setMonthlyData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			// Initialize the health data client
			const isInitialized = await initialize();
			if (!isInitialized) {
				throw new Error("Health Connect initialization failed.");
			}

			// Request necessary permissions
			await requestPermission([
				{ accessType: "read", recordType: "Steps" },
				{ accessType: "read", recordType: "Distance" },
				{ accessType: "read", recordType: "FloorsClimbed" },
				{ accessType: "read", recordType: "TotalCaloriesBurned" },
			]);

			// Define time range filters for daily, weekly, and monthly data
			const dailyTimeRangeFilter = {
				operator: "between",
				startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
				endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
			};

			const getWeeklyTimeRangeFilter = (date) => {
				const startOfWeek = new Date(date);
				startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7));

				const endOfWeek = new Date(date);
				endOfWeek.setDate(date.getDate() + (7 - date.getDay()));

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

			const weeklyTimeRangeFilter = getWeeklyTimeRangeFilter(date);

			const monthlyTimeRangeFilter = {
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
			};

			// Use Promise.all to wait for all asynchronous operations
			const [dailySteps, dailyDistance, dailyFloors, dailyCalories] =
				await Promise.all([
					readRecords("Steps", {
						timeRangeFilter: dailyTimeRangeFilter,
					}),
					readRecords("Distance", {
						timeRangeFilter: dailyTimeRangeFilter,
					}),
					readRecords("FloorsClimbed", {
						timeRangeFilter: dailyTimeRangeFilter,
					}),
					readRecords("TotalCaloriesBurned", {
						timeRangeFilter: dailyTimeRangeFilter,
					}),
				]);

			const [weeklySteps, weeklyDistance, weeklyFlights, weeklyCalories] =
				await Promise.all([
					readRecords("Steps", {
						timeRangeFilter: weeklyTimeRangeFilter,
					}),
					readRecords("Distance", {
						timeRangeFilter: weeklyTimeRangeFilter,
					}),
					readRecords("FloorsClimbed", {
						timeRangeFilter: weeklyTimeRangeFilter,
					}),
					readRecords("TotalCaloriesBurned", {
						timeRangeFilter: weeklyTimeRangeFilter,
					}),
				]);

			const [
				monthlySteps,
				monthlyDistance,
				monthlyFlights,
				monthlyCalories,
			] = await Promise.all([
				readRecords("Steps", {
					timeRangeFilter: monthlyTimeRangeFilter,
				}),
				readRecords("Distance", {
					timeRangeFilter: monthlyTimeRangeFilter,
				}),
				readRecords("FloorsClimbed", {
					timeRangeFilter: monthlyTimeRangeFilter,
				}),
				readRecords("TotalCaloriesBurned", {
					timeRangeFilter: monthlyTimeRangeFilter,
				}),
			]);

			// Helper functions to calculate total values from records
			const calculateTotalSteps = (data) =>
				data.reduce((total, record) => total + record.count, 0);
			const calculateTotalDistance = (data) =>
				(
					data.reduce(
						(total, record) => total + record.distance.inMeters,
						0
					) / 1000
				).toFixed(2);
			const calculateTotalFloors = (data) =>
				data.reduce((total, record) => total + record.floors, 0);
			const calculateTotalCalories = (data) =>
				data
					.reduce(
						(total, record) => total + record.energy.inKilocalories,
						0
					)
					.toFixed();

			// Set the health data states
			setDailyData({
				steps: calculateTotalSteps(dailySteps),
				distance: calculateTotalDistance(dailyDistance),
				floors: calculateTotalFloors(dailyFloors),
				calories: calculateTotalCalories(dailyCalories),
			});

			setWeeklyData({
				steps: calculateTotalSteps(weeklySteps),
				distance: calculateTotalDistance(weeklyDistance),
				floors: calculateTotalFloors(weeklyFlights),
				calories: calculateTotalCalories(weeklyCalories),
			});

			setMonthlyData({
				steps: calculateTotalSteps(monthlySteps),
				distance: calculateTotalDistance(monthlyDistance),
				floors: calculateTotalFloors(monthlyFlights),
				calories: calculateTotalCalories(monthlyCalories),
			});

			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		// Fetch health data only for Android platform
		if (Platform.OS !== "android") {
			return;
		}
		fetchData();
	}, [date]);

	return { dailyData, weeklyData, monthlyData, loading, error };
};

export default useHealthData;
