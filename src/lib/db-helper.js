import { MongoClient } from 'mongodb';

const dbName = process.env.VITE_MONGODB_DATABASE;
const mongoUri = process.env.VITE_MONGO_URI;

function createClient() {
  const client = new MongoClient(mongoUri);

  client.articlesCollection = function () {
    return this.db(dbName).collection('articles');
  };

  client.usersCollection = function () {
    return this.db(dbName).collection('users');
  };

  return client;
}

export { createClient };
