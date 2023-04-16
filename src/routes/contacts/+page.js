export const load = async ({ fetch }) => {
	const url = `/.netlify/functions/getContacts`;
	const res = await fetch(url);
	const cons = await res.json();
	return {
		cons
	};
};
