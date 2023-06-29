<script lang="ts">
	import type { VariableData } from 'db/models/variables';
	import Modal from './Modal.svelte';

	export let active = false;
	export let variable: VariableData | null = null;
	export let variables: VariableData[] = [];

	let isLoading = false;

	const handleSubmit = async () => {
		if (!variable) return;
		isLoading = true;
		try {
			const resp = await fetch(`/api/variables/${variable.key}`, {
				method: 'DELETE'
			});
			if (!resp.ok) throw Error(); // TODO: error message
			// TODO: toast success

			const idx = variables.findIndex((x) => x.key == variable?.key);
			if (idx >= 0) variables.splice(idx, 1);
			variables = variables;
		} catch (error) {
			// TODO: toast error
		}

		isLoading = false;
		active = false;
	};

	const close = () => (active = false);
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Modal title="Delete command" bind:active>
		<p>Are you sure you want to delete the <b>{variable?.key}</b> variable?</p>

		<svelte:fragment slot="footer">
			<button on:click={close} class="button" type="button" disabled={isLoading}>Cancel</button>
			<button
				class="button is-danger"
				type="submit"
				class:is-loading={isLoading}
				disabled={isLoading}>Delete</button
			>
		</svelte:fragment>
	</Modal>
</form>
