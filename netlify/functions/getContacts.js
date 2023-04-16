//getContacts.js

import { createClient } from '../../src/lib/db-helper';

export const handler = async (event) => {
	const dbClient = createClient();
	let errorStatusCode = 500;
	//
	try {
		//connect
		await dbClient.connect();
		const contacts = dbClient.contactsCollection();
		// get data
		const data = await contacts.find({}).limit(100).toArray();
		return {
			statusCode: 200,
			body: JSON.stringify(data)
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
