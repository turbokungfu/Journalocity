<script>
	import links from '$lib/links';
    import Logio from './Logio.svelte';
</script>

<nav class="navbar">
	<a href="/">
		<img src="/plume.png" class="logo" alt="logo" />
	</a>

	<div class="nav-container">
		<div class="nav-center">
			<ul class="nav-links">
				{#each links as { title, href }}
					<li>
						<a {href} class:activenav={href === '/'}>{title}</a>
					</li>
				{/each}
			</ul>
			<div class="nav-aside">
				<Logio />
			</div>
		</div>
	</div>
</nav>

<style>
	.activenav {
		color: var(--primaryColor);
	}
</style>