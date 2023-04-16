<script>
	//stores
	import user from '$lib/stores/user';
	import contacts from '$lib/stores/contacts';

	// components
	import Button from '$lib/components/UI/Button.svelte';
	import Modal from '$lib/components/UI/Modal.svelte';

	// navigation
	import { goto } from '$app/navigation';

	// params
	import { page } from '$app/stores';
	let { id } = $page.params;

	id = id === 'AddNewContact' || null ? null : id;

	//vars
	let name = '';
	let coname = '';
	let cotype = '';
	let phone = '';
	let email = '';
	let address = '';
	let notes = '';
	let cuser = $user.userId;
	let editContact = id;

	const testing = true;
	if (testing) {
		name = 'Test -Mr Sparky';
		coname = 'Test -Sparkys llc';
		cotype = 'Test -Electricial';
		phone = 'Test -123-456-7890';
		email = 'Test -help@sparkyelec.com';
		address = 'Test -1 Main Street, Sorento, Fl';
		notes = 'Test -quick service, good prices';
		cuser = $user.userId;
	}

	// set title
	let modTitle = id ? 'Edit Contact' : ' Add New Contact';

	// for validation checking
	let touched = false;

	if (id) {
		editContact = $contacts.find((item) => item._id === id);
		name = editContact.name;
		coname = editContact.coname;
		cotype = editContact.cotype;
		phone = editContact.phone;
		email = editContact.email;
		address = editContact.address;
		notes = editContact.notes;
		cuser = editContact.cuser;
	}

	// reactivity
	$: nameValid = isOKLen(name, 5, 255);
	$: conameValid = isOKLen(coname, 5, 255);
	$: cotypeValid = isOKLen(cotype, 5, 255);
	$: phoneValid = isOKLen(phone, 5, 255);
	$: addressValid = isOKLen(address, 5, 255);
	$: emailValid = isOKLen(email, 5, 255);
	// no validation for notes - can be empty
	$: formIsValid =
		nameValid && conameValid && cotypeValid && phoneValid && emailValid && addressValid;

	function isOKLen(str, a, b) {
		// console.log('function isOKLen');
		// console.log('str, a, b: ', str, a, b);
		// console.log('typeof str: ', typeof str);
		if (typeof str === 'string') {
			return str.trim().length >= a && str.trim().length <= b ? true : false;
		}
		return false;
	}

	async function submitForm() {
		let contactData = {
			name: name,
			coname: coname,
			cotype: cotype,
			phone: phone,
			email: email,
			address: address,
			notes: notes,
			cuser: cuser
		};
		// check if id then update else add
		if (id) {
			contacts.updateContact(id, contactData, $user.jwt);
		} else {
			contacts.addContact(contactData, $user.jwt);
		}
		goto('/contacts');
	}

	function cancel() {
		goto('/contacts');
	}

	function deleteContact() {
		contacts.removeContact(id, $user.jwt);
		goto('/contacts');
	}
</script>

<Modal title={modTitle}>
	<form on:submit|preventDefault={submitForm}>
		<!--  -->
		<div class="form-control">
			<label for="name">name</label>
			<input
				class="input"
				type="text"
				id="name"
				class:invalid={!nameValid && touched}
				bind:value={name}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="coname">CompanyName</label>
			<input
				class="input"
				type="text"
				id="coname"
				class:invalid={!conameValid && touched}
				bind:value={coname}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="cotype">Company Type</label>
			<input
				class="input"
				type="text"
				id="cotype"
				class:invalid={!cotypeValid && touched}
				bind:value={cotype}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="phone">Phone No</label>
			<input
				class="input"
				type="text"
				id="phone"
				class:invalid={!phoneValid && touched}
				bind:value={phone}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="email">Email</label>
			<input
				class="input"
				type="text"
				id="email"
				class:invalid={!emailValid && touched}
				bind:value={email}
				on:blur={() => (touched = true)}
			/>
		</div>

		<div class="form-control">
			<label for="address">Address</label>
			<input
				class="input"
				type="text"
				id="address"
				class:invalid={!addressValid && touched}
				bind:value={address}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="notes">Notes</label>
			<input
				class="input"
				type="text"
				id="notes"
				bind:value={notes}
				on:blur={() => (touched = true)}
			/>
		</div>
	</form>
	<div slot="footer">
		<Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
		<Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
		{#if id}
			<Button type="button" mode="outline" on:click={deleteContact}>Delete</Button>
		{/if}
	</div>
</Modal>