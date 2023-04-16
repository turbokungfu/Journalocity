<script>
	//stores temp db mirror
	import articles from '$lib/stores/articles';
	//components
	import Button from '$lib/components/UI/Button.svelte';
	import ArticleItem from '$lib/components/Articles/ArticleItem.svelte';

	//Sveltekit routing
	import { goto } from '$app/navigation';

	function handleAdd() {
		goto('/articleupdate');
	}
</script>

<span class="article-controls">
	<Button on:click={handleAdd} mode="outline">New Article</Button>
</span>

<section class="articles-section">
	{#each $articles as article (article._id)}
		<div>
			<ArticleItem {article} />
		</div>
	{/each}
</section>