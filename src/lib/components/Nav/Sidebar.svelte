<script>
	import appStore from '$lib/stores/appStore';
	import links from '$lib/links';
</script>

<div class="sidebar-container">
	<div class="sidebar">
		<div class="sidebar-header">
			<button
				class="btn-close"
				on:click={() => {
					appStore.toggleNav(false);
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
							appStore.toggleNav(false);
						}}
					>
						{title}
					</a>
				</li>
			{/each}
			<li>
				<!-- login/logout -->
			</li>
		</ul>
	</div>
</div>
