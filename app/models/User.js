import Realm, { BSON } from "realm";

export class User extends Realm.Object {
	// properties
	_id;
	username;
	avatar;
	personal_goals;
	onboarding_completed;

	// required by realm
	static primaryKey = "_id";
	static schema = {
		name: "User",
		primaryKey: "_id",
		properties: {
			// set the realm types
			_id: "uuid",
			username: "string",
			avatar: "string",
			personal_goals: "string",
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

	constructor(realm, username, avatar, personal_goals, onboarding_completed) {
		console.log("in constructor");
		super(realm, {
			_id: new BSON.UUID(),
			username,
			avatar,
			personal_goals,
			onboarding_completed,
		});
	}
}
