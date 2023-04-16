<script>
	export let data;
	import { setContacts } from '$lib/stores/contacts';
	import Contacts from '$lib/components/Contacts/Contacts.svelte';
	import user from '$lib/stores/user';

	const { cons } = data;

	let contacts = [];
	contacts = cons;
	let userLoggedIn = $user.userId ? true : false;

	const filteredContacts = userLoggedIn ? contacts.filter((m) => m.cuser === $user.userId) : [];

	//update Contacts store
	setContacts(filteredContacts);
</script>

<Contacts />