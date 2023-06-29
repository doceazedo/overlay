<script lang="ts">
	import { Edit3, Trash2, Plus } from 'lucide-svelte';
	import type { CommandData } from 'db/models/commands';
	import CommandModal from '$lib/components/modals/CommandModal.svelte';
	import CommandDeleteModal from '$lib/components/modals/CommandDeleteModal.svelte';

	type ParsedMessage = { value: string; type: 'text' | 'variable' }[];

	export let data;

	let commands = data.commands;
	let editingCommand: CommandData | null = null;
	let isCommandModalActive = false;
	let isCommandDeleteModalActive = false;

	const getCommandAliases = (aliases?: string[]) => {
		aliases = aliases || [];
		return aliases.map((alias) => `!${alias}`).join(' ');
	};

	const parseCommandMessage = (input: string): ParsedMessage => {
		const result: ParsedMessage = [];
		let currentIndex = 0;

		while (currentIndex < input.length) {
			const openingIndex = input.indexOf('%', currentIndex);

			if (openingIndex === -1) {
				const remainingText = input.slice(currentIndex);
				result.push({ value: remainingText, type: 'text' });
				break;
			}

			const closingIndex = input.indexOf('%', openingIndex + 1);

			if (closingIndex === -1) {
				const remainingText = input.slice(currentIndex);
				result.push({ value: remainingText, type: 'text' });
				break;
			}

			const textBefore = input.slice(currentIndex, openingIndex);

			if (textBefore.length > 0) {
				result.push({ value: textBefore, type: 'text' });
			}

			const variable = input.slice(openingIndex + 1, closingIndex);
			result.push({ value: variable, type: 'variable' });

			currentIndex = closingIndex + 1;
		}

		return result;
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
			{@const parsedMessage = parseCommandMessage(command.reply || command.say || '')}
			<tr>
				<td>!{command.name}</td>
				<td>{getCommandAliases(command.aliases)}</td>
				<td>
					{#each parsedMessage as text}
						{#if text.type == 'variable'}
							<code>%{text.value}%</code>
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
