<script>
	//stores
	import articles from '$lib/stores/articles';
	import user from '$lib/stores/user';

	//components
	import Button from '$lib/components/UI/Button.svelte';
	import ArticleItem from '$lib/components/Articles/ArticleItem.svelte';
	import ArticleFilter from '$lib/components/Articles/ArticleFilter.svelte';
	// import { scale } from 'svelte/transition';
	// import { flip } from 'svelte/animate';

	//Sveltekit routing
	import { goto } from '$app/navigation';

	let myArticle = false;
	let filteredArticles = [];
	$: filteredArticles = myArticle
		? $articles.filter((m) => m.articleuser === $user.userId)
		: $articles;

	function setFilter(e) {
		myArticle = e.detail === 1;
	}

	function handleAdd() {
		goto('/articleupdate');
	}
</script>

<span class="project-controls">
	<ArticleFilter on:filter={setFilter} />
	<Button on:click={handleAdd} disabled={!$user.jwt} mode="outline">New Article</Button>
</span>

<section class="projects-section">
	{#each filteredArticles as article (article._id)}

		<div >
			<ArticleItem {article} />
		</div>
	{/each}
</section>