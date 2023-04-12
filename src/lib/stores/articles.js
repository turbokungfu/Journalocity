import { writable } from 'svelte/store';

const store = writable([]);

export function setArticles(articles) {
	store.set(articles);
}
//export default store
const customArticleStore = {
	subscribe: store.subscribe
};
export default customArticleStore;