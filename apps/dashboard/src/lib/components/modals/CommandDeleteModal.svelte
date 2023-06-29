<script lang="ts">
	import type { CommandData } from 'db/models/commands';
	import Modal from './Modal.svelte';

	export let active = false;
	export let command: CommandData | null = null;
	export let commands: CommandData[] = [];

	let isLoading = false;

	const handleSubmit = async () => {
		if (!command) return;
		isLoading = true;
		try {
			const resp = await fetch('/api/commands', {
				method: 'DELETE',
				body: JSON.stringify({ name: command.name })
			});
			if (!resp.ok) throw Error(); // TODO: error message
			// TODO: toast success

			const idx = commands.findIndex((cmd) => cmd.name == command?.name);
			if (idx >= 0) commands.splice(idx, 1);
			commands = commands;
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
		<p>Are you sure you want to delete the <b>!{command?.name}</b> command?</p>

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
