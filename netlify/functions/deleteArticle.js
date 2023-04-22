//delProject.js

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
		const projects = dbClient.projectsCollection();
		//
		// get data from event body (string)
		const { id } = JSON.parse(event.body);

		// find and delete project (id)from "projects" collection
		const origId = await projects.deleteOne({ _id: ObjectId(id) });

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
