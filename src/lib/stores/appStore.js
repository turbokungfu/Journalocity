import { writable } from 'svelte/store';

const appStore = writable({
	sidebar: false,
	alert: false,
	alertMsg: 'default alert',
	alertMode: false
});

const store = {
	subscribe: appStore.subscribe,
	toggleAlert: (value, alertMsg = ' ', alertMode = false) => {
		appStore.update((storevalues) => {
			return { ...storevalues, alert: value, alertMsg, alertMode };
		});
	},
	toggleNav: (value) => {
		appStore.update((storevalues) => {
			return { ...storevalues, sidebar: value };
		});
	}
};

export default store;
