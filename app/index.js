import { Redirect } from "expo-router";
import populateChallenges from "./database/seedChallenges";

export default function index() {
	populateChallenges();

	return <Redirect href="/screens/startup/start" />;
}
