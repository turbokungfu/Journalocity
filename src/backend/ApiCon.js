import axios from 'axios';

//fetch all contacts
export async function getContacts() {
	const url = `/.netlify/functions/getContacts`;
	let contacts = [];
	const res = await fetch(url)
		.then((r) => r.json())
		.then((data) => {
			contacts = data;
		});
	return contacts;
}
// add contact
export async function addCon(newCon, userToken) {
	const url = `/.netlify/functions/addContact`;
	const options = {
		method: 'POST',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: newCon
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			// netlify returns the new id as userId : insertedId - its NOT a user id!!!
			res = response.data.userId;
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

//update Contact
export async function updCon(id, contactData, userToken) {
	const url = `/.netlify/functions/updContact`;
	const options = {
		method: 'PUT',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: { id: id, ...contactData }
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			res = true;
			console.log('Update Contact  success');
			// console.log(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

// delete Contact
export async function delCon(id, userToken) {
	const url = `/.netlify/functions/delContact`;
	const options = {
		method: 'DELETE',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: { id: id }
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			res = true;
			console.log('Delete contact  success');
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}
