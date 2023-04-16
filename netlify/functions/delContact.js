//delContact.js

import { ObjectId } from 'mongodb';
import { createClient } from '../../src/lib/db-helper';

export const handler = async (event) => {
	const dbClient = createClient();
	let errorStatusCode = 500;
	//
	try {
		//
		//connect
		await dbClient.connect();
		const contacts = dbClient.contactsCollection();
		//
		// get data from event body (string)
		const { id } = JSON.parse(event.body);

		// find and delete contact (id)from "contacts" collection
		const origId = await contacts.deleteOne({ _id: ObjectId(id) });

		// return orig proj data
		return {
			statusCode: 200,
			body: JSON.stringify({ userId: origId })
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
