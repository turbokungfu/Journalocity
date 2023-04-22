import { setStorageUser, setUser } from '../lib/stores/user';

async function loginUser({ email, password }) {
	//
	const url = `/.netlify/functions/loginUser`;
	let user = {};
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password
		})
	})
		.then((response) => response.json())
		.then((data) => {
			user = data;
		});
	// check user is valid or set to null
	user = user.userId ? user : null;
	//
	if (user) {
		//update store / localstorage
		setStorageUser(user);
		setUser(user);
	}
	return user;
}

export default loginUser;
