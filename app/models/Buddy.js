import Realm, { BSON } from "realm";

export class Buddy extends Realm.Object {
	// properties
	_id;
    name;
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
			name: "string",
            level: "int",
            attributes: "string",
			createdAt: {
				type: "date",
				default: new Date(),
			},
		},
	};

	constructor(realm, name, level, attributes) {
		console.log("in constructor");
		super(realm, {
			_id: new BSON.UUID(),
			name,
            level,
            attributes,
		});
	}
}
