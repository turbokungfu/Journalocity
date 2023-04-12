<script>
	//sveltekit update
	import { page } from '$app/stores';

	//props
	let { id } = $page.params;

	//imports
	import articles from '$lib/stores/articles';

	//reactive for project
	let article = '';
	$: article = $articles.find((item) => item._id === id);
</script>

<svelte:head>
	<title>{!article ? 'single article' : article.articleHeadline}</title>
</svelte:head>

{#if !article}
	<p>loading ...</p>
{:else}
	<section class="single-project">
		<a href="/articles" class="btn btn-primary"> back to articles</a>

		<div class="single-project-container">
			<article class="single-project-image">
				<img src={article.image_url} alt={article.articleHeadline} />
			</article>

			<article>
				<h1>{article.articleLocation}</h1>
				<h2> {article.articlePublisher} (location: {article.articleLocation})</h2>
				<table class="single-project-table">
					<thead>
						<tr>
							<th>Author</th>
							<th>Snippet</th>
							<th>Summary</th>
							<th>Price</th>
							<th>Buyout</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{article.articleAuthor}</td>
							<td> {article.articleText}</td>
							<td>{article.articleSummary}</td>
							<th>${article.articlePrice}</th>
							<th>${article.articleBuyout}</th>
						</tr>
					</tbody>
				</table>
				<br />

			</article>

		</div>

		<a href="/articles" class="btn btn-primary"> back to articles</a>
	</section>
{/if}