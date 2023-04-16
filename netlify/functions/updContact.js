//updContact.js
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
		// get id from event body (string)
		const { id } = JSON.parse(event.body);

		// update contact (id) from "contacts" collection
		// will need JSON.parse(event.body)
		const origId = await contacts.updateOne(
			{ _id: ObjectId(id) },
			{ $set: JSON.parse(event.body) }
		);
		//console.log('origId', origId)

		// return orig contact data
		return {
			statusCode: 200,
			body: JSON.stringify({ origId: origId })
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
