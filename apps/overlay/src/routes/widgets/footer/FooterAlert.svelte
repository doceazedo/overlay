<script lang="ts">
	import { onMount } from 'svelte';
	import { socket } from 'ws-client';
	import { sleep } from '$lib/utils/sleep';
	import Follow from '$lib/components/icons/Follow.svelte';
	import Crown from '$lib/components/icons/Crown.svelte';
	import Star from '$lib/components/icons/Star.svelte';
	import Megaphone from '$lib/components/icons/Megaphone.svelte';
	import Gift from '$lib/components/icons/Gift.svelte';
	import DynamicItem from '$lib/components/DynamicItem.svelte';
	import followSound from '$lib/assets/sounds/follow-sound.mp3';
	import raidSound from '$lib/assets/sounds/raid-sound.mp3';
	import subSound from '$lib/assets/sounds/sub-sound.mp3';
	import { ALERTS, type Alert } from './stores/alerts';

	export let id: string | null;
	let alert: Alert | null;

	onMount(async () => {
		alert = $ALERTS.find((x) => x.id == id) || null;
		if (!alert) return;

		await sleep(400);
		const audio = new Audio(ALERT_SOUNDS_MAP[alert.type]);
		audio.play();

		if (alert.type == 'raid') socket.emit('confetti');
	});

	const getAlertIcon = (alert: Alert) => {
		if ((alert.type == 'sub' || alert.type == 'resub') && alert.isPrime) return Crown;
		switch (alert.type) {
			case 'follow':
				return Follow;
			case 'sub':
			case 'resub':
				return Star;
			case 'communitysub':
			case 'giftsub':
				return Gift;
			case 'raid':
				return Megaphone;
		}
	};

	const ALERT_SOUNDS_MAP = {
		follow: followSound,
		sub: subSound,
		resub: subSound,
		communitysub: subSound,
		giftsub: subSound,
		raid: raidSound
	};
</script>

{#if alert}
	<DynamicItem icon={getAlertIcon(alert)}>
		{#if alert.type == 'follow'}
			Valeu por me seguir, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'sub' && alert.isPrime}
			Valeu pelo Prime, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'sub'}
			Valeu por se inscrever, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'resub'}
			Valeu por se reinscrever por {alert.months} meses, <b>{alert.userDisplayName}</b>!
		{:else if alert.type == 'raid'}
			<b>{alert.userDisplayName}</b> está raidando com <b>{alert.raiders} pessoas</b>!
		{:else if alert.type == 'communitysub'}
			Valeu por presentear <b>{alert.count} inscrições</b> para comunidade, {alert.gifterDisplayName}!
		{:else if alert.type == 'giftsub'}
			Valeu por presentear {alert.recipientDisplayName} com uma inscrição,
			<b>{alert.gifterDisplayName}</b>!
		{/if}
	</DynamicItem>
{/if}
