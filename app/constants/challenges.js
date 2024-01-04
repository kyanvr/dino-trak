const challenges = [
	{
		challenge_name: "DecaStride Dynamo",
		xp: 50,
		completed: false,
		challenge_description: "Take 10,000 steps in one day.",
		challenge_goal: 10000,
		duration: "day",
		type: "steps",
	},
	{
		challenge_name: "Sky High Ascent",
		xp: 50,
		completed: false,
		challenge_description:
			"Climb the equivalent of a 50-story building in floors in a single day.",
		challenge_goal: 50,
		duration: "day",
		type: "floors",
	},
	{
		challenge_name: "Ignite the Burn",
		xp: 50,
		completed: false,
		challenge_description: "Burn 2000 calories in a 24-hour period.",
		challenge_goal: 2000,
		duration: "day",
		type: "calories",
	},
	{
		challenge_name: "Step Surge",
		xp: 50,
		completed: false,
		challenge_description:
			"Achieve a burst of energy by taking 15,000 steps in one day.",
		challenge_goal: 15000,
		duration: "day",
		type: "steps",
	},
	{
		challenge_name: "Elevate and Celebrate",
		xp: 150,
		completed: false,
		challenge_description:
			"Climb 75 floors in a single day and revel in the achievement.",
		challenge_goal: 75,
		duration: "day",
		type: "floors",
	},
	{
		challenge_name: "Step Marathon",
		xp: 50,
		completed: false,
		challenge_description:
			"Run or walk a marathon within a single day by reaching 26,200 steps.",
		challenge_goal: 26200,
		duration: "day",
		type: "steps",
	},
	{
		challenge_name: "Stairway to Glory",
		xp: 50,
		completed: false,
		challenge_description:
			"Conquer 100 floors in a day and ascend to fitness glory.",
		challenge_goal: 100,
		duration: "day",
		type: "floors",
	},
	{
		challenge_name: "Stress-Buster Stride",
		xp: 50,
		completed: false,
		challenge_description:
			"De-stress by accumulating 8,000 steps through a calming walk or mindfulness stroll.",
		challenge_goal: 8000,
		duration: "day",
		type: "steps",
	},
	{
		challenge_name: "Midnight Milestone",
		xp: 50,
		completed: false,
		challenge_description:
			"Achieve 2,000 steps before midnight to end the day on an active note.",
		challenge_goal: 2000,
		duration: "day",
		type: "steps",
	},
	{
		challenge_name: "Evening Explorer",
		xp: 50,
		completed: false,
		challenge_description:
			"Explore your neighborhood with a 7,000-step walk in the evening.",
		challenge_goal: 7000,
		duration: "day",
		type: "steps",
	},
	{
		challenge_name: "Lighthouse Laps",
		xp: 100,
		completed: false,
		challenge_description:
			"Complete a cumulative distance of 24 km, symbolizing the circumference of a lighthouse beam, over the week.",
		challenge_goal: 24,
		duration: "week",
		type: "distance",
	},
	{
		challenge_name: "Explorer's Expedition",
		xp: 100,
		completed: false,
		challenge_description: "Cover 40.000 steps over the course of a week.",
		challenge_goal: 40000,
		duration: "week",
		type: "steps",
	},
	{
		challenge_name: "Mileage Maven",
		xp: 100,
		completed: false,
		challenge_description:
			"Conquer 50 km in distance traveled over the course of a week.",
		challenge_goal: 50,
		duration: "week",
		type: "distance",
	},
	{
		challenge_name: "Active Ascent",
		xp: 100,
		completed: false,
		challenge_description:
			"Climb the stairs equivalent to the Eiffel Tower over the week.",
		challenge_goal: 90,
		duration: "week",
		type: "floors",
	},
	{
		challenge_name: "Tower Triumph",
		xp: 100,
		completed: false,
		challenge_description:
			"Climb the equivalent of the tallest tower in the world (Burj Khalifa) in floors over the week.",
		challenge_goal: 163,
		duration: "week",
		type: "floors",
	},
	{
		challenge_name: "Night Owl Explorer",
		xp: 100,
		completed: false,
		challenge_description:
			"Extend your evening walks and explore different parts of your neighborhood each night, aiming for a total of 30.000 steps over the week.",
		challenge_goal: 30000,
		duration: "week",
		type: "distance",
	},
	{
		challenge_name: "Virtual Tourist",
		xp: 100,
		completed: false,
		challenge_description:
			"Virtually tour different cities by walking or running, covering a total distance of 65 km over the week.",
		challenge_goal: 65,
		duration: "week",
		type: "distance",
	},
	{
		challenge_name: "Summit Seeker",
		xp: 150,
		completed: false,
		challenge_description:
			"Accumulate the elevation gain equivalent to climbing Mount Everest over the month.",
		challenge_goal: 2900,
		duration: "month",
		type: "floors",
	},
	{
		challenge_name: "Calorie Comet",
		xp: 150,
		completed: false,
		challenge_description:
			"Become a fitness comet by burning 200.000 calories over the course of the month.",
		challenge_goal: 200000,
		duration: "month",
		type: "calories",
	},
	{
		challenge_name: "Caloric Crusader",
		xp: 150,
		completed: false,
		challenge_description:
			"Burn 150.000 calories over the course of the month.",
		challenge_goal: 150000,
		duration: "month",
		type: "calories",
	},
	{
		challenge_name: "Distance Dynamo",
		xp: 150,
		completed: false,
		challenge_description: "Travel a total of 160 km over the month.",
		challenge_goal: 160,
		duration: "month",
		type: "distance",
	},
	{
		challenge_name: "Ultra Distance Dare",
		xp: 150,
		completed: false,
		challenge_description:
			"Dare to go the extra mile and cover a total of 240 km over the month.",
		challenge_goal: 240,
		duration: "month",
		type: "distance",
	},
	{
		challenge_name: "Caloric Commander",
		xp: 150,
		completed: false,
		challenge_description:
			"Command your fitness journey by burning 250.000 calories over the course of the month.",
		challenge_goal: 250000,
		duration: "month",
		type: "calories",
	},
	{
		challenge_name: "Grand Tourer",
		xp: 150,
		completed: false,
		challenge_description:
			"Virtually tour famous landmarks by covering a total distance of 320 km over the month.",
		challenge_goal: 320,
		duration: "month",
		type: "distance",
	},
	{
		challenge_name: "Calorie Connoisseur",
		xp: 150,
		completed: false,
		challenge_description:
			"Explore a variety of calorie-burning activities and aim to burn 300.000 calories over the month.",
		challenge_goal: 300000,
		duration: "month",
		type: "calories",
	},
	{
		challenge_name: "Cityscape Strider",
		xp: 150,
		completed: false,
		challenge_description:
			"Stride through a virtual cityscape by covering a total distance of 400 km over the month.",
		challenge_goal: 400,
		duration: "month",
		type: "distance",
	},
	{
		challenge_name: "Mega Marathoner",
		xp: 150,
		completed: false,
		challenge_description:
			"Complete a full marathon (42 km) over the course of the month.",
		challenge_goal: 42,
		duration: "month",
		type: "distance",
	},
	{
		challenge_name: "Around the World",
		xp: 150,
		completed: false,
		challenge_description:
			"Accumulate distance equivalent to circumnavigating the globe (approximately 40 km) over the month.",
		challenge_goal: 40,
		duration: "month",
		type: "distance",
	},
	{
		challenge_name: "Extreme Elevation",
		xp: 150,
		completed: false,
		challenge_description:
			"Aim for extreme elevation by climbing a total of 10,000 stairs over the month.",
		challenge_goal: 10000,
		duration: "month",
		type: "floors",
	},
];

export default challenges;