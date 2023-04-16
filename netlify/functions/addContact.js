//addContact.js
import { createClient } from '../../src/lib/db-helper';

export const handler = async (event) => {
	const dbClient = createClient();
	let errorStatusCode = 500;
	//
	try {
		//connect
		await dbClient.connect();
		const contacts = dbClient.contactsCollection();
		//
		// insert new contact using data from event body into "contacts" collection
		const { insertedId } = await contacts.insertOne(JSON.parse(event.body));
		// return new user id?
		return {
			statusCode: 200,
			body: JSON.stringify({ userId: insertedId })
		};
	} catch (err) {
		return {
			statusCode: errorStatusCode,
			body: JSON.stringify({ msg: err.message })
		};
	} finally {
		dbClient.close();
	}
};
