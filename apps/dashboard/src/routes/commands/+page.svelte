<script lang="ts">
	import { Edit3, Trash2, Plus } from 'lucide-svelte';
	import { parseMessageTemplate } from 'utils/parse-message-template';
	import CommandModal from '$lib/components/modals/CommandModal.svelte';
	import CommandDeleteModal from '$lib/components/modals/CommandDeleteModal.svelte';
	import type { CommandData } from 'db/models/commands';

	export let data;

	let commands = data.commands;
	let editingCommand: CommandData | null = null;
	let isCommandModalActive = false;
	let isCommandDeleteModalActive = false;

	const getCommandAliases = (aliases?: string[]) => {
		aliases = aliases || [];
		return aliases.map((alias) => `!${alias}`).join(' ');
	};

	const editCommand = (cmd: CommandData | null = null) => {
		editingCommand = cmd;
		isCommandModalActive = true;
	};

	const deleteCommand = (cmd: CommandData | null = null) => {
		editingCommand = cmd;
		isCommandDeleteModalActive = true;
	};
</script>

<header class="header has-actions">
	<div>
		<h1 class="title">Commands</h1>
		<p class="subtitle">Manage your chat bot commands</p>
	</div>
	<button class="button is-primary" on:click={() => editCommand()}>
		<span class="icon">
			<Plus />
		</span>
		<span>New command</span>
	</button>
</header>

<table class="table is-hoverable is-fullwidth">
	<thead>
		<tr>
			<th>Command</th>
			<th>Aliases</th>
			<th>Message</th>
			<th class="has-text-right">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each commands as command}
			{@const parsedMessage = parseMessageTemplate(command.reply || command.say || '')}
			<tr>
				<td>!{command.name}</td>
				<td>{getCommandAliases(command.aliases)}</td>
				<td>
					{#each parsedMessage as text}
						{#if text.type == 'script'}
							<code>&lcub;&lcub;{text.value}&rcub;&rcub;</code>
						{:else}
							{text.value}
						{/if}
					{/each}
				</td>
				<td>
					<div class="buttons actions">
						<button class="button is-primary is-small" on:click={() => editCommand(command)}>
							<span class="icon">
								<Edit3 size={14} />
							</span>
							<span>Edit</span>
						</button>
						<button on:click={() => deleteCommand(command)} class="button is-danger is-small">
							<span class="icon">
								<Trash2 size={14} />
							</span>
							<span>Delete</span>
						</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<CommandModal bind:active={isCommandModalActive} bind:commands command={editingCommand} />
<CommandDeleteModal
	bind:active={isCommandDeleteModalActive}
	bind:commands
	command={editingCommand}
/>
