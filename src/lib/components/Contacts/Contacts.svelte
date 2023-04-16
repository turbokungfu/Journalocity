<script>
	//stores
	import user from '$lib/stores/user';
	import appStore from '$lib/stores/appStore';
	import contacts from '$lib/stores/contacts';

	// sveltekit routing
	import { goto } from '$app/navigation';

	//components
	import Button from '$lib/components/UI/Button.svelte';
	import ContactItem from '$lib/components/Contacts/ContactItem.svelte';
	import { browser } from '$app/environment';

	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	function handleAdd() {
		if (browser) {
			goto('/contactupdate');
		}
	}
</script>

{#if $user.jwt}
	<span class="project-controls">
		<Button on:click={handleAdd} mode="outline" disabled={!$user.jwt}>New Contact</Button>
	</span>

	<section class="projects-section">
		{#each $contacts as contact (contact._id + contact.name)}
			<div transition:scale animate:flip={{ duration: 500 }}>
				<ContactItem {contact} />
			</div>
		{/each}
	</section>
{:else}
	{appStore.toggleAlert(true, 'You must be logged in to access Contacts!', true)}
	{goto('/')}
{/if}