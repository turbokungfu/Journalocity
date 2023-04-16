<script>
	import user from '$lib/stores/user';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let selectedButton = 0;
</script>

<div class="filter-div">
	<button
		class="filter-button"
		type="button"
		class:active={selectedButton === 0}
		on:click={() => {
			selectedButton = 0;
			dispatch('filter', 0);
		}}>All</button
	>
	<button
		class="filter-button"
		type="button"
		disabled={!$user.jwt}
		class:active={selectedButton === 1}
		on:click={() => {
			selectedButton = 0;
			dispatch('filter', 1);
		}}>My Articles</button
	>
</div>