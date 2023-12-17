export default function formatNumber(number) {
	// Convert the number to a string
	let numberString = number.toString();

	// Split the string into parts before and after the decimal point (if any)
	let parts = numberString.split(".");

	// Format the integer part with points as thousand separators
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

	// Join the parts back together, adding the decimal point if necessary
	return parts.join(".");
}
