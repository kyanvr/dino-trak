import Realm, { BSON } from "realm";

export class Challenges extends Realm.Object {
	// properties
	_id;
	challenge_name;
	xp;
	completed;
	challenge_description;
    challenge_goal;
    duration;

	// required by realm
	static primaryKey = "_id";
	static schema = {
		name: "Challenges",
		primaryKey: "_id",
		properties: {
			// set the realm types
			_id: "uuid",
			challenge_name: "string",
			xp: "int",
			completed: {
				type: "bool",
				default: false,
			},
			challenge_description: "string",
            challenge_goal: "int",
            duration: "string",
			createdAt: {
				type: "date",
				default: new Date(),
			},
		},
	};

	constructor(realm, challenge_name, xp, completed, challenge_description, challenge_goal, duration) {
		console.log("in constructor");
		super(realm, {
			_id: new BSON.UUID(),
			challenge_name,
			xp,
			completed,
			challenge_description,
            challenge_goal,
            duration,
		});
	}
}
