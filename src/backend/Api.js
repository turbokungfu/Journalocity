import axios from 'axios';

// Note: we do not need the getProjects() api function as we are using Sveltekit preload routes/+page.js function, but I am providing it here for info

//fetch all projects
export async function getArticles() {
	const url = `/.netlify/functions/getArticles`;
	let articles = [];
	const res = await fetch(url)
		.then((r) => r.json())
		.then((data) => {
			articles = data;
		});
	return articles;
}

// add article
export async function addArticle(newArticle, userToken) {
	const url = `/.netlify/functions/addArticle`;
	const options = {
		method: 'POST',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: newArticle
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			// netlify returns userId : insertedId - thats why using userId. Its not a user id!!!
			// console.log('api.addProj response.data: ', response.data);
			res = response.data.userId;
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

//update Project
export async function updateArticle(id, articleData, userToken) {
	const url = `/.netlify/functions/updateArticle`;
	const options = {
		method: 'PUT',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: { id: id, ...articleData }
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			res = true;
			console.log('api.upProj: await axios success');
			console.log(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

// delete Project
export async function deleteArticle(id, userToken) {
	const url = `/.netlify/functions/deleteArticle`;
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
			console.log('Delete request success');
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

//update likes
export async function incLike(id, articleData, userToken) {
	const url = `/.netlify/functions/updProject`;
	const options = {
		method: 'PUT',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: projectData
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			res = true;
			console.log('Like request success');
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

//update project for ezflip
export async function updEzFlip(id, projectData, userToken) {
	const url = `/.netlify/functions/updProject`;
	const options = {
		method: 'PUT',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: { id: id, ...projectData }
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			res = true;
			console.log('Update EzFlip success');
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}
