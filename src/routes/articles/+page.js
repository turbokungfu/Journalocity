

export const load = async ({ fetch }) => {
	const url = `/.netlify/functions/getArticles`;
	const res = await fetch(url);
	const flips = await res.json();
	return {
		flips
	};
};