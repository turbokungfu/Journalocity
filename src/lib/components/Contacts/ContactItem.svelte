<script>
	//stores
	import user from '$lib/stores/user';
	import contacts from '$lib/stores/contacts';
	import appStore from '$lib/stores/appStore';

	//components
	import Button from '$lib/components/UI/Button.svelte';

	//Sveltekit routing
	import { goto } from '$app/navigation';

	// prop
	export let contact;
	//vars
	const id = contact._id;
</script>

<article class="project-item-article">
	<header class="project-item-header">
		<div>
			Contact Name:
			<h1>
				{contact.name}
			</h1>
		</div>

		<div class="wrap-flex">
			Name:
			<h5>{contact.coname}</h5>
		</div>
		<div class="wrap-flex">
			Type:
			<h5>{contact.cotype}</h5>
		</div>
		<div class="wrap-flex">
			Phone:
			<h5>{contact.phone}</h5>
		</div>
		<div class="wrap-flex">
			Email:
			<h5>{contact.email}</h5>
		</div>
		<div class="wrap-flex">
			Address:
			<h5>{contact.address}</h5>
		</div>
	</header>
	<div class="project-item-content">
		Notes:
		<h5>{contact.notes}</h5>
	</div>
	<footer class="project-item-footer">
		<Button
			mode="outline"
			type="button"
			disabled={!$user.jwt}
			on:click={() => {
				goto(`/contactupdate/${id}`);
			}}>Edit</Button
		>
	</footer>
</article>