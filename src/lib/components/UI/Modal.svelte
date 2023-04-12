<script>
	//sveltekit update
	// import { navigate } from 'svelte-routing';
	import { goto } from '$app/navigation';
	export let title;
	function closeModal() {
		//sveltekit update
		// navigate('/articles');
		goto('/articles');
	}
</script>

<div class="modal-backdrop" on:click={closeModal} on:keyup>
	<!-- click on backdrop closes modal -->
</div>
<div class="modal">
	<!--  -->
	<h1>{title}</h1>
	<div class="content">
		<slot />
	</div>
	<footer>
		<slot name="footer" />
	</footer>
</div>
