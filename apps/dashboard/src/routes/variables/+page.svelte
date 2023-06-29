<script lang="ts">
	import { Edit3, Trash2, Plus } from 'lucide-svelte';
	import type { VariableData } from 'db/models/variables';
	import VariableModal from '$lib/components/modals/VariableModal.svelte';

	type ParsedMessage = { value: string; type: 'text' | 'variable' }[];

	export let data;

	let variables = data.variables;
	let editingVariable: VariableData | null = null;
	let isVariableModalActive = false;
	let isVariableDeleteModalActive = false;

	const editVar = (variable: VariableData | null = null) => {
		editingVariable = variable;
		isVariableModalActive = true;
	};

	const deleteVar = (variable: VariableData | null = null) => {
		editingVariable = variable;
		isVariableDeleteModalActive = true;
	};
</script>

<header class="header has-actions">
	<div>
		<h1 class="title">Variables</h1>
		<p class="subtitle">Manage your custom variables</p>
	</div>
	<button class="button is-primary" on:click={() => editVar()}>
		<span class="icon">
			<Plus />
		</span>
		<span>New variable</span>
	</button>
</header>

<table class="table is-hoverable is-fullwidth">
	<thead>
		<tr>
			<th>Key</th>
			<th>Value</th>
			<th class="has-text-right">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each variables as variable}
			<tr>
				<td>{variable.key}</td>
				<td>{variable.value}</td>
				<td>
					<div class="buttons actions">
						<button class="button is-primary is-small" on:click={() => editVar(variable)}>
							<span class="icon">
								<Edit3 size={14} />
							</span>
							<span>Edit</span>
						</button>
						<button on:click={() => deleteVar(variable)} class="button is-danger is-small">
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

<VariableModal bind:active={isVariableModalActive} bind:variables variable={editingVariable} />
