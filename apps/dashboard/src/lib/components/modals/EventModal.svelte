<script lang="ts">
	import type { EventData } from 'db/models/events';
	import Modal from './Modal.svelte';
	import ActionsField from '../actions/ActionsField.svelte';

	type EventDataWithLabel = EventData & { label: string };

	export let active = false;
	export let event: EventDataWithLabel | null = null;
	export let events: EventDataWithLabel[] = [];

	let isLoading = false;
	let actions = event?.actions || [];

	const handleSubmit = async () => {
		isLoading = true;

		console.log({ actions });

		setTimeout(() => {
			isLoading = false;
		}, 500);
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Modal title="Edit {event?.label}" bind:active>
		<ActionsField bind:actions />

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
