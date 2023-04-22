

export const load = async ({ fetch }) => {
	const url = `/.netlify/functions/getArticles`;
	const res = await fetch(url);
	const articleList = await res.json();
	return {
		articleList
	};
};