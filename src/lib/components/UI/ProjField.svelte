<script>
	// prop
	export let pfield;
	//vars
	console.log('ProjField');
	console.log('pfield: ', pfield);

	let { fname, ftype } = pfield;
	console.log('fname : ', fname);
	console.log('ftype : ', ftype);

	let fvalid = { fname } + 'Valid';
	// may need to pass validation field as a parm?

	console.log('ProjField');
	console.log('fvalid: ', fvalid);
	console.log('{fvalid}: ', { fvalid });
</script>

<!-- Note: "type" cant be dynamic if used for two-way binding, which it is so trying this to get around this - assuming only types text and number -->


{#if (ftype = 'text')}
	<div class="form-control">
		<label for={fname}>{fname}</label>
		<input
			class="input"
			type="text"
			id={fname}
			class:invalid={!{ fvalid } && touched}
			bind:value={fname}
			on:blur={() => (touched = true)}
		/>
	</div>
{:else}
	<div>
		<label for={fname}>{fname}</label>
		<input
			class="input"
			type="number"
			id={fname}
			class:invalid={!{ fvalid } && touched}
			bind:value={fname}
			on:blur={() => (touched = true)}
		/>
	</div>
{/if}



