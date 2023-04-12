<script>
	export let data;
	import { setArticles } from '$lib/stores/articles';
	import Articles from '$lib/components/Articles/Articles.svelte';
	const { articleList } = data;

	//console.log('article/+page.svelte data: ', data);
	// update articles store with fetched data
	setArticles(articleList);
</script>

<Articles />