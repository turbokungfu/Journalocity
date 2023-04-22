//registerUser.js
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { createClient } from '../../src/lib/db-helper';

export const handler = async (event) => {
	const dbClient = createClient();
	let errorStatusCode = 500;

	try {
		//connect
		await dbClient.connect();
		const users = dbClient.usersCollection();
		const { email, password, username } = JSON.parse(event.body);

		// check if user exists
		const existingUser = await users.findOne({ email });
		if (existingUser !== null) {
			errorStatusCode = 409;
			throw new Error(`A user already exists with this email ${email}`);
		}

		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// create the user
		const { insertedId } = await users.insertOne({
			email,
			password: hashedPassword,
			username: username
		});

		// create token
		const token = jwt.sign({ _id: insertedId }, process.env.TOKEN_SECRET);

		// return data
		return {
			statusCode: 200,
			body: JSON.stringify({ userId: insertedId, jwt: token, userName: username })
		};
	} catch (err) {
		return {
			statusCode: errorStatusCode,
			body: JSON.stringify({ userId: null, jwt: null, userName: null })
		};
	} finally {
		dbClient.close();
	}
};
