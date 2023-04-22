
<script>
	export let data;
	import { setArticles } from '$lib/stores/articles';
	import Articles from '$lib/components/Articles/Articles.svelte';
	const { flips } = data;

	//console.log('project/+page.svelte data: ', data);
	// update projects store with fetched data
	setArticles(flips);
</script>

<Articles />
