<script>
	import Vnav from './Vnav.svelte';
	import Hnav from './Hnav.svelte';
	import appStore from '$lib/stores/appStore';
	let screenWidth;
	$: if (screenWidth > 990) {
		appStore.toggleNav(false);
	}
</script>

<svelte:window bind:innerWidth={screenWidth} />
{#if screenWidth > 990}
	<Hnav />
{:else}
	<Vnav />
{/if}
