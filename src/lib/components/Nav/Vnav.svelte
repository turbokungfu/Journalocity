<script>
	import appStore from '$lib/stores/appStore';
	let openNav = appStore.toggleNav;
</script>

<nav class="navbar">
	<div class="nav-center">
		<button
			class="btn-sidebar-toggle"
			on:click={() => {
				openNav(true);
			}}
		>
			<i class="fas fa-bars" />
		</button>
	</div>
</nav>
