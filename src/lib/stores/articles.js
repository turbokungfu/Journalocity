import { writable } from 'svelte/store';

const store = writable([]);

import appStore from '$lib/stores/appStore';

//import Api functions
import { addArticle,  updateArticle, deleteArticle, incLike, updEzFlip } from '../../backend/Api';

export function setArticles(articles) {
	store.set(articles);
}
//export default store
const customArticleStore = {
	subscribe: store.subscribe,
	addArticle: async (articleData, userToken) => {
		let newArticle = articleData;
		let response = await addArticle(newArticle, userToken);
		if (response) {
			// need to add new id (response) to newProj
			newArticle = { _id: response, ...newArticle };
			store.update((items) => {
				return [newArticle, ...items];
			});
			//success alert
			appStore.toggleAlert(true, 'Article added successfully!', false);
		} else {
			// fail alert
			appStore.toggleAlert(true, 'There was a problem trying to add this Article!', true);
		}
	},

	updateArticle: async (id, articleData, userToken) => {
		let response = await updateArticle(id, { ...articleData }, userToken);
		//update store
		if (response) {
			store.update((items) =>
				items.map((item) => {
					return item._id === id ? { ...item, ...articleData } : item;
				})
			);
			// console.log('project store - updateProject : Success!');
			// success alert
			appStore.toggleAlert(true, 'article updated successfully!', false);
		} else {
			// console.log('project store - updateProject : Failed!');
			// fail alert
			appStore.toggleAlert(true, 'There was a problem trying to update this article!', true);
		}
	},
	removeArticle: async (id, userToken) => {
		let response = await deleteArticle(id, userToken);
		//update store
		if (response) {
			store.update((items) => {
				items = items.filter((i) => i._id !== id);
				return items;
			});
			// success alert
			appStore.toggleAlert(true, 'Project removed successfully!', false);
		} else {
			// fail alert
			appStore.toggleAlert(true, 'There was a problem trying to remove this project!', true);
		}
	},
	likeArticle: async (id, articleData, userToken) => {
		// update backend
		const response = await incLike(id, articleData, userToken);
		//update store
		if (response) {
			// update store
			store.update((items) =>
				items.map((item) => {
					return item._id === id ? { ...item, ...articleData } : item;
				})
			);
			//success alert
			appStore.toggleAlert(true, 'Project Liked successfully!', false);
		} else {
			// fail alert
			appStore.toggleAlert(true, 'There was a problem trying to Like this project!', true);
		}
	},
	updateEzFlip: async (id, projectData, userToken) => {
		const response = await updEzFlip(id, { ...projectData }, userToken);
		// update store
		if (response) {
			store.update((items) =>
				items.map((item) => {
					return item._id === id ? { ...item, ...projectData } : item;
				})
			);
			appStore.toggleAlert(true, 'EzFlip updated successfuly!', false);
		} else {
			appStore.toggleAlert(true, 'There was a problem updating EzFlip!', true);
		}
	}
};
export default customArticleStore;
