import { createClient } from '../../src/lib/db-helper.js';
export const handler = async () => {
	const dbClient = createClient();


	//
	try {
	
		//connect
		await dbClient.connect();
		const articles = dbClient.articlesCollection();
		//get data
		const data = await articles.find({}).limit(10).toArray();
		return {
			statusCode: 200,
			body: JSON.stringify(data)
		};
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}
};
