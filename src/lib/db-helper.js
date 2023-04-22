import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.MONGODB_DATABASE;

function createClient() {
	const client = new MongoClient(process.env.MONGO_URI);



	client.projectsCollection = function () {
		return this.db(dbName).collection('articles');
	};

	client.usersCollection = function () {
		return this.db(dbName).collection('users');
	};


	return client;
}

export { createClient };
