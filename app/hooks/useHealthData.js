import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
	initialize,
	requestPermission,
	readRecords,
} from "react-native-health-connect";

const useHealthData = (date) => {
	const [dailyData, setDailyData] = useState({});
	const [weeklyData, setWeeklyData] = useState({});
	const [monthlyData, setMonthlyData] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

			const dailyTimeRangeFilter = {
				operator: "between",
				startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
				endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
			};

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

            const calculateTotalSteps = (data) => {
                return data.reduce((total, record) => {
                    return total + record.count;
                }, 0);
            }

            const calculateTotalDistance = (data) => {
                return data.reduce((total, record) => {
                    return total + record.distance.inMeters;
                }, 0);
            }

            const calculateTotalFloors = (data) => {
                return data.reduce((total, record) => {
                    return total + record.floors;
                }, 0);
            }

            const calculateTotalCalories = (data) => {
                return data.reduce((total, record) => {
                    return total + record.energy.inKilocalories;
                }, 0);
            }

			setDailyData({
                steps: calculateTotalSteps(dailySteps),
                distance: (calculateTotalDistance(dailyDistance) / 1000).toFixed(2),
                floors: calculateTotalFloors(dailyFloors),
                calories: calculateTotalCalories(dailyCalories).toFixed(),
            })
			
            setWeeklyData({
                steps: calculateTotalSteps(weeklySteps),
                distance: (calculateTotalDistance(weeklyDistance) / 1000).toFixed(2),
                floors: calculateTotalFloors(weeklyFlights),
                calories: calculateTotalCalories(weeklyCalories).toFixed(),
            });

            setMonthlyData({
                steps: calculateTotalSteps(monthlySteps),
                distance: (calculateTotalDistance(monthlyDistance) / 1000).toFixed(2),
                floors: calculateTotalFloors(monthlyFlights),
                calories: calculateTotalCalories(monthlyCalories).toFixed(),
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
	}, [date]);

	return { dailyData, weeklyData, monthlyData, loading, error };
};

export default useHealthData;
