<script>
	 import { updated } from '$app/stores';
	import '../app.css';
	import Nav from '$lib/components/Nav/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Sidebar from '$lib/components/Nav/Sidebar.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import appStore from '$lib/stores/appStore';
</script>
<main data-sveltekit-reload={$updated ? '' : 'off'}>
	<slot />


<div class="app">
	<Nav />
	{#if $appStore.sidebar}
		<Sidebar />
	{/if}
	{#if $appStore.alert}
		<Alert />
	{/if}

	<slot />
	<Footer />
</div>
</main>