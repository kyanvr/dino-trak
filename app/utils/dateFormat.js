export const formatDate = (date) => {
	const options = {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric",
	};
	return date.toLocaleDateString(undefined, options);
};
