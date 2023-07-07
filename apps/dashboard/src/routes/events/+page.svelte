<script lang="ts">
	import EventModal from '$lib/components/modals/EventModal.svelte';
	import type { EventData } from 'db/models/events.js';
	import { Edit3, Gift, PartyPopper, Star, UserPlus } from 'lucide-svelte';
	import type { SvelteComponent } from 'svelte';

	type EventIconsMap = {
		[event: string]: typeof SvelteComponent;
	};

	type EventDataWithLabel = EventData & { label: string };

	export let data;

	const events = data.events;

	const EVENT_ICONS_MAP: EventIconsMap = {
		raid: PartyPopper,
		sub: Star,
		giftsub: Gift,
		follow: UserPlus
	};

	let editingEvent: EventDataWithLabel | null;
	let isEventModalActive = false;

	const editEvent = (event: EventDataWithLabel | null = null) => {
		editingEvent = event;
		isEventModalActive = true;
	};
</script>

<header class="header has-actions">
	<div>
		<h1 class="title">Events</h1>
		<p class="subtitle">Handle channel events</p>
	</div>
</header>

<table class="table is-hoverable is-fullwidth">
	<thead>
		<tr>
			<th>Event</th>
			<th>Actions</th>
			<th class="has-text-right">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each events as event}
			<tr>
				<td class="row-with-icon">
					<span>
						<svelte:component this={EVENT_ICONS_MAP[event.event]} size={16} />
						{event.label}
					</span>
				</td>
				<td>{event.actions.length}</td>
				<td>
					<div class="buttons actions">
						<button class="button is-primary is-small" on:click={() => editEvent(event)}>
							<span class="icon">
								<Edit3 size={14} />
							</span>
							<span>Edit</span>
						</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

{#if isEventModalActive}
	<EventModal event={editingEvent} {events} bind:active={isEventModalActive} />
{/if}

<style lang="scss">
	.row-with-icon {
		vertical-align: middle;

		span {
			display: flex;
			align-items: center;
			gap: 0.375rem;
		}
	}
</style>
