<script>
	//components
	import Button from '$lib/components/UI/Button.svelte';
	import Badge from '$lib/components/UI/Badge.svelte';

	//Sveltekit routing
	import { goto } from '$app/navigation';

	// prop
	export let article;
	//vars
	const id = article._id;

// 	function handleLike() {
// 		// need some code here later
// 	}
// </script>

<article class="article-item-article">
	<header class="article-item-header">
		<div>

		</div>

		<div class="wrap-flex">
			<h2>{article.articleLocation}</h2>
			<h4>{article.articlePublisher}</h4>
		</div>
	</header>
	<div class="article-item-image">
		<img src={article.image_url} alt={article.articleHeadline} />
	</div>
	<div class="article-item-content">
		<h3>Arv: ${article.articlePrice}</h3>
	</div>
	<footer class="article-item-footer">
		<Button
			mode="outline"
			type="button"
			on:click={() => {
				//Sveltekit routing
				goto(`/articleupdate/${id}`);
			}}>Edit</Button
		>
		<Button
			mode="outline"
			type="button"
			on:click={() => {
				goto(`/articles/${id}`);
			}}>Details</Button
		>

		<Button
			mode="outline"
			type="button"
			on:click={() => {
				goto(`/ezflip/${id}`);
			}}>EzFlip</Button
		>

		<Button mode="outline" type="button" >Like</Button>
	</footer>
</article>