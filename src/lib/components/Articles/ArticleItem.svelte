<script>
	//stores
	import user from '$lib/stores/user';
	import articles from '$lib/stores/articles';
	import appStore from '$lib/stores/appStore';

	//components
	import Button from '$lib/components/UI/Button.svelte';
	// import Badge from '$lib/components/UI/Badge.svelte';
	// import { scale } from 'svelte/transition';

	//Sveltekit routing
	import { goto } from '$app/navigation';

	// prop
	export let article;
	//vars
	const id = article._id;
	function handleLike() {
		const uid = !article.likeby ? ',' + $user.userId + ',' : $user.userId + ',';
		// only allow like if not already liked
		const allowLike = article.likeby ? !article.likeby.includes(uid) : true;
		if (allowLike) {
			const articledata = {
				likes: article.likes + 1,
				likeby: article.likeby ? article.likeby + uid : uid,
				id: id
			};
			articles.likeArticle(id, articledata, $user.jwt);
		} else {
			// alert if already liked
			appStore.toggleAlert(true, 'Already Liked. Not allowed to like more than once!', true);
		}
	}
 
</script>

<article  class="project-item-article">
	<header class="project-item-header">
		<div>
			<h1>
				{article.articleHeadline}

			</h1>
		</div>

		<div class="wrap-flex">
			<h2>{article.articlePublisher}</h2>
			<h4>{article.articleAuthor}</h4>
            <h4>{article.articleDate}</h4>
		</div>
	</header>
	<div class="project-item-image">
		<img src={article.image_url} alt={article.headline} />
	</div>
	<div class="project-item-content">
		<h3>{article.articleText.slice(0,140)}...</h3>
	</div>
	<footer class="project-item-footer">
		<Button>buy</Button
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
		disabled={!$user.jwt || article.articleuser !== $user.userId}
		on:click={() => {
			goto(`/articleupdate/${id}`);
		}}>Edit</Button
		>

		<Button disabled={!$user.jwt} mode="outline" type="button" on:click={handleLike}>Like</Button>
	</footer>
</article>