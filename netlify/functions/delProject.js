//delArticle.js

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
		const articles = dbClient.articlesCollection();
		//
		// get data from event body (string)
		const { id } = JSON.parse(event.body);

		// find and delete article (id)from "article" collection
		const origId = await articles.deleteOne({ _id: ObjectId(id) });

		// return orig Article data
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
