<script>

	import links from '$lib/links';
	import Logio from '$lib/components/Nav/Logio.svelte';
	import { fly, fade } from 'svelte/transition';
</script>

<div class="sidebar-container" transition:fly={{ x: -1000 }}>
	<div class="sidebar" transition:fade={{ delay: 400 }}>
		<div class="sidebar-header">
			<button
				class="btn-close"
				on:click={() => {
					console.log("hello");
				}}
			>
				<i class="fas fa-window-close" />
				<img src="/Kode.png" class="logo" alt="logo" />
			</button>
		</div>
		<ul class="sidebar-links">
			{#each links as { title, href }}
				<li>
					<a
						{href}
						on:click={() => {
							console.log("hello");
						}}
					>
						{title}
					</a>
				</li>
			{/each}
			<li>
				<Logio />
			</li>
		</ul>
	</div>
</div>