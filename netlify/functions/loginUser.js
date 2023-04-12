//loginUser.js
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
		const { email, password } = JSON.parse(event.body);

		// check if user exists
		const existingUser = await users.findOne({ email });
		if (existingUser === null) {
			errorStatusCode = 401;
			throw new Error(`No user exists with this email ${email}. Try again!`);
		}

		// check password
		const validPassword = await bcrypt.compare(password, existingUser.password);
		if (!validPassword) {
			errorStatusCode = 401;
			throw new Error('Invalid password or email');
		}

		// create token
		const token = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);

		// return data
		return {
			statusCode: 200,
			body: JSON.stringify({
				userId: existingUser._id,
				jwt: token,
				userName: existingUser.username
			})
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
