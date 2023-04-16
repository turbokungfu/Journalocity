<script>
	import user, { logoutUser } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import appStore from '$lib/stores/appStore';
</script>

{#if $user.jwt}
	<a
		href="/"
		class="logout-btn"
		on:click={() => {
			logoutUser();
			goto('/');
			appStore.toggleNav(false);
		}}
		>logout
	</a>
{:else}
	<a
		href="/login"
		on:click={() => {
			appStore.toggleNav(false);
		}}
		>Login
	</a>
{/if}