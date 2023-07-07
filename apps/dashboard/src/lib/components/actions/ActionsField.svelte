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

	export let actions: Action[];

	const ACTION_FIELDS_MAP: ActionFieldsMap = {
		say: ActionSay,
		reply: ActionSay
	};

	const ACTION_LABELS_MAP: ActionLabelsMap = {
		say: 'Send message',
		reply: 'Reply message'
	};
</script>

<div class="field is-horizontal">
	<div class="field-label">
		<label class="label" for="name">Actions</label>
	</div>
	<div class="field-body">
		<ul class="actions-list">
			{#each actions as action}
				<li class="box">
					<div class="action-title">
						<h2>{ACTION_LABELS_MAP[action.type]}</h2>
						<button type="button">
							<Trash2 size={16} />
						</button>
					</div>
					<svelte:component this={ACTION_FIELDS_MAP[action.type]} bind:action />
				</li>
			{/each}

			<div class="new-action">
				<button type="button" class="button is-primary">New action</button>
				<div class="box dropdown">
					<button type="button">Send message</button>
				</div>
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

			button {
				background: none;
				margin: 0;
				padding: 0.75rem 1rem;
				border: none;
			}
		}
	}
</style>
