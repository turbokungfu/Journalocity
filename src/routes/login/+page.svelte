<script>
	import appStore from '$lib/stores/appStore';
	import loginUser from '../../backend/loginUser';
	import registerUser from '../../backend/registerUser';
	import { goto } from '$app/navigation';
	//vars
	let email = '';
	let password = '';
	let username = 'default username';
	let isMember = true;
	// add alert here
	$: isEmpty = !email || !password || !username;
	//toggle member
	function toggleIsMember() {
		isMember = !isMember;
		username = !isMember ? '' : 'default username';
	}
	//handle submit
	async function handleSubmit() {
		const simulateLogin = false;
		let user;
		if (simulateLogin) {
            console.log('simlogin');
			user = 'simulateLogin';
		} else {
			if (isMember) {
				user = await loginUser({ email, password });
			} else {
				user = await registerUser({ email, password, username });
			}
		}
		if (user) {
			// should have welcome message
            console.log('userlogin')
			appStore.toggleAlert(
				true,
				'Welcome to the Flip Project! ' +
					user.userName.charAt(0).toUpperCase() +
					user.userName.slice(1),
				false
			);
			goto('/articles');
		} else {
            console.log('error')
			// should have alert here
			appStore.toggleAlert(true, 'There was a problem trying to Login to this project!', true);
		}
	}
</script>

<section class="form">
	<h2 class="section-title">
		{#if isMember}
			sign in
		{:else}
			register
		{/if}
	</h2>
	<form action="" class="login-form" on:submit|preventDefault={handleSubmit}>
		<div class="form-control">
			<label for="email">email</label>
			<input type="email" id="email" bind:value={email} />
		</div>

		<div class="form-control">
			<label for="password">password</label>
			<input type="password" id="password" bind:value={password} />
		</div>

		{#if !isMember}
			<div class="form-control">
				<label for="username">username</label>
				<input type="text" id="username" bind:value={username} />
			</div>
		{/if}

		{#if isEmpty}
			<p class="form-empty">please fill out all form fields</p>
		{/if}

		<button type="submit" class="btn btn-block btn-primary" class:disabled={isEmpty}
			>submit
		</button>

		{#if isMember}
			<p class="register-link">
				need to register?
				<button type="button" on:click={toggleIsMember}>click here</button>
			</p>
		{:else}
			<p class="register-link">
				already a member?
				<button type="button" on:click={toggleIsMember}>click here</button>
			</p>
		{/if}
	</form>
</section>