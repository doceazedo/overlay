<script lang="ts">
	import { Trash2 } from 'lucide-svelte';
	import type { Action } from 'db/actions';
	import ActionSay from './ActionSay.svelte';
	import type { SvelteComponent } from 'svelte';

	type ActionFieldsMap = {
		[action: string]: typeof SvelteComponent;
	};

	type ActionLabelsMap = {
		[action: string]: string;
	};

	type EmptyActions = {
		[action: string]: Action;
	};

	export let actions: Action[];
	let showNewActionDropdown = false;

	const ACTION_FIELDS_MAP: ActionFieldsMap = {
		say: ActionSay,
		reply: ActionSay
	};

	const ACTION_LABELS_MAP: ActionLabelsMap = {
		say: 'Send message',
		reply: 'Reply message'
	};

	const EMPTY_ACTIONS: EmptyActions = {
		say: {
			type: 'say',
			message: ''
		},
		reply: {
			type: 'reply',
			message: ''
		}
	};

	const addAction = (action: string) => {
		actions = [...actions, EMPTY_ACTIONS[action]];
		showNewActionDropdown = false;
	};

	const deleteAction = (idx: number) => {
		actions.splice(idx, 1);
		actions = actions;
	};
</script>

<div class="field is-horizontal">
	<div class="field-label">
		<label class="label" for="name">Actions</label>
	</div>
	<div class="field-body">
		<ul class="actions-list">
			{#each actions as action, i}
				<li class="box">
					<div class="action-title">
						<h2>{ACTION_LABELS_MAP[action.type]}</h2>
						<button type="button" on:click={() => deleteAction(i)}>
							<Trash2 size={16} />
						</button>
					</div>
					<svelte:component this={ACTION_FIELDS_MAP[action.type]} bind:action />
				</li>
			{/each}

			<div class="new-action">
				<button
					type="button"
					class="button is-primary"
					on:click={() => (showNewActionDropdown = !showNewActionDropdown)}>New action</button
				>
				{#if showNewActionDropdown}
					<div class="box dropdown">
						{#each Object.values(ACTION_LABELS_MAP) as actionLabel, i}
							{@const action = Object.keys(ACTION_LABELS_MAP)[i]}
							<button type="button" on:click={() => addAction(action)}>{actionLabel}</button>
						{/each}
					</div>
				{/if}
			</div>
		</ul>
	</div>
</div>

<style lang="scss">
	.actions-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: 100%;

		.box {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 1rem;
			margin: 0;
		}

		.button {
			width: fit-content;
		}

		:global(.label) {
			font-weight: normal;
		}
	}

	.action-title {
		display: flex;
		justify-content: space-between;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(10, 10, 10, 0.1);

		h2 {
			font-weight: bold;
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 1.5rem;
			height: 1.5rem;
			background: none;
			margin: 0;
			padding: 0;
			border: none;
			color: #f14668;
			cursor: pointer;
			border-radius: 50%;
			transition: all 0.2s ease;

			&:hover {
				background-color: rgba(#f14668, 0.1);
			}
		}
	}

	.new-action {
		position: relative;

		.dropdown {
			position: absolute;
			top: 2.5rem;
			left: 0;
			padding: 0;
			z-index: 100;
			gap: 0;
			overflow: hidden;

			button {
				background: none;
				margin: 0;
				padding: 0.75rem 1rem;
				border: none;
				font-size: 0.8rem;
				text-align: left;
				cursor: pointer;

				&:hover {
					background-color: #eee;
				}
			}
		}
	}
</style>
