import axios from 'axios';

// Note: we do not need the getArticles() api function as we are using Sveltekit preload routes/+page.js function, but I am providing it here for info

//fetch all articles
export async function getArticles() {
	const url = `/.netlify/functions/getArtoc;es`;
	let articles = [];
	const res = await fetch(url)
		.then((r) => r.json())
		.then((data) => {
			articles = data;
		});
	return articles;
}

// add article
export async function addArt(newArt, userToken) {
	const url = `/.netlify/functions/addArticle`;
	const options = {
		method: 'POST',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: newArt
	};
	let res = false;
	await axios
		.request(options)
		.then(function (response) {
			// netlify returns userId : insertedId - thats why using userId. Its not a user id!!!
			// console.log('api.addArt response.data: ', response.data);
			res = response.data.userId;
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

//update Article
export async function updArt(id, articleData, userToken) {
	const url = `/.netlify/functions/updArticle`;
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
			console.log('api.upArt: await axios success');
			console.log(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}

// delete Article
export async function delArt(id, userToken) {
	const url = `/.netlify/functions/delArticle`;
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
	const url = `/.netlify/functions/updArticle`;
	const options = {
		method: 'PUT',
		url: `${url}`,
		headers: { 'Content-Type': 'application/json' },
		data: articleData
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

//update article for ezflip
export async function updEzFlip(id, articleData, userToken) {
	const url = `/.netlify/functions/updArticle`;
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
			console.log('Update EzFlip success');
		})
		.catch(function (error) {
			console.error(error);
		});
	return res;
}
