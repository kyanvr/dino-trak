import "react-native-get-random-values";
import Realm, { BSON } from "realm";

class User extends Realm.Object {
	// properties
	_id;
	username;
	avatar;
	personal_goals;
	daily_steps;
	onboarding_completed;

	// required by realm
	static schema = {
		name: "User", // Add the name property to define the object schema name
		primaryKey: "_id",
		properties: {
			// set the realm types
			_id: "uuid",
			username: "string",
			avatar: "string",
			personal_goals: "string",
			daily_steps: "string",
			onboarding_completed: {
				type: "bool",
				default: false,
			},
			createdAt: {
				type: "date",
				default: new Date(),
			},
		},
	};

	constructor(
		realm,
		username,
		avatar,
		personal_goals,
		daily_steps,
		onboarding_completed
	) {
		console.log("in constructor");
		super(realm, {
			_id: new BSON.UUID(),
			username,
			avatar,
			personal_goals,
			daily_steps,
			onboarding_completed,
		});
	}
}

export { User };
