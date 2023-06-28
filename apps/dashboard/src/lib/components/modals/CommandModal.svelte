<script lang="ts">
	import type { CommandData } from 'db';
	import Modal from './Modal.svelte';

	export let active = false;
	export let command: CommandData | null = null;
	export let commands: CommandData[] = [];

	const updateDefaultValues = () => {
		name = command?.name || '';
		aliases = command?.aliases?.join(',') || '';
		message = command?.reply || command?.say || '';

		// action
		if (command?.script) return (action = 'script');
		if (command?.say) return (action = 'say');
		action = 'reply';
	};

	let isLoading = false;

	let name = '';
	let aliases = '';
	let message = '';
	let action = 'reply';

	$: command, updateDefaultValues();

	const handleSubmit = async () => {
		isLoading = true;
		const data = {
			name,
			aliases: aliases ? aliases.split(',').map((x) => x.trim()) : [],
			reply: action == 'reply' ? message : undefined,
			say: action == 'say' ? message : undefined,
			script: action == 'script' || undefined
		};
		try {
			const resp = await fetch('/api/commands', {
				method: 'POST',
				body: JSON.stringify(data)
			});
			if (!resp.ok) throw Error(); // TODO: error message
			// TODO: toast success

			const idx = commands.findIndex((cmd) => cmd.name == data.name);
			if (idx >= 0) {
				commands[idx] = {
					...commands[idx],
					...data
				};
			} else {
				commands.push(data);
			}
			commands = commands;
		} catch (error) {
			// TODO: toast error
		}

		isLoading = false;
		active = false;
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Modal title="{command ? 'Edit' : 'New'} command" bind:active>
		<div class="field is-horizontal">
			<div class="field-label">
				<label class="label" for="name">Command</label>
			</div>
			<div class="field-body">
				<div class="field has-addons">
					<div class="control">
						<button class="button is-static">!</button>
					</div>
					<div class="control is-flex-grow-1">
						<input
							class="input"
							type="text"
							name="name"
							placeholder="ping"
							required
							bind:value={name}
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="field is-horizontal">
			<div class="field-label">
				<label class="label" for="aliases">Aliases</label>
			</div>
			<div class="field-body">
				<div class="field has-addons">
					<div class="control">
						<button class="button is-static">!</button>
					</div>
					<div class="control is-flex-grow-1">
						<input
							class="input"
							type="text"
							name="aliases"
							placeholder="pong"
							bind:value={aliases}
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="field is-horizontal">
			<div class="field-label">
				<label class="label" for="aliases">Action</label>
			</div>
			<div class="field-body">
				<div class="field">
					<div class="control">
						<div class="select is-fullwidth">
							<select bind:value={action}>
								<option value="reply">Reply</option>
								<option value="say">Say</option>
								<option value="script">Custom script</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>

		{#if action == 'script'}
			<div class="field is-horizontal">
				<div class="field-label">
					<label class="label" for="message">Code</label>
				</div>
				<div class="field-body">
					<div class="field">
						<div class="control">data/scripts/{name}.ts</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="field is-horizontal">
				<div class="field-label">
					<label class="label" for="message">Message</label>
				</div>
				<div class="field-body">
					<div class="field">
						<div class="control">
							<textarea
								class="textarea"
								name="message"
								placeholder="Pong! 🏓"
								required
								bind:value={message}
							/>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<svelte:fragment slot="footer">
			<button
				class="button is-success"
				type="submit"
				class:is-loading={isLoading}
				disabled={isLoading}>Save</button
			>
		</svelte:fragment>
	</Modal>
</form>
