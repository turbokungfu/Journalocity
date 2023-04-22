import { writable } from 'svelte/store';
import { browser } from '$app/environment';
const userStore = writable(getStorageUser());

function getStorageUser() {
	const simulateLogin = false;
	if (simulateLogin) return { userId: 'b@b.com', jwt: 'jwtsimulate', username: 'Simulator' };

	const defaultUser = { userId: null, jwt: null, username: null };
	if (browser) {
		let user = window.localStorage.getItem('user');
		user = JSON.parse(user);
		if (!user) {
			return defaultUser;
		}
		setStorageUser(user);
		return user;
	} else {
		return defaultUser;
	}
}

export function setStorageUser(user) {
	if (browser) {
		window.localStorage.setItem('user', JSON.stringify(user));
	}
}

export function setUser(user) {
	userStore.set(user);
}

export function logoutUser() {
	if (browser) {
		localStorage.clear();
	}
	userStore.set({ userId: null, jwt: null, userName: null });
}

export default userStore;
