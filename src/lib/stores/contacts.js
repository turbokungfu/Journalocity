import { writable } from 'svelte/store';

const store = writable([]);

import appStore from '$lib/stores/appStore';

//import Api functions
import { addCon, updCon, delCon } from '../../backend/ApiCon';

export function setContacts(contacts) {
	store.set(contacts);
}
//export default store
const customContactStore = {
	subscribe: store.subscribe,
	addContact: async (contactData, userToken) => {
		let newCon = contactData;
		let response = await addCon(newCon, userToken);
		if (response) {
			// need to add new id (response) to newCon
			newCon = { _id: response, ...newCon };
			store.update((items) => {
				return [newCon, ...items];
			});
			appStore.toggleAlert(true, 'Contact added successfully!', false);
		} else {
			appStore.toggleAlert(true, 'There was a problem trying to add this contact!', true);
		}
	},
	updateContact: async (id, contactData, userToken) => {
		const response = await updCon(id, { ...contactData }, userToken);
		// update store
		if (response) {
			store.update((items) =>
				items.map((item) => {
					return item._id === id ? { ...item, ...contactData } : item;
				})
			);
			appStore.toggleAlert(true, 'Contact updated successfully!', false);
		} else {
			appStore.toggleAlert(true, 'There was a problem trying to update this contact!', true);
		}
	},
	removeContact: async (id, userToken) => {
		const response = await delCon(id, userToken);
		//update store
		if (response) {
			store.update((items) => {
				items = items.filter((i) => i._id !== id);
				return items;
			});
			appStore.toggleAlert(true, 'Contact removed successfully!', false);
		} else {
			appStore.toggleAlert(true, 'There was a problem trying to remove this contact!', true);
		}
	}
};
export default customContactStore;
