import Realm, { BSON } from "realm";

export class Buddy extends Realm.Object {
	// properties
	_id;
	buddy_name;
	level;
	attributes;

	// required by realm
	static primaryKey = "_id";
	static schema = {
		name: "Buddy",
		primaryKey: "_id",
		properties: {
			// set the realm types
			_id: "uuid",
			buddy_name: "string",
			level: "int",
			attributes: "string",
			createdAt: {
				type: "date",
				default: new Date(),
			},
		},
	};

	constructor(realm, buddy_name, level, attributes) {
		console.log("in constructor");
		super(realm, {
			_id: new BSON.UUID(),
			buddy_name,
			level,
			attributes,
		});
	}
}
